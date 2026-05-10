# Breadcrumb

> Implementação: [`src/components/ui/Breadcrumb.astro`](../../../src/components/ui/Breadcrumb.astro).

Trilha de navegação hierárquica no topo das páginas internas.

## Anatomia

```
Início › Cidade › Nome do buteco
```

Renderiza como `<nav aria-label="breadcrumb">` contendo `<ol>` de itens. Último item não vira link.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `Array<{ label: string; href?: string }>` | Lista de níveis. Item sem `href` = página atual. |

## Acessibilidade

- `<nav aria-label="breadcrumb">` identifica a região.
- `<ol>` mantém ordem semântica.
- Separadores são `aria-hidden` (decorativos).
- Último item recebe `aria-current="page"` automaticamente.

## Exemplo

```astro
<Breadcrumb items={[
  { label: "Início", href: base },
  { label: "Belo Horizonte", href: `${base}butecos/belo-horizonte/` },
  { label: "Federal Bar e Cozinha" },
]} />
```

## Quando NÃO usar

- Em páginas raiz como `/` — breadcrumb seria redundante.
- Em fluxos lineares de uma etapa só (ex: form simples).
