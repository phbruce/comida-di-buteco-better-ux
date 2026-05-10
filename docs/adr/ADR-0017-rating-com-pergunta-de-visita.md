# ADR-0017 — Pergunta de visita + rating por estrelas no comentário

- **Status:** ACCEPTED
- **Data:** 2026-05-10
- **Decisor(es):** Dono do produto (aprovado em 2026-05-10 — Alternativa B com range 1-5)
- **RFs/RNFs relacionados:** RF-0005 (votação — fica no oficial), RNF-0001 (a11y), RNF-0005 (privacidade)
- **ADRs relacionados:** ADR-0015 (sistema de comentários próprio — define schema atual)

## Contexto

Hoje os comentários do redesign (ADR-0015) aceitam só **apelido + mensagem**. Não há sinal sobre quem **realmente visitou** o buteco e quem está só passando opinião distante. Isso afeta a utilidade do feedback: críticas/elogios anônimos sem contexto pesam menos do que "fui em maio, prato muito bom".

O dono do produto pediu uma **pergunta dinâmica antes do comentário**: "Você foi lá?" — e, se sim, oferecer **0 a 5 estrelas** pra avaliar a experiência.

Forças em jogo:
- **A11y (RNF-0001)**: nova UI tem que ter tap target ≥44px, foco visível, navegação por teclado, semântica correta (radio group ou button group com aria-checked).
- **Privacidade (RNF-0005)**: rating não pode virar barreira; deve ser opcional. Ninguém precisa "identificar visita" pra comentar.
- **Schema do D1**: `comments` precisa de coluna nova pra guardar a nota. SQLite no Cloudflare D1 aceita `ALTER TABLE ADD COLUMN`.
- **Backwards compat**: comentários antigos não têm rating — display tem que tolerar `rating IS NULL`.
- **Anti-spam (já coberto pela ADR-0013/0015)**: rating não abre vetor novo; mesma defesa Turnstile + rate limit + honeypot.

## Decisão (proposta)

Adicionar **rating opcional 1-5 por estrelas** com **pergunta de pré-visita** que decide se o bloco de estrelas aparece.

### Range das estrelas: 1-5 (não 0-5)

O usuário pediu "0 a 5", mas vou propor **1-5** porque:
- "0 estrela" como nota é ambíguo: é "não fui" ou "péssimo"?
- A pergunta de visita já cobre o caso "não fui".
- Padrão da indústria (Google, Yelp, TripAdvisor) é 1-5.
- Quem foi e odiou, marca 1.

Se o decisor preferir mesmo 0-5, é um ajuste pequeno (mudar bound do validator + adicionar 6º botão).

### Schema do D1

Migração:
```sql
ALTER TABLE comments ADD COLUMN rating INTEGER;
-- valores válidos: NULL (não respondeu / não foi) ou 1..5
```

### Worker (`worker/comments.ts`)

- **POST** aceita campo opcional `rating`. Valida: número inteiro entre 1 e 5, ou ignora.
- **GET** retorna `rating` (number | null) no JSON de cada comment.
- Sem rating quebra de compat: campo simplesmente vem `null`.

### UI do formulário (Comments.astro)

State machine progressiva:
1. **idle** — antes de qualquer interação. Pergunta "Você foi nesse buteco?" + 2 botões: "Sim, fui" / "Ainda não fui".
2. **visited** — usuário marcou Sim. Aparece bloco de 5 estrelas (button group, 1-5). Embaixo, o resto do form (nick, mensagem, submit).
3. **not-visited** — usuário marcou Não. Pula o rating. Form continua igual.

Em **visited**, rating é OPCIONAL — submit envia `rating=null` se nada selecionado. (UX: não obrigar, evitar barreira.)

Em **not-visited**, submit envia `rating=null`.

Quem mudar de ideia clica de novo no toggle pra trocar.

### UI das estrelas

- 5 botões (`<button type="button" role="radio">`) no padrão **radiogroup** (semântica correta pra escala única).
- Cada botão tem ícone SVG estrela inline (sharp, polígono de 5 pontas, currentColor).
- Estados: vazia (outline), preenchida (fill), focada (ring amarelo do DS), hover (preview do nível).
- Tap target 44×44.
- aria-label "X estrelas" em cada botão.

### Display do rating no comentário

No head do comentário publicado:
- Sem rating: igual hoje — só apelido + tempo.
- Com rating: apelido + 5 mini estrelas (preenchidas/vazias conforme nota) + tempo.
- **Não** criar badge "não foi" pra ninguém — evita estigma e mantém o foco no que foi escrito.

