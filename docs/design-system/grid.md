# Sistema de grid

> Decisão: [ADR-0002](./adr/ADR-0002-design-system-base-govuk.md), [ADR-0003](./adr/ADR-0003-stack-tecnologico.md). Implementação: `.container` em `src/styles/base.css` + CSS Grid local nos componentes.

Não usamos um grid de 12 colunas global. Cada componente define seu próprio layout via **CSS Grid** ou **Flexbox**, ancorado em três containers padrão.

## Containers

| Token | Valor | Uso |
|-------|-------|-----|
| `--container-narrow` | 640px | Texto longo (sobre, concurso) — leitura confortável (~65ch). |
| `--container-default` | 1024px | Listagens, detalhe do buteco, home. |
| `--container-wide` | 1280px | Reservado para hero / cenas com muito conteúdo (não usado hoje). |

```css
.container {
  width: 100%;
  max-width: var(--container-default);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}
.container--narrow { max-width: var(--container-narrow); }
.container--wide   { max-width: var(--container-wide); }
```

`--container-padding` é responsivo: 16px no mobile, 32px no desktop (≥640px).

## Padrões de grid local

### Listagem de cidades (home)

Mobile: 1 coluna. Tablet: ramifica em 2-3 colunas via `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.

### Detalhe do buteco (≥1024px)

```css
.buteco__layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: var(--space-8);
}
```

Corpo (foto + prato) à esquerda, aside (mapa + contato + CTA) à direita.

### Hero da home (≥768px)

```css
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-6);
}
```

Texto à esquerda, área pra acentos decorativos à direita.

### Footer (≥640px)

```css
.site-footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-7);
}
```

Coluna "Sobre" maior porque tem mais conteúdo + redes sociais.

### Card do buteco

CSS Grid com `auto auto` (foto/placeholder + corpo) ou `auto 1fr auto` no list-item (foto + corpo + chevron).

## Filosofia

- **Mobile-first sem grid global** porque cada tela tem seu propósito visual; um grid de 12 colunas força componentes a se adaptar a uma malha que não os serve.
- **Containers padronizados + grid local** dá ritmo visual consistente sem amarrar a forma.
- **`minmax(0, 1fr)`** em vez de `1fr` quando o conteúdo pode ser longo — evita overflow horizontal em strings sem espaço.

## Limites

Pra páginas com texto longo (`/sobre/`, `/concurso/`), use `.container--narrow` mais `max-width: 65ch` em parágrafos. 65 caracteres por linha é o sweet spot de leitura.
