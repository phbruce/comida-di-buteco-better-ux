# RNF-0003 — Mobile-first e responsividade

- **Status:** Em rascunho
- **Categoria:** UX
- **Criado em:** 2026-05-09
- **RFs relacionados:** todos

## Atributo de qualidade

O design e a implementação começam em **320px** e progridem para telas maiores.

## Métricas

| Métrica                                          | Alvo |
|--------------------------------------------------|------|
| Sem scroll horizontal em viewports ≥ 320px       | 100% das páginas |
| Tap targets                                      | ≥ 24×24px área visível, ≥ 44×44px área alvo (recomendado WCAG 2.2 AAA) |
| Espaçamento mínimo entre alvos clicáveis         | 8px |
| Tipografia base mobile                           | ≥ 16px (sem zoom forçado em iOS Safari) |
| Imagens                                          | 100% com `srcset` e dimensões reservadas |

## Breakpoints (referência inicial — confirmar em ADR)

| Token      | Largura (px) | Uso                       |
|------------|--------------|---------------------------|
| `sm`       | ≥ 480        | Mobile grande             |
| `md`       | ≥ 640        | Tablet vertical (alinhado a GOV.UK) |
| `lg`       | ≥ 1024       | Tablet horizontal / laptop |
| `xl`       | ≥ 1280       | Desktop                   |
| `2xl`      | ≥ 1536       | Desktop largo             |

## Cenários

### Cenário 1 — iPhone SE (375×667 lógico)
- Layout vertical, navegação compactada, busca acessível em 1 toque.

### Cenário 2 — Tablet 768px
- Listagem em 2 colunas, filtros em painel lateral colapsável.

### Cenário 3 — Desktop 1440px
- Layout 3 colunas (filtros, listagem, contexto/mapa futuro), respiração ampla.

## Estratégias

- CSS mobile-first: media queries usam `min-width`.
- Componentes nascem com layout fluido (`flex` / `grid` com `auto-fit`/`minmax`).
- Imagens com `aspect-ratio` para evitar CLS.
- Fontes responsivas com `clamp()` quando útil.

## Trade-offs

- Equipes acostumadas a desenhar em desktop primeiro precisam ajustar processo: especificações começam em 360–375px.
