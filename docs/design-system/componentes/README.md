# Componentes — Design System

> Cada componente entrega: anatomia, estados, exemplos, acessibilidade e quando usar.

## Implementados (v0.1)

| Componente | Arquivo | Propósito |
|------------|---------|-----------|
| **Button** | `src/components/ui/Button.astro` | Ação primária, secundária, terciária ou de aviso. |
| **Tag** | `src/components/ui/Tag.astro` | Etiqueta curta (premiação, categoria, status). |
| **Input** | `src/components/ui/Input.astro` | Campo de formulário com label, hint e erro acessíveis. |
| **SkipLink** | `src/components/ui/SkipLink.astro` | Pular para o conteúdo (RNF-0001). |
| **PhaseBanner** | `src/components/ui/PhaseBanner.astro` | Bandeira de fase (alpha/beta/aviso de edição). |
| **Pagination** | `src/components/ui/Pagination.astro` | Anterior/próximo + páginas numeradas. |
| **Header** | `src/components/site/Header.astro` | Cabeçalho do site com brand + cidade ativa. |
| **Footer** | `src/components/site/Footer.astro` | Rodapé escuro com 3 colunas no desktop. |
| **ButecoCard** | `src/components/site/ButecoCard.astro` | Card de listagem do buteco (RF-0001). |

## Backlog (próximas iterações)

- `Breadcrumb` — atualmente inline na listagem; extrair.
- `NotificationBanner` — info/success/warning/error.
- `InsetText` — destaque sem virar alerta.
- `Details` — `<details>` estilizado.
- `Modal` / `Sheet` — para filtros expansíveis no mobile.
- `RatingBar` / `VotingForm` — para RF-0005.

## Boas práticas

1. **Anatomia primeiro:** todo componente tem uma "estrutura mínima" descrita no topo do arquivo.
2. **Props mínimas:** prefira aceitar slot a aceitar muitos props.
3. **Acessibilidade no nascimento:** `aria-*` e foco visível **dentro** do componente.
4. **Sem CSS global (exceto no entry).** Use `<style>` escopado por componente; tokens vêm de `--vars`.
5. **Toda decisão importante (alterar variantes, adicionar novo componente) gera ADR.**
