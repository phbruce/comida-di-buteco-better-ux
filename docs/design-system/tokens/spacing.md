# Tokens — Espaçamento

> Implementação: [`src/styles/tokens.css`](../../../src/styles/tokens.css). Decisão: [ADR-0004](../../adr/ADR-0004-tokens-de-design.md).

Escala numérica `--space-0` a `--space-9`, **responsiva no breakpoint md (≥ 640px)**: valores aumentam pra dar respiro maior em telas grandes.

## Escala

| Token | Mobile (<640px) | Desktop (≥640px) | Uso típico |
|-------|-----------------|------------------|------------|
| `--space-0` | 0 | 0 | Reset. |
| `--space-1` | 4px | 4px | Gap mínimo, ajuste fino entre ícone e texto. |
| `--space-2` | 8px | 8px | Gap pequeno em flex/grid. |
| `--space-3` | 12px | 12px | Padding interno de inputs/botões pequenos. |
| `--space-4` | **16px** | **20px** | Padding base (container, cards). |
| `--space-5` | **20px** | **24px** | Espaçamento entre elementos relacionados. |
| `--space-6` | **24px** | **32px** | Gap entre blocos de conteúdo. |
| `--space-7` | **32px** | **40px** | Margem entre seções de página. |
| `--space-8` | **40px** | **56px** | Margem grande (hero, footer top). |
| `--space-9` | **56px** | **72px** | Margem extra (final de page article). |

Os 4 maiores (`--space-4` a `--space-9`) são os que crescem no desktop. Os menores (`--space-1` a `--space-3`) são fixos porque ajustes finos não escalam com viewport.

## `--container-padding`

Padding lateral do container — também responsivo:

| Mobile | Desktop (≥640px) |
|--------|------------------|
| `var(--space-4)` (16px) | `var(--space-6)` (32px) |

Usado em `.container { padding-inline: var(--container-padding) }`.

## Padrões

- **Gap pequeno (chip + texto):** `gap: var(--space-2)`.
- **Gap entre cards:** `gap: var(--space-3)` no mobile, `var(--space-4)` no desktop (já fica automático via responsivo).
- **Margem entre seções `<section>`:** `margin-block-start: var(--space-7)`.
- **Hero superior:** `padding-block: var(--space-8)`.
- **Final de artigo:** `padding-block-end: var(--space-9)`.

## Por que crescer no desktop

Em desktop, o eye line precisa percorrer mais distância — espaços iguais aos de mobile fariam o conteúdo parecer apertado. A escala que cresce mantém a **proporção visual** entre densidade e respiro independente da largura.

Mobile é otimizado pra **espaço útil máximo**; desktop é otimizado pra **leitura confortável**.
