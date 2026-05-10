# Tokens — Cores

> Implementação: [`src/styles/tokens.css`](../../../src/styles/tokens.css). Decisão: [ADR-0004](../../adr/ADR-0004-tokens-de-design.md).

Toda combinação foi verificada em **WCAG AA** (`RNF-0001`) — texto normal ≥ 4.5:1, texto grande ≥ 3:1.

## Marca — "Buteco Moderno"

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-brand-primary` | `#9c2a1b` (urucum) | CTA, títulos com cor, focal de destaque. |
| `--color-brand-primary-hover` | `#741f14` | Hover do brand primary. |
| `--color-brand-primary-active` | `#5a160e` | Active/pressed do brand primary. |
| `--color-brand-secondary` | `#1f6f4a` (lima da terra) | Verdes (folhas, sucesso semântico secundário). |
| `--color-brand-secondary-hover` | `#155234` | Hover. |
| `--color-brand-accent` | `#f4b400` (dendê / goiabada) | Estrelas, badges, acentos amarelos. |
| `--color-brand-accent-hover` | `#c89200` | Hover. |

Os 3 nomes vêm de ingredientes brasileiros — preserva identidade gastronômica vs. nomes neutros tipo "primary/secondary".

## Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-text-strong` | `#1a1815` | Texto principal, headings. |
| `--color-text-muted` | `#5b554c` | Subtítulos, hints, secundário. |
| `--color-text-on-dark` | `#fbf7f0` | Texto sobre fundo escuro (footer, CTA escuro). |
| `--color-text-on-brand` | `#fbf7f0` | Texto sobre `--color-brand-primary`. |

## Fundo / superfície

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-canvas` | `#ffffff` | Plano de fundo padrão da página. |
| `--color-bg-soft` | `#faf6ee` | Bandejas / áreas suaves dentro do canvas. |
| `--color-surface` | `#fbf7f0` | Cards, painéis. |
| `--color-surface-strong` | `#1a1815` | Footer, CTAs escuros. |

## Borda

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-border` | `#cfc6b5` | Borda fina padrão (`--border-thin`). |
| `--color-border-strong` | `#1a1815` | Borda destacada (`--border-strong`). |
| `--color-border-input` | `#1a1815` | Borda de inputs (alta presença). |

## Estado

Estado vem em par cor + bg, pra manter contraste AA dentro de banner/alert.

| Estado | Cor | Bg |
|--------|-----|-----|
| Erro | `--color-state-error` `#b3261e` | `--color-state-error-bg` `#fcebea` |
| Sucesso | `--color-state-success` `#0d6e44` | `--color-state-success-bg` `#e7f5ee` |
| Aviso | `--color-state-warning` `#a3650a` | `--color-state-warning-bg` `#fdf2dd` |
| Info | `--color-state-info` `#1a5fa6` | `--color-state-info-bg` `#e6effa` |

## Foco — assinatura visual

Inspirado em GOV.UK: anel amarelo + linha preta no foco, alta visibilidade independente de cor de fundo.

| Token | Valor |
|-------|-------|
| `--color-focus-ring` | `#ffcc00` (amarelo de assinatura) |
| `--color-focus-text` | `#1a1815` |
| `--focus-outline-width` | `3px` |
| `--focus-offset` | `2px` |

`--shadow-focus` combina os 4 num box-shadow duplo (offset branco + ring amarelo) — usado em todos os elementos focáveis.

## Quando usar qual

- **Conteúdo neutro:** `--color-text-strong` sobre `--color-bg-canvas` ou `--color-surface`.
- **CTA primária:** `--color-brand-primary` bg, `--color-text-on-brand` texto.
- **CTA escura:** `--color-surface-strong` bg, `--color-text-on-dark` texto, `--color-brand-accent` para destaque.
- **Acento decorativo / estrela:** `--color-brand-accent`.
- **Alerta:** par estado + state-bg.
