# ADR-0011 — Tags vegetariano/vegano e filtros alimentares (proposta)

- **Status:** PROPOSED — aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **RFs/RNFs relacionados:** RF-0001, RF-0002, RNF-0001 (a11y)

## Contexto

Hoje o site lista 987 butecos com prato concorrente. Não há indicação de **restrição alimentar** (vegetariano/vegano), nem filtro por ingredientes. O dataset crawlado tem `prato` + `prato_descricao` (texto livre) — não tem campo estruturado de restrição.

O dono pediu: **badges vegetariano/vegano**, **filtros alimentares**, e que tudo respeite o design system existente.

## Decisão (proposta)

**Inferência heurística no build a partir de `prato_descricao`. Badges no card. Chips de filtro acima dos filtros atuais. Search de ingrediente continua usando o campo de busca já existente.**

### 1. Inferência (build-time, em script Python pós-crawl)

Para cada buteco, normalizar `prato_descricao` (lowercase, sem acentos) e detectar:

- **Sinais de carne/peixe** (lista exaustiva de termos): carne, costel*, frango, porco, suín*, bovin*, picanha, bacon, calabresa, linguiça, presunto, mortadela, salsicha, chouriço, bisteca, lombo, joelho, costela, picadinho, panceta, panchetta, peito, asa, coxa, costelinha, peixe, camarão, atum, salmão, polvo, lula, bacalhau, sardinha, robalo, tilápia, kafta, almôndega, hambúrguer (de carne), torresmo.
- **Sinais de laticínio/ovo**: queijo, requeijão, leite, manteiga, ovo, iogurte, parmesão, mussarela, muçarela, mozzarella, búfala, ricota, gorgonzola, catupiry, brie, coalho, nata, creme de leite.

Regras:
- **Tem carne/peixe** → `vegetariano: false, vegano: false`
- **Sem carne/peixe, com laticínio/ovo** → `vegetariano: true, vegano: false`
- **Sem carne/peixe, sem laticínio/ovo** → `vegetariano: true, vegano: true`
- **Confiança**: armazenamos `tags_confianca: "alta" | "baixa"`. Baixa quando descrição é muito curta (< 30 chars) ou quando só aparece um único marker.

Output: `src/data/butecos.ts` Buteco ganha campo opcional:
```
tags?: { vegetariano: boolean; vegano: boolean; confianca: "alta" | "baixa" }
ingredientes?: string[]   // termos detectados (para autocomplete)
```

### 2. Badges (UI)

Usando o `Tag.astro` existente, com nova variante:

- **VEGETARIANO** — variante `success` (verde lima) — texto curto, uppercase letter-spacing, alinhado com tags atuais (Bairro, Cidade — UF).
- **VEGANO** — variante `accent` (dendê/mostarda) — destaca mais que vegetariano (mais raro).
- **CONFIANÇA BAIXA**: ao invés de exibir badge "definitivo", exibimos texto cinza "possivelmente vegetariano" (mesmo nível visual da meta) — humilde sobre a heurística.

Exibição:
- **ButecoListItem** (listagem da cidade): badge inline com bairro, ex. `Santa Tereza · VEGETARIANO`.
- **ButecoCard** (já que home não usa, fica no detalhe): no detalhe, badge entre as tags do hero.
- Em **nenhum lugar** sobrepõe a foto.

### 3. Filtros

Acima dos filtros atuais (busca, bairro, ordem), adicionar uma faixa de **chips de restrição**:

```
[ ] Vegetariano   [ ] Vegano   [ ] Sem laticínio   [ ] Sem glúten
```

(Sem laticínio = vegano-or-tem-tag-sem-laticínio; Sem glúten exigiria detectar pão, farinha, massa — fica para iteração futura. Iniciar com: **Vegetariano** e **Vegano**.)

Comportamento:
- Multi-select de fato. Se "Vegano" marcado, lista só butecos com `vegano: true`.
- Se "Vegetariano" marcado, lista butecos com `vegetariano: true` (inclui veganos por implicação).
- Combina com busca/bairro como AND.
- Sincroniza URL via novo param `?dieta=vegano,vegetariano` (CSV).

Visual:
- Chips toggleáveis estilo GOV.UK — borda preta forte, fundo claro quando off, fundo escuro quando on. Sem borda arredondada (consistente com ADR-0004 refinado).
- Container com label "Restrição alimentar" para a11y.

### 4. Filtro por ingredientes — usar o campo de busca

A busca atual já filtra em `prato_descricao` (parte do haystack). Digitar "queijo" já filtra butecos com queijo. **Não criamos componente novo de ingredient picker** porque:

- Duplicaria UI e lógica.
- Mais simples para o usuário (uma única caixa).
- Aproveita o autocomplete que já está lá.

**Melhoria**: enriquecer a `<datalist>` de sugestões com **ingredientes detectados** além de nomes de buteco/prato. Resultado: ao digitar "qu", aparecem sugestões "Queijo", "Queijo coalho", "Bar do Queijão" etc.

### 5. Disclaimer da heurística

Em uma seção pequena no FOOTER da listagem (ou tooltip no chip): "Tags vegetariano/vegano são inferidas automaticamente da descrição do prato. Encontrou um erro? Use o botão **Tem algo errado** na página do buteco."

Conecta com o sistema de feedback (ADR-0006) já implementado.

## Alternativas consideradas

### A — Heurística no build (recomendada)
- Prós: zero custo runtime, dados estáticos, fácil revisar/melhorar lista de termos via PR.
- Contras: pode errar em pratos ambíguos (ex.: "kibe vegetariano" — "vegetariano" no nome confunde nada nesse caso, mas pratos como "molho ao sugo de tomate" sem proteína explícita).

### B — Curadoria manual (planilha humana)
- Prós: 100% acurada.
- Contras: 987 butecos × revisão = inviável para o redesign exploratório.

### C — IA (LLM) classifica em build
- Prós: melhor acurácia que regex.
- Contras: custo, complexidade de pipeline, dependência externa, overkill.

### D — Não adicionar
- Prós: zero risco.
- Contras: perde feature útil.

## Consequências

### Positivas
- Filtro útil para vegetarianos/veganos.
- Reaproveita Tag component (zero nova superfície de design).
- Fica na arquitetura do projeto (build-time, sem runtime overhead).

### Custos aceitos
- Acurácia ~80-90%. Erros existirão. Mitigado pelo feedback público + texto humilde "possivelmente".
- Lista de termos precisa ser mantida; novos pratos podem trazer palavras novas.

## Plano de implementação (após ACCEPTED)

- [ ] `scripts/tag-butecos.py` enriquece `butecos-edicao-2026.json` com `tags` e `ingredientes`.
- [ ] `src/data/butecos.ts` ganha tipos `Tags`, `ingredientes`.
- [ ] `Tag.astro` continua igual; nova variante visual se necessário.
- [ ] `ButecoListItem.astro` mostra badge inline na meta.
- [ ] `[cidade]/index.astro` ganha faixa de chips de dieta + sync URL.
- [ ] `<datalist>` enriquecida com ingredientes.
- [ ] Disclaimer sob a faixa de chips.

## Como reverter

Remover script de tagging; campos `tags`/`ingredientes` em `Buteco` são opcionais, componentes lidam com ausência.

## Referências

- ADR-0006 (feedback) — conecta para correção humana.
- Acidamente possível: termos como "ovo de Páscoa" em descrições não são alimento — manter regex contextual.