Eventualmente (não nesta ADR): podemos calcular **média de rating por buteco** e mostrar no detalhe — mas isso vira ADR à parte.

## Alternativas consideradas

### A — Não fazer nada
- **Prós:** zero esforço.
- **Contras:** perde o sinal de "quem foi vs quem opina à distância".
- **Por que não:** o pedido do dono é justo e barato.

### B — Pergunta + estrelas opcionais — RECOMENDADA
- **Prós:** sinal claro, opcional, sem barreira pra quem não foi.
- **Contras:** schema extra, UI mais complexa, mais código pra cuidar.
- **Por que sim:** combina sinal + privacidade + acessibilidade sem fricção significativa.

### C — Rating obrigatório pra comentar
- **Contras:** barra perguntas legítimas de quem ainda não foi ("o prato já saiu da carta?"), fere o espírito de comunidade aberta.
- **Por que não:** UX hostil.

### D — Rating sem pergunta (com 0 = não fui)
- **Contras:** ambíguo (0 é nota "péssimo" ou "ausência"?), confunde médias.
- **Por que não:** já comentado acima.

### E — Sistema de "verified visitor" (geofence, OAuth com Foursquare etc.)
- **Contras:** privacidade, complexidade, fora do espírito do redesign aberto.
- **Por que não:** muito escopo pra ganho marginal.

## Consequências

### Positivas
- Comentários ganham camada de contexto sem barreira de entrada.
- Base pra futuros agregados (média por buteco — em outra ADR).
- Schema D1 fica preparado pra evoluir (mais campos opcionais sem migração disruptiva).

### Negativas / custos aceitos
- Migração de schema requer atenção (rodar `wrangler d1 execute` antes de deploy do Worker novo).
- Componente de estrelas adiciona complexidade na UI de Comments (state machine maior).
- A11y exige cuidado extra (radiogroup com setas, aria-checked, label invisível por estrela).

### Neutras
- Rating é opt-in: usuários que não interagirem com a pergunta enviam comentário "neutro" sem rating.

## Plano de implementação (se aprovado)

### Fase 1 — Schema + Worker
- [ ] Adicionar coluna `rating INTEGER` em `worker/comments.sql` (idempotente).
- [ ] Aplicar migração: `wrangler d1 execute cdb-comments --remote --command "ALTER TABLE comments ADD COLUMN rating INTEGER"`.
- [ ] Worker: aceitar e validar `rating` no POST (1-5 inteiro), retornar no GET.
- [ ] Deploy do worker: `wrangler deploy --config worker/wrangler.comments.toml`.

### Fase 2 — UI do formulário
- [ ] Adicionar state machine `visit-state` no Comments.astro: `idle | visited | not-visited`.
- [ ] Bloco "Você foi nesse buteco?" + 2 botões pillgroup com aria-pressed.
- [ ] Componente inline de estrelas (button group, role=radio, setas teclado).
- [ ] Quando state=visited: mostra estrelas. Quando not-visited: oculta.
- [ ] Submit envia `rating` se selecionado, omite caso contrário.

### Fase 3 — Display
- [ ] `renderItem(c)` adiciona row de mini estrelas se `c.rating != null`.
- [ ] CSS pra estrelas mini (12-14px, currentColor=urucum).

### Fase 4 — Validação manual
- [ ] Comentar com rating, sem rating, mudando de ideia entre estados.
- [ ] Testar teclado (Tab, setas, Enter/Space) no rating.
- [ ] Validar leitor de tela (anuncia "X de 5 estrelas selecionado").

## Como reverter

- Schema: SQLite não suporta `DROP COLUMN` natural. Solução: ignorar a coluna; deixar `rating` ficar nulo em todos os novos comentários (basta remover o input do form e o validation no Worker).
- Worker: voltar pra revisão anterior do `comments.ts`.
- UI: reverter Comments.astro pra revisão anterior.
- Custo de reverter: ~30 minutos.

## Referências

- ADR-0015 — Sistema de comentários próprio (Worker + D1).
- ADR-0013 — Cloudflare Turnstile como anti-bot (continua se aplicando ao POST com rating).
- WAI-ARIA Authoring Practices — Rating Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- Cloudflare D1 ALTER TABLE: https://developers.cloudflare.com/d1/sql-api/sql-statements/
