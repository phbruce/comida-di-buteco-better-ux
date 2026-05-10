# ADR-0018 — Filtros de restrição alimentar (vegetariano, vegano, sem glúten)

- **Status:** PROPOSED
- **Data:** 2026-05-10
- **Decisor(es):** Dono do produto (aguardando aprovação)
- **Supersede:** ADR-0011 (REJECTED adiada em 2026-05-09 — retomada com escopo expandido)
- **RFs/RNFs relacionados:** RF-0001 (listagem), RF-0002 (busca/filtros), RNF-0001 (a11y), RNF-0005 (segurança/privacidade)

## Contexto

Pessoas com restrição alimentar — vegetarianos, veganos, intolerantes a glúten/lactose, alérgicos — ficam excluídas do site oficial. Não há filtro nem indicação de **qual buteco oferece algo que elas podem comer**. O dono do produto pediu reabrir essa frente, expandindo o escopo de ADR-0011 (que tratou só vegetariano/vegano) pra cobrir mais restrições e cogitar alergias.

ADR-0011 propôs heurística no build a partir de `prato_descricao`, foi **REJEITADA (adiada)** em 2026-05-09. Esta ADR retoma com escopo maior e endereça riscos novos.

### Limitação fundamental dos dados

O dataset que temos é o **prato autoral do concurso**, um por buteco. **Não temos o cardápio completo.** Um vegetariano querendo "achar onde almoçar" precisaria saber se o **resto do menu** atende — o que não temos. O filtro só pode dizer "o prato do concurso é vegetariano", não "este buteco serve vegetariano em geral".

Isso muda completamente o produto. Vamos honestos sobre isso na UI.

### Risco de alergias

Alergias (glúten celíaco, amendoim, frutos do mar, lactose) são **risco de saúde real**. Informação parcial ou errada pode mandar alguém pro pronto-socorro. Não é como "vegetariano errado = comeu queijo sem querer" — alergia errada = anafilaxia.

A heurística do ADR-0011 atinge ~80-90% de acurácia. Em vegetariano isso é tolerável (quem se importa muito vai checar com o garçom de qualquer forma). Em alergia, **80% de acurácia é inaceitável** — significa 1 em cada 5 visitantes recebendo info errada com risco de hospitalização.

## Decisão (proposta)

**Implementar três tags via heurística no build: `vegetariano`, `vegano`, `sem-gluten`. NÃO implementar tags de alergias específicas (amendoim, frutos do mar, lactose, etc.).** Aviso claro em todo lugar de que a tag se refere apenas ao **prato do concurso**, não ao menu completo.

### O que entra

- **Vegetariano** — sem carne/peixe (laticínio e ovo permitidos).
- **Vegano** — sem carne/peixe/laticínio/ovo.
- **Sem glúten** — sem trigo (massa, pão, farinha de trigo, panqueca, empanado, kibe, esfiha, pastel, etc.). Detectado via dicionário de termos.

### O que NÃO entra (por agora)

- **Alergias específicas** (amendoim, frutos do mar, soja, ovos, etc.) — risco de saúde alto demais pra heurística baseada em texto livre.
- **Sem lactose** — apesar de muitos textos mencionarem queijo/leite explicitamente, há laticínios escondidos (manteiga em refogado, creme em molho, queijo ralado em farofa) que a heurística não pega. Sem listar como tag, mas mantemos no dicionário pra alimentar a "vegano" (que já é mais conservador).
- **Sem carne / sem frango** — redundante com vegetariano (que cobre os dois). Se o usuário quer "sem carne mas com frango", isso não é restrição alimentar formalizada — usar o campo de busca atual ("frango") já resolve.

### Aviso explícito (UI)

Em todo lugar onde a tag aparece — chips de filtro, badge no card, página de detalhe — mostrar texto curto e direto:

> Tags se referem ao **prato do concurso**, não ao cardápio completo do buteco. Cheque com o garçom antes de pedir.

Esse texto só some depois que o usuário tem certeza que entende. Em alguns lugares (tooltip do chip, footer da listagem) o aviso pode ser secundário. Em página de detalhe, ele aparece direto abaixo da badge.

