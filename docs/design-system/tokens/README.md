# Tokens

> Fonte da verdade: [`docs/adr/ADR-0004-tokens-de-design.md`](../../adr/ADR-0004-tokens-de-design.md)
> Implementação: [`src/styles/tokens.css`](../../../src/styles/tokens.css)

Os tokens são `--custom-properties` em `:root`. Mudanças aqui afetam todo o sistema.

## Categorias

| Categoria | Token base | Onde |
|-----------|------------|------|
| Cor — texto | `--color-text-strong`, `--color-text-muted`, `--color-text-on-dark`, `--color-text-on-brand` | tokens.css |
| Cor — fundo | `--color-bg-canvas`, `--color-bg-soft`, `--color-surface`, `--color-surface-strong` | tokens.css |
| Cor — borda | `--color-border`, `--color-border-strong`, `--color-border-input` | tokens.css |
| Cor — marca | `--color-brand-primary`, `--color-brand-secondary`, `--color-brand-accent` | tokens.css |
| Cor — estado | `--color-state-error`, `--color-state-success`, `--color-state-warning`, `--color-state-info` (e respectivos `-bg`) | tokens.css |
| Cor — foco | `--color-focus-ring`, `--color-focus-text`, `--focus-outline-width`, `--focus-offset` | tokens.css |
| Tipografia | `--font-family-sans`, `--font-size-*` (display/h1/h2/h3/body/small/caption), `--font-weight-*`, `--line-height-*` | tokens.css |
| Espaço | `--space-0` a `--space-9` (responsivo em ≥640px) | tokens.css |
| Raio | `--radius-none/sm/md/lg/pill` | tokens.css |
| Sombra | `--shadow-1`, `--shadow-2`, `--shadow-focus` | tokens.css |
| Movimento | `--motion-fast/base/slow`, `--easing-standard` | tokens.css |
| Layout | `--container-narrow/default/wide`, `--container-padding` | tokens.css |
| Z-index | `--z-skip/header/overlay/modal` | tokens.css |

## Como usar

```css
.minha-classe {
  color: var(--color-text-strong);
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## Como NÃO usar

- ❌ Hex literais em componentes.
- ❌ `px` mágicos para espaçamento — sempre `--space-*`.
- ❌ `font-size` literal — sempre `--font-size-*`.

## Como auditar

Ao criar/editar componente:

1. Cheque que cada cor/tamanho/espaço usa um `--var`.
2. Rode `axe` no HTML gerado.
3. Confirme contraste em DevTools para combinações novas.
