# Illustration

> Implementação: [`src/components/ui/Illustration.astro`](../../../src/components/ui/Illustration.astro). Decisão: [ADR-0016](../../adr/ADR-0016-ilustracoes-personalidade-visual.md).

Wrapper pra um motivo paper-cut sharp do sistema de ilustrações. Carrega o SVG correspondente de `src/assets/illustrations/<kind>.svg`.

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `kind` | `Kind` | obrigatório | Um dos 14 motivos disponíveis. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 32 / 64 / 128 px. |
| `ariaLabel` | `string` | — | Quando preenchido, torna o motivo informativo (`role="img"`). Default decorativo (`aria-hidden`). |
| `class` | `string` | — | Classes extras. |

## Motifs (`Kind`)

`pimenta`, `folha`, `milho`, `cebola`, `tomate`, `garrafa`, `limao`, `pao-de-queijo`, `alho`, `abacaxi`, `mandioca`, `coxinha`, `caipirinha`, `espetinho`.

## Tamanhos

| Size | Pixels | Uso |
|------|--------|-----|
| `sm` | 32×32 | Acentos discretos (corner de card, badge). |
| `md` | 64×64 | Padrão (band, side accent). |
| `lg` | 128×128 | Hero, empty state, placeholder grande. |

## Acessibilidade

- **Decorativo por padrão:** `aria-hidden="true"` + `role="presentation"`.
- **Informativo:** quando passar `ariaLabel`, vira `role="img"` com label legível.

## Exemplos

```astro
<!-- Decorativo (default) -->
<Illustration kind="pimenta" size="md" />

<!-- Empty state — informativo -->
<Illustration
  kind="folha"
  size="lg"
  ariaLabel="Ilustração de folha verde, simbolizando que ainda não há comentários."
/>
```

## Quando NÃO usar

- Pra ícones funcionais (lupa, fechar, ←) — use SVG inline simples no DS, não motif.
- Em massa repetida sem propósito visual — fica saturado. Confie no espaço em branco.
