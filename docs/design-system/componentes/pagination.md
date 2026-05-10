# Pagination

> Implementação: [`src/components/ui/Pagination.astro`](../../../src/components/ui/Pagination.astro).

Navegação anterior/próximo + status atual. Usado na listagem de butecos por cidade quando há muitos resultados.

## Anatomia

```
[ ← Anterior ]    Página X de Y    [ Próxima → ]
```

`<nav aria-label="Paginação">` contendo dois `<button>` + um `<span aria-live="polite">` central.

## Props (data-attrs)

A paginação é dirigida por JS — atributos `data-pag-prev`, `data-pag-next`, `data-pag-status` apontam pros elementos. O componente não recebe props clássicos; o JS da página o controla.

## Estados

- **Default:** ambos botões habilitados.
- **Primeira página:** Anterior disabled.
- **Última página:** Próxima disabled.
- **Sem resultados:** componente fica `hidden`.
- **Atualização:** `aria-live="polite"` no status anuncia "Página 2" pro leitor.

## Acessibilidade

- `<nav aria-label="Paginação">` identifica.
- Botões disabled usam `disabled` HTML (não `aria-disabled`) porque não devem ser focáveis no fim.
- Status com `aria-live` anuncia mudança sem roubar foco.
- Setas (`←`, `→`) são `aria-hidden` — texto "Anterior"/"Próxima" carrega o significado.

## Quando usar

- Listagem com 20+ itens onde scroll infinito não é desejável (perde rastreio).
- Conteúdo com URL parametrizável (`?page=N`) pra preservar estado.

## Quando NÃO usar

- Listas curtas (<20 itens) — mostre tudo.
- Feed cronológico onde "carregar mais" é mais natural.
