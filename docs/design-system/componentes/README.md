# Componentes — Design System

> Cada componente entrega: anatomia, estados, exemplos, acessibilidade e quando usar. Documentação textual aqui é dívida; por enquanto a fonte da verdade são os arquivos `.astro` em `src/components/`.

## Implementados — UI primitivos (`src/components/ui/`)

| Componente | Arquivo | Propósito |
|------------|---------|-----------|
| **Button** | `Button.astro` | Ação primária, secundária, terciária ou de aviso. |
| **Input** | `Input.astro` | Campo de formulário com label, hint e erro acessíveis. |
| **Tag** | `Tag.astro` | Etiqueta curta (premiação, categoria, status). |
| **Breadcrumb** | `Breadcrumb.astro` | Trilha de navegação no topo das páginas. |
| **Pagination** | `Pagination.astro` | Anterior/próximo + páginas numeradas. |
| **SkipLink** | `SkipLink.astro` | Pular pro conteúdo (RNF-0001). |
| **PhaseBanner** | `PhaseBanner.astro` | Bandeira "redesign não oficial" no topo de toda página. |
| **Illustration** | `Illustration.astro` | Wrapper pra um motivo paper-cut (kind + size + ariaLabel opcional). ADR-0016. |
| **IllustrationBand** | `IllustrationBand.astro` | Faixa horizontal compondo motivos com rotações leves; tone soft/transparent/dark. |

## Implementados — site-specific (`src/components/site/`)

| Componente | Arquivo | Propósito |
|------------|---------|-----------|
| **Header** | `Header.astro` | Cabeçalho com brand mark (garrafa long-neck paper-cut) + nav + cidade ativa. |
| **Footer** | `Footer.astro` | Rodapé escuro com IllustrationBand no topo + colunas + redes sociais oficiais. |
| **ButecoCard** | `ButecoCard.astro` | Card de listagem do buteco (RF-0001). Placeholder com motivo determinístico quando não há foto. |
| **ButecoListItem** | `ButecoListItem.astro` | Item estilo "Document list" do GOV.UK (foto opcional + corpo + chevron). |
| **Map** | `Map.astro` | Google Maps Embed lazy-loaded com toggle "Mostrar mapa" (ADR-0009/0010). |
| **Feedback** | `Feedback.astro` | "Esta informação está correta?" — Web3Forms + Turnstile (ADR-0012/0013). |

## Backlog (próximas iterações)

- **NotificationBanner** — info/success/warning/error reutilizável.
- **InsetText** — destaque sem virar alerta (já há um inline em `/concurso/`; extrair).
- **Details** — `<details>` estilizado.
- **Modal / Sheet** — para filtros expansíveis no mobile.
- **Card de cidade** — atualmente inline no `index.astro`; extrair se a home for evoluir.

## Componentes removidos / depreciados

| Componente | ADR | Status |
|------------|-----|--------|
| **Comments** (lista + form de comentários) | ADR-0015 | Removido em 2026-05-10 (DEPRECATED). |
| **Rating stars + pergunta de visita** (dentro do Comments) | ADR-0017 | Removido junto com Comments (DEPRECATED). |

## Boas práticas

1. **Anatomia primeiro:** todo componente tem comentário de cabeçalho explicando "estrutura mínima".
2. **Props mínimas:** prefira aceitar `<slot />` a aceitar muitos props.
3. **Acessibilidade no nascimento:** `aria-*` e foco visível **dentro** do componente.
4. **Sem CSS global** (exceto no entry `global.css` e `base.css`). Use `<style>` escopado por componente; tokens vêm de `--vars`.
5. **Toda decisão importante** (alterar variantes, adicionar novo componente, mudar API) gera ADR.
