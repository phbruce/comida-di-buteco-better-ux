# IllustrationBand

> Implementação: [`src/components/ui/IllustrationBand.astro`](../../../src/components/ui/IllustrationBand.astro). Decisão: [ADR-0016](../../adr/ADR-0016-ilustracoes-personalidade-visual.md).

Faixa horizontal compondo motivos com rotações leves e shifts verticais. Substituiu a primeira tentativa (`OrnamentBand`) que tinha leitura crua.

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `tone` | `"soft" \| "transparent" \| "dark"` | `"soft"` | Background da faixa. |
| `variant` | `"default" \| "wide"` | `"default"` | `default` mostra 4 motifs; `wide` mostra 10. |
| `class` | `string` | — | Classes extras. |

## Comportamento

- **Cada motif** recebe rotação fixa (-7° a +8°) e shift vertical (-3 a +4 px) — quebra grid mecânico.
- **Mobile (≤380px):** esconde itens 4+ pra não quebrar feio em duas linhas.
- **Mobile (381-767px):** mostra 4.
- **Desktop:** mostra 4 (default) ou 10 (wide).
- **`tone="dark"`:** aplica `filter: brightness(0.96) saturate(0.92)` nos SVGs pra suavizar contra o fundo escuro.

## Tones

| Tone | Bg | Quando |
|------|----|----|
| `soft` | `--color-bg-soft` | Sobre canvas branco — mais raro. |
| `transparent` | nenhum | Quando o container já tem cor. |
| `dark` | `--color-surface-strong` | Dentro do footer. **Padrão atual no Footer.astro.** |

## Acessibilidade

- Banner inteiro é `aria-hidden="true"` — decorativo, leitor de tela ignora.
- Não comunica conteúdo essencial; é puro ornamento.

## Exemplo

```astro
<!-- Topo do footer -->
<IllustrationBand tone="dark" class="site-footer__band" />

<!-- Wide com 10 motivos pra cabeçalho de seção em páginas curtas -->
<IllustrationBand tone="soft" variant="wide" />
```

## Quando NÃO usar

- Em listagens densas (já tem peso visual nos cards).
- Em fluxos críticos como formulários (compete com a tarefa).
- Mais de uma vez na mesma página — fica saturado.
