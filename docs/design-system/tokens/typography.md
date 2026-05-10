# Tokens — Tipografia

> Implementação: [`src/styles/tokens.css`](../../../src/styles/tokens.css). Decisão: [ADR-0004](../../adr/ADR-0004-tokens-de-design.md).

## Família

| Token | Valor |
|-------|-------|
| `--font-family-sans` | `"Inter Variable", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--font-family-mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |

**Inter Variable** auto-hospedada via `@fontsource-variable/inter` (sem Google Fonts, sem call externa em runtime). Stack de fallback usa fontes do sistema pra primeira renderização instantânea.

## Escala — fluida com `clamp()`

A escala usa `clamp(min, fluido, max)` baseada em `vw`. Tipografia cresce suavemente entre 320px (mobile) e 1280px (desktop).

| Token | Mobile (320px) | Desktop (≥1280px) | Uso |
|-------|----------------|-------------------|-----|
| `--font-size-display` | 32px | 48px | Hero da home, h1 principal. |
| `--font-size-h1` | 28px | 36px | Títulos de página secundários. |
| `--font-size-h2` | 22px | 28px | Seções dentro da página. |
| `--font-size-h3` | 18px | 22px | Subtítulos / cards. |
| `--font-size-body` | 16px | 18px | Texto corrido (mínimo absoluto 16px no mobile, RNF-0003). |
| `--font-size-small` | 14px | 16px | Captions, hints, meta. |
| `--font-size-caption` | 12px | 13px | Labels muito secundários (overline, eyebrow). |

## Pesos

| Token | Valor |
|-------|-------|
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |

Inter Variable suporta peso fluido — usar 400/600/700 cobre 95% dos casos. 500 (medium) reservado pra subtítulos onde 600 é forte demais.

## Altura de linha

| Token | Valor | Uso |
|-------|-------|-----|
| `--line-height-tight` | 1.1 | Display, h1 grandes. |
| `--line-height-snug` | 1.25 | h2/h3. |
| `--line-height-normal` | 1.5 | Body — leitura corrida. |
| `--line-height-relaxed` | 1.6 | Body extenso (parágrafos longos, lede). |

## Espaçamento de letra

| Token | Valor |
|-------|-------|
| `--letter-spacing-tight` | -0.01em |
| `--letter-spacing-normal` | 0 |

`-0.01em` é usado nos titulares grandes (display) pra compensar a abertura natural da Inter em peso bold. Não usar em body — Inter já é otimizada pra leitura.

## Padrões

- **Eyebrow / overline:** `font-size: var(--font-size-caption); text-transform: uppercase; letter-spacing: 0.1em; font-weight: var(--font-weight-bold);`. Usado em hero da home, headers de seção.
- **Body padrão:** `font-size: var(--font-size-body); line-height: var(--line-height-normal);`.
- **Lede:** `font-size: var(--font-size-h3); color: var(--color-text-muted); line-height: var(--line-height-relaxed); font-weight: regular;`. Subtítulo de página.
