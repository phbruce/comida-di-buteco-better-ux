# Tokens — Raios

> Implementação: [`src/styles/tokens.css`](../../../src/styles/tokens.css). Decisão: [ADR-0004](../../adr/ADR-0004-tokens-de-design.md) (refinamento 2026-05-09 — "GOV.UK-style sharp").

## Decisão: zero round

Todos os raios são **0** (cantos retos), exceto `--radius-pill` reservado pra casos onde a forma circular é deliberada.

| Token | Valor |
|-------|-------|
| `--radius-none` | `0` |
| `--radius-sm` | `0` |
| `--radius-md` | `0` |
| `--radius-lg` | `0` |
| `--radius-pill` | `999px` |

## Por que sharp

- **Coerência com GOV.UK Design System** (ADR-0002) — referência usa cantos retos.
- **Identidade visual mais forte** — combina com a paleta saturada e a tipografia bold.
- **Menos código de borda** — sem decisão por componente sobre "qual raio usar".

## Por que manter os 4 tokens iguais

Componentes podem (no futuro) querer raios diferentes. Manter `--radius-sm/md/lg` como tokens permite **mudar a decisão sem refatorar componentes** — basta alterar os valores aqui. Hoje todos resolvem pra `0`, mas a estrutura de tokens fica preparada.

## Quando usar `--radius-pill`

- Tags muito específicas onde a forma circular é parte da função (ex: badge de notificação numérica).
- **Não usar em botões** — viola o sharp do DS.
- **Não usar em cards** — viola o sharp do DS.

Atualmente nenhum componente do projeto usa `--radius-pill`. Está reservado.

## Bordas

Bordas têm 2 variantes prontas:

| Token | Valor |
|-------|-------|
| `--border-thin` | `1px solid var(--color-border)` (#cfc6b5) |
| `--border-strong` | `2px solid var(--color-border-strong)` (#1a1815) |

`--border-strong` é o padrão para inputs, botões secundários, separadores estruturais. `--border-thin` para divisões sutis dentro de áreas suaves.
