# PhaseBanner

> Implementação: [`src/components/ui/PhaseBanner.astro`](../../../src/components/ui/PhaseBanner.astro). Inspirado em [GOV.UK Phase Banner](https://design-system.service.gov.uk/components/phase-banner/).

Faixa fina no topo da página identificando o estado/natureza do site. No nosso caso, sinaliza "redesign não oficial" em toda visita.

## Anatomia

```
[ TAG ] texto curto explicando o estado do site
```

`<div class="phase-banner">` com `<strong class="phase-banner__tag">` + texto via slot.

## Props

Apenas `<slot />` — todo o conteúdo customizável.

## Acessibilidade

- Texto sempre visível, não é só decorativo.
- Cor de fundo + borda inferior com `--color-bg-soft` + `--border-strong`.
- Sem `role` especial — é informativo, não interativo.

## Exemplo

```astro
<PhaseBanner>
  Este é um <strong>redesign não oficial</strong>, exploratório, sem vínculo com a organização do concurso.
  Site oficial: <a href="https://comidadibuteco.com.br/" rel="noopener">comidadibuteco.com.br</a>.
</PhaseBanner>
```

## Quando usar

- Sinalizar fase de desenvolvimento (alpha/beta) ou natureza do projeto (oficial vs não oficial).
- Avisos persistentes que precisam estar em toda página, sem dispensar.

## Quando NÃO usar

- Notificações temporárias (ex: "novo recurso disponível") — use componente dedicado de notification.
- Erros — use estados visuais mais fortes.
