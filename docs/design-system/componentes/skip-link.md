# SkipLink

> Implementação: [`src/components/ui/SkipLink.astro`](../../../src/components/ui/SkipLink.astro). Decisão: RNF-0001 (a11y).

Link "pular pro conteúdo" — primeiro elemento focável da página, invisível até receber foco.

## Anatomia

`<a href="#main">` que aparece visualmente apenas quando recebe foco via teclado. Vai pro `<main id="main" tabindex="-1">` na página.

## Comportamento

- **Não focado:** posição absoluta fora da viewport (`top: -100px` ou `clip`).
- **Focado:** vira o primeiro elemento visível, no topo, com `--shadow-focus`.
- **Ativado (Enter):** scroll instantâneo pro `<main>` + foco programático.

## Acessibilidade

- Primeiro elemento focável é regra — usuários de teclado e leitor de tela pulam navegação repetida em cada página.
- Texto explícito "Pular para o conteúdo principal" — não é ícone.
- O `<main>` tem `tabindex="-1"` pra receber foco programático sem ser tabbed normalmente.

## Quando NÃO usar

- Skip links múltiplos por seção (ex: pular pro footer) são raramente úteis e poluem. Manter um só.
