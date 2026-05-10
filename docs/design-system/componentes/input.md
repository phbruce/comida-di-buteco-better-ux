# Input

> Implementação: [`src/components/ui/Input.astro`](../../../src/components/ui/Input.astro). Decisão: ADR-0002 (DS GOV.UK) + RNF-0001 (a11y).

Campo de formulário com label, hint e mensagem de erro acessíveis.

## Anatomia

```
Label (obrigatório, sempre visível)
[ campo de texto ]
hint (opcional, em texto pequeno)
mensagem de erro (quando inválido, com aria-live)
```

## Props principais

| Prop | Tipo | Descrição |
|------|------|-----------|
| `id` | `string` | Obrigatório — usado pra associar `<label>`. |
| `name` | `string` | Nome no FormData. |
| `label` | `string` | Texto da label, sempre visível. |
| `type` | `"text" \| "search" \| "email" \| "tel" \| "url"` | Tipo HTML. |
| `value` | `string` | Valor inicial. |
| `placeholder` | `string` | Placeholder — não substitui label. |
| `hint` | `string` | Texto de ajuda abaixo do campo. |
| `error` | `string` | Mensagem de erro (quando preenchida, marca o campo como inválido). |
| `required` | `boolean` | Marca `aria-required` + asterisco visual. |
| `autocomplete` | `string` | Token de autocomplete HTML. |

## Acessibilidade

- `<label for="id">` sempre associada — nunca placeholder-only.
- `aria-describedby` aponta pro hint quando existe.
- `aria-invalid="true"` quando há erro; `aria-describedby` aponta pro erro também.
- Foco visível com `--shadow-focus` (anel amarelo).
- Borda input sempre `--border-input` (preto), 2px — alta presença pra evitar campo "fantasma" comum em inputs flat.

## Exemplo

```astro
<Input
  id="cidade"
  name="cidade"
  label="Cidade"
  type="search"
  placeholder="ex.: Belo Horizonte"
  hint="Digite o nome ou parte dele."
  required
/>
```

## Quando NÃO usar

- Pro padrão "busca com autocomplete" use o combobox direto na página de listagem (já implementado em `butecos/[cidade]/index.astro`) — Input simples não cobre o pattern ARIA combobox.