### Heurística (build)

Mesma estrutura de ADR-0011 mas com lista expandida:

```python
# scripts/tag-butecos.py
CARNE_PEIXE = ["carne","costel","frango","porco","suín","bovin","picanha",
               "bacon","calabresa","linguiça","presunto","mortadela","salsicha",
               "chouriço","bisteca","lombo","joelho","costela","picadinho",
               "panceta","peito","asa","coxa","costelinha","peixe","camarão",
               "atum","salmão","polvo","lula","bacalhau","sardinha","robalo",
               "tilápia","kafta","almôndega","hambúrguer","torresmo","jiló com carne"]

LACTEO_OVO = ["queijo","requeijão","leite","manteiga","ovo","iogurte",
              "parmesão","mussarela","muçarela","ricota","gorgonzola",
              "catupiry","brie","coalho","nata","creme de leite","provolone"]

GLUTEN = ["pão","massa","farinha de trigo","panqueca","empanad","kibe",
          "esfiha","pastel","macarrão","crouton","cuscuz marroquino",
          "bolinho de","batata recheada","fritas com farinha"]
```

Para cada `prato_descricao`:
- `tem_carne_peixe = qualquer match em CARNE_PEIXE`
- `tem_lacteo_ovo = qualquer match em LACTEO_OVO`
- `tem_gluten = qualquer match em GLUTEN`

Tags resultantes:
- `vegetariano: not tem_carne_peixe`
- `vegano: not tem_carne_peixe and not tem_lacteo_ovo`
- `sem_gluten: not tem_gluten`
- `confianca: "alta" | "baixa"` — baixa se descrição < 30 chars OU se só 1 marker decidiu o resultado.

Output enriquece `src/data/butecos-edicao-2026.json`:

```json
{
  "slug": "...",
  "tags": {
    "vegetariano": true,
    "vegano": false,
    "sem_gluten": false,
    "confianca": "alta"
  }
}
```

`src/data/butecos.ts` ganha tipo opcional na interface `Buteco`.

### UI

#### 1. Badges no card

`Tag.astro` ganha 3 instâncias com texto explícito:

- Card sem foto / detalhe: `Vegetariano` em chip lima escuro.
- `Vegano` em chip lima ainda mais escuro.
- `Sem glúten` em chip dendê.
- Quando `confianca: "baixa"`: prefixo "possivelmente" — fica `Possivelmente vegetariano`.

Não usar emojis nem ícones de comida — só texto, consistente com regra geral do projeto.

#### 2. Filtros na listagem `/butecos/<cidade>/`

Acima dos filtros atuais, faixa horizontal:

```
Restrição alimentar:
[ Vegetariano ]  [ Vegano ]  [ Sem glúten ]
```

Cada chip é toggle (`aria-pressed`). Combina com busca/bairro como AND. Sincroniza URL via `?dieta=vegano,sem-gluten` (CSV).

Em mobile, layout vira coluna se necessário; chips mantêm 44×44 tap target.

#### 3. Disclaimer

Logo abaixo da faixa de chips:

