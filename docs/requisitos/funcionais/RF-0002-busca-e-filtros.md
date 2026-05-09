# RF-0002 — Buscar e filtrar butecos

- **Status:** Em rascunho
- **Prioridade:** Alta
- **Criado em:** 2026-05-09
- **RNFs relacionados:** RNF-0001, RNF-0003
- **ADRs relacionados:** ADR-0002

## Descrição

O sistema deve permitir que o visitante encontre butecos por **busca textual** e por **filtros estruturados** dentro de uma cidade.

## Atores

- Visitante.

## Cenários

### Cenário 1 — busca por nome do buteco ou do prato
- **Dado** que o visitante está na listagem de uma cidade,
- **Quando** digita um termo na caixa de busca,
- **Então** a lista é filtrada em tempo real (debounce ≤ 300 ms) por correspondência em **nome do buteco** ou **nome do prato**.

### Cenário 2 — filtros estruturados
- Filtros mínimos:
  - Bairro / região
  - Categorias do concurso vigente (se aplicável)
  - Premiados em edições anteriores
- **Quando** aplicados, a URL reflete o estado (parâmetros de query) — para compartilhamento.

### Cenário 3 — limpar filtros
- **Quando** o visitante clica em "limpar filtros",
- **Então** todos os filtros e a busca são resetados; a URL volta ao estado base.

### Cenário 4 — sem resultados
- **Quando** não há resultados,
- **Então** o visitante vê mensagem clara e sugestão (limpar filtros, mudar termo).

## Critérios de aceitação

- [ ] Busca acessível por teclado e leitor de tela (label associado).
- [ ] Filtros expostos como controles padrão (`<select>`, `<input type="checkbox">`) ou equivalentes ARIA.
- [ ] Estado dos filtros sincronizado com URL.
- [ ] Em mobile, filtros agrupados em painel deslizante ou expansível para preservar área da listagem.
- [ ] Anúncio via `aria-live` ao atualizar a contagem de resultados.

## Fora de escopo

- Filtros baseados em geolocalização (próximos a mim) — Fase futura, requer ADR próprio.

## Notas

- Decidir, em ADR, se a busca é client-side, server-side ou híbrida — depende do volume médio por cidade.
