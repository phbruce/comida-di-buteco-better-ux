# Tag

> Implementação: [`src/components/ui/Tag.astro`](../../../src/components/ui/Tag.astro).

Etiqueta curta usada pra status, categoria, premiação ou badge informativo.

## Anatomia

```
[ texto curto, 1-2 palavras ]
```

Inline-block, padding compacto, alta presença visual via cor.

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `"neutral" \| "info" \| "success" \| "warning" \| "error" \| "brand"` | `"neutral"` | Cor + significado. |
| `class` | `string` | — | Classes extras. |

Aceita `<slot />` pro texto.

## Variantes

| Variante | Quando |
|----------|--------|
| **neutral** | Categoria genérica (bairro, tipo de prato). |
| **info** | Aviso informativo (ex: "estreante"). |
| **success** | Premiação positiva ("vencedor 2025"). |
| **warning** | Atenção ("informação pode estar desatualizada"). |
| **error** | Estado problemático (raro em listagem pública). |
| **brand** | Destaque urucum — usar com moderação. |

## Acessibilidade

- Variantes não dependem só de cor — texto explícito comunica.
- Quando a Tag agrega significado importante (ex: "vencedor"), considerar `<span role="status">` ou texto adicional pra leitor de tela.

## Exemplo

```astro
<Tag variant="success">Vencedor 2025</Tag>
<Tag variant="info">Estreante</Tag>
```