> Estas tags se referem ao **prato do concurso**, inferidas da descrição. Cheque com o buteco antes da visita. [Encontrou um erro?](#feedback)

O link "Encontrou um erro?" leva pro botão de feedback (ADR-0006) já implementado.

## Alternativas consideradas

### Alternativa A — Adiar de novo
- **Por que não:** o pedido voltou com peso (visitantes excluídos), e ADR-0011 já tinha estudado a solução. Adiar de novo é capricho.

### Alternativa B — Heurística + correção via feedback (RECOMENDADA)
- **Prós:** custo controlado, dataset enriquecido em build, mecanismo de correção já existe.
- **Contras:** acurácia ~85-90%; erros existem.
- **Mitigação:** aviso explícito de "só prato do concurso" + canal de feedback aberto.

### Alternativa C — Curadoria manual
- **Prós:** 100% acurada.
- **Contras:** 987 butecos × tempo de revisão = inviável pra projeto não-oficial sem time.

### Alternativa D — Inclui alergias específicas (REJEITADA)
- **Prós:** mais inclusão.
- **Contras:** **risco de saúde**. Heurística erra ~10-15%. Cada erro em alergia é potencial visita ao PS.
- **Por que não:** ética > completude. Se alguém com restrição séria se baseia em rótulo errado nosso, falhamos como projeto. Manter alergias **fora** do escopo até ter mecanismo confiável (ex: declaração explícita do buteco).

### Alternativa E — Pedir ao usuário pra digitar restrição livre e filtrar via busca atual
- **Prós:** sem heurística nova, sem dataset extra.
- **Contras:** UX ruim — quem é vegano não quer escrever "queijo carne picanha frango costela" pra excluir. Filtro afirmativo é mais útil que busca-por-exclusão.

## Consequências

### Positivas
- Filtro útil pra ~30M de brasileiros com restrição (vegetarianos + intolerantes a glúten + veganos).
- Diferenciador real vs. site oficial.
- Reaproveita componentes existentes (`Tag`, chips, datalist).

### Negativas / custos aceitos
- Acurácia heurística ~85% — erros existirão.
- Lista de termos precisa ser mantida; novas edições do concurso podem trazer palavras inéditas.
- "Sem glúten" especialmente arriscado — molhos, farinhas escondidas. Aviso "cheque com o buteco" precisa ser MUITO claro pra celíacos não baseiem decisão de saúde só na nossa tag.
- Confiança baixa em pratos com `prato_descricao` curta.

### Neutras
- Não cobre quem busca o restaurante todo (só o prato do concurso). Documentado e admitido.
- Alergias específicas ficam no backlog — futuro ADR pode reabrir se aparecer mecanismo de declaração direta dos butecos.

## Plano de implementação (se ACCEPTED)

### Fase 1 — Inferência
- [ ] `scripts/tag-butecos.py` — script Python idempotente que lê `butecos-edicao-2026.json`, enriquece com `tags` e salva.
- [ ] Listas de termos em arquivos separados (`scripts/terms/carne_peixe.txt`, etc.) pra facilitar PRs.
- [ ] Roda no `package.json` como `npm run tags` (manual por enquanto, depois CI se necessário).

### Fase 2 — Tipos e dados
- [ ] `src/data/butecos.ts` ganha interface `Tags`.
- [ ] Helpers `temVegetariano(buteco)`, `temVegano(buteco)`, `temSemGluten(buteco)`.

### Fase 3 — UI
- [ ] `ButecoListItem.astro` mostra badges quando `tags` presentes.
- [ ] `ButecoCard.astro` (caso volte a ser usado) idem.
- [ ] Página de detalhe do buteco mostra badges abaixo do prato + disclaimer "só do prato do concurso".
- [ ] `/butecos/<cidade>/index.astro` ganha faixa de chips de dieta + sync URL.

### Fase 4 — Disclaimer + a11y
- [ ] Texto de aviso visível abaixo da faixa de chips.
- [ ] `aria-label` nos chips ("Filtrar por dieta vegetariana").
- [ ] Tap target ≥44px confirmado.
- [ ] Foco visível com `--shadow-focus`.

### Fase 5 — Validação
- [ ] Testar com 5 pratos representativos: vegetariano claro, vegano claro, com carne explícita, com queijo escondido, com massa.
- [ ] Spot-check manual em 30 butecos aleatórios — anotar acurácia.
- [ ] Documentar acurácia real no `docs/pesquisa/`.

## Como reverter

- Remover `script tag-butecos.py` da pipeline.
- Tag interface continua opcional em `Buteco` — UI lida com ausência.
- Remover faixa de chips do `/butecos/<cidade>/`.
- Custo de reverter: ~1 hora.

## Referências

- ADR-0011 (REJECTED em 2026-05-09) — base técnica desta ADR.
- ADR-0006 (Feedback) — canal de correção quando heurística erra.
- ADR-0004 (Tokens) — `Tag.astro` e variantes de cor.
- Pesquisa Ibope 2018: 14% dos brasileiros se declaram vegetarianos. Equivale a ~30M de pessoas (referência genérica, não-citação).
