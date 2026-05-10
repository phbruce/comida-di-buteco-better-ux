# Design System — Comida di Buteco "Buteco Moderno"

Vive como **CSS variables + componentes Astro** no `src/`. Esta pasta de documentação textual cobre princípios e índices; a fonte da verdade é o código.

## Decisões de fundação (ADRs)

- [ADR-0002 — Design System inspirado em GOV.UK](../adr/ADR-0002-design-system-base-govuk.md) — `ACCEPTED`
- [ADR-0003 — Stack tecnológico Astro + GitHub Pages](../adr/ADR-0003-stack-tecnologico.md) — `ACCEPTED`
- [ADR-0004 — Tokens de design "Buteco Moderno"](../adr/ADR-0004-tokens-de-design.md) — `ACCEPTED`
- [ADR-0016 — Sistema de ilustrações decorativas (paper-cut)](../adr/ADR-0016-ilustracoes-personalidade-visual.md) — `ACCEPTED` (revisão v2)

## Estrutura

```
design-system/
  README.md             # você está aqui
  principios.md         # 8 princípios herdados do GOV.UK + identidade BR
  tokens/
    README.md           # mapa de tokens → src/styles/tokens.css
  componentes/
    README.md           # mapa de componentes → src/components/
  CHANGELOG.md          # (dívida — futuro)
```

## Implementação no código

- **Tokens:** `src/styles/tokens.css` — `--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`, `--container-*`, `--z-*`.
- **Estilos base:** `src/styles/base.css` — reset + typography + utilitários (incl. `.visually-hidden`).
- **Globais:** `src/styles/global.css` — entry que importa Inter Variable + tokens + base.
- **Componentes UI:** `src/components/ui/` — Button, Tag, Input, Breadcrumb, Pagination, SkipLink, PhaseBanner, Illustration, IllustrationBand.
- **Componentes do site:** `src/components/site/` — Header, Footer, ButecoCard, ButecoListItem, Map, Feedback.
- **Motivos paper-cut:** `src/assets/illustrations/*.svg` — 14 SVGs curtos (pimenta, folha, milho, cebola, tomate, garrafa, limão, pão de queijo, alho, abacaxi, mandioca, coxinha, caipirinha, espetinho).

## Dívida documental

Tokens, componentes e padrões de uso ainda **não têm página textual dedicada** aqui. Por enquanto, leia o código + comentários nos próprios componentes. Item registrado como dívida no `ROADMAP.md` (Fase 2/3).
