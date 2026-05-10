# Breakpoints

> Implementação dispersa em `<style>` dos componentes. Decisão: [ADR-0002](./adr/ADR-0002-design-system-base-govuk.md), [ADR-0003](./adr/ADR-0003-stack-tecnologico.md).

Mobile-first: estilos base atendem 320px; media queries usam **`min-width`** progressivo.

## Escala

| Nome | Valor | Quando |
|------|-------|--------|
| **base** | (até 379px) | iPhone SE 1ª geração e similares (mais antigos / menores). |
| **xs** | `≥ 380px` | Mobile padrão (iPhone moderno). Limite de "esconder elementos extras" em bandas decorativas. |
| **sm** | `≥ 480px` | Mobile grande / phablets. |
| **md** | `≥ 640px` | Tablets pequenos. **Tokens de espaço crescem aqui.** |
| **lg** | `≥ 768px` | Tablets / desktop pequeno. **Layouts viram multi-coluna.** |
| **xl** | `≥ 1024px` | Desktop padrão. Aside lateral aparece. |
| **2xl** | `≥ 1280px` | Desktop wide. Limite superior do `clamp()` da tipografia. |

## Onde cada um aparece

- **`@media (max-width: 380px)`:** esconder motivos extras na `IllustrationBand` (uso defensivo).
- **`@media (min-width: 480px)`:** brand mark do header cresce (36→44px), tagline do brand aparece, nav fica maior.
- **`@media (min-width: 640px)`:** tokens de espaço aumentam (`--space-4` 16→20px, etc.); container-padding aumenta; footer vira 3 colunas.
- **`@media (min-width: 768px)`:** header vira single-row (brand+nav+city); hero da home ganha grid lateral pros acentos; sobre/concurso ganham acentos extras (tomate, milho secundário).
- **`@media (min-width: 1024px)`:** detalhe do buteco vira 2-col (corpo + aside).

## Convenções

- **Sempre `min-width`**, não `max-width`. Mobile é o default; desktop adiciona.
- **Exceção:** `max-width: 380px` para esconder elementos decorativos extras em telas muito pequenas — caso defensivo, não estrutural.
- **Não criar breakpoint custom** sem necessidade. Reutilizar a escala mantém o site previsível.
- **Não definir tokens de breakpoint em CSS variables**: media queries não suportam variáveis, então fica como números literais comentados.

## Frutas em mente

Sempre testar mobile-first em **320px** primeiro (RNF-0003). Se um layout só fica bom em ≥480px, **falhamos no mobile**. Devolver pro design.
