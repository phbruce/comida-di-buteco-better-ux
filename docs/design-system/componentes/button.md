# Button

> Implementação: [`src/components/ui/Button.astro`](../../../src/components/ui/Button.astro). Decisão: ADR-0002 (DS GOV.UK) + ADR-0004 (tokens).

Ação primária, secundária, terciária ou de aviso. Renderiza como `<button>` por padrão; vira `<a>` quando recebe `href`.

## Anatomia

```
[ ícone opcional ] [ texto ] [ ícone opcional ]
```

Mínimo 44×44px (RNF-0003). Padding interno usa `--space-3` vertical e `--space-5` horizontal por padrão.

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `"primary" \| "secondary" \| "tertiary" \| "warning"` | `"primary"` | Variante visual. |
| `size` | `"md" \| "lg"` | `"md"` | Tamanho. |
| `href` | `string` | `undefined` | Quando preenchido, vira `<a>` em vez de `<button>`. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Só aplica quando é `<button>`. |
| `block` | `boolean` | `false` | Ocupa 100% da largura. |
| `disabled` | `boolean` | `false` | Aplica `aria-disabled` (não `disabled` HTML — pra preservar foco). |
| `ariaLabel` | `string` | — | Label acessível quando o conteúdo é só ícone. |
| `rel`, `target` | `string` | — | Passados pro `<a>` quando aplicável. |
| `class` | `string` | — | Classes extras. |

Aceita `<slot />` pro conteúdo.

## Variantes

| Variante | Bg | Texto | Borda | Quando |
|----------|----|----|-------|--------|
| **primary** | `--color-brand-primary` (urucum) | `--color-text-on-brand` | mesma do bg | CTA principal da tela. |
| **secondary** | transparente | `--color-text-strong` | `2px solid --color-border-strong` | Ações secundárias. |
| **tertiary** | transparente | `--color-brand-primary` (sublinhado) | nenhuma | Link estilizado como botão. |
| **warning** | `--color-state-error` | `--color-text-on-dark` | mesma do bg | Ações destrutivas. |

## Estados

- **Default:** definido pela variante.
- **Hover:** escurece o bg ou aumenta espessura do underline.
- **Focus:** `--shadow-focus` (anel amarelo + linha preta) — assinatura visual GOV.UK.
- **Active:** `--color-brand-primary-active` para o primary.
- **Disabled:** `aria-disabled="true"`, `opacity: 0.5`, `cursor: not-allowed`. **Continua focável** pra que screen readers anunciem.

## Acessibilidade

- Tap target mínimo 44×44.
- Foco visível com `--shadow-focus`.
- `aria-label` obrigatório quando o conteúdo é só ícone SVG.
- `target="_blank"` sempre acompanhado de `rel="noopener"` + label "(abre em nova aba)" via `<span class="visually-hidden">`.
- `aria-disabled` em vez de `disabled` HTML pra que o foco passe pelo botão e o leitor de tela explique o estado.

## Exemplos

```astro
<!-- CTA principal -->
<Button variant="primary" href={oficialUrl} target="_blank" rel="noopener">
  Avaliar no site oficial
  <span class="visually-hidden"> (abre em nova aba)</span>
</Button>

<!-- Bloco -->
<Button variant="secondary" type="submit" block>Limpar filtros</Button>

<!-- Só ícone -->
<Button variant="tertiary" ariaLabel="Fechar busca">
  <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
</Button>
```

## Quando NÃO usar

- Pra navegação interna pura sem ação destacada — use `<a>` simples com sublinhado padrão.
- Pra "salvar"/"cancelar" muito repetitivo dentro de listas — considere `tertiary` em vez de `primary` pra reduzir peso visual.
