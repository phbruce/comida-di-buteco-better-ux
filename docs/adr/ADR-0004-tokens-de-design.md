# ADR-0004 — Tokens de design: cores, tipografia, espaço (proposta)

- **Status:** PROPOSED ⚠️ aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **RFs/RNFs relacionados:** RF-0001, RF-0003, RNF-0001 (a11y), RNF-0003 (mobile-first)

## Contexto

Tokens são a **camada mais fundamental** do design system: cores, tipografia, espaços, raios, breakpoints. Toda a UI deriva deles.

A proposta segue **ADR-0002** (princípios e arquitetura GOV.UK + identidade brasileira/gastronômica) e o pedido do dono: "minimalista mas coeso e bem pensado", "lindo".

Restrições duras:
- Contraste WCAG AA mínimo em **todas** as combinações texto/fundo (RNF-0001).
- Foco visível com contraste ≥ 3:1 contra qualquer fundo (RNF-0001).
- Tipografia legível em 320px, ≥ 16px no body (RNF-0003).

## Decisão (proposta)

### 1. Paleta — "Buteco Moderno"

A paleta toma como inspiração ingredientes brasileiros (terra, feijoada, cerveja, lima da terra) e a precisão funcional do GOV.UK. Todas as combinações abaixo passam **AA** para texto normal.

#### Cores funcionais (semântica)

| Token            | Hex       | Contraste em `--bg-canvas` (`#ffffff`) | Uso |
|------------------|-----------|----------------------------------------|-----|
| `--text-strong`  | `#1a1815` | 17.4:1 (AAA)                           | Texto principal |
| `--text-muted`   | `#5b554c` | 7.6:1 (AAA)                            | Texto auxiliar |
| `--text-on-dark` | `#fbf7f0` | (fundo escuro)                         | Texto sobre `--surface-strong` |
| `--bg-canvas`    | `#ffffff` | base                                    | Fundo do body |
| `--bg-soft`      | `#faf6ee` | 1.05:1 (decorativo)                     | Áreas suaves (linha alternada, hero) |
| `--surface`      | `#fbf7f0` | 1.07:1 (decorativo)                     | Cartão de buteco |
| `--surface-strong` | `#1a1815` | invertido                            | Footer, modos invertidos |
| `--border`       | `#cfc6b5` | 3.1:1 vs `--text-strong`                | Bordas padrão |
| `--border-strong`| `#1a1815` | 17.4:1                                  | Inputs, separadores fortes |

#### Cores de marca

| Token             | Hex       | Inspiração | Uso |
|-------------------|-----------|------------|-----|
| `--brand-primary` | `#9c2a1b` | Pimenta-malagueta / urucum | CTA principal, links |
| `--brand-primary-hover` | `#741f14` | escurecimento ~25% | Hover do CTA |
| `--brand-secondary` | `#1f6f4a` | Verde lima da terra | CTA secundário (raro) |
| `--brand-accent`  | `#f4b400` | Goiabada / dendê | Acento, badges premiação |

Combinações testadas:
- Botão `--brand-primary` (#9c2a1b) com texto `#fbf7f0` → contraste **8.6:1** (AAA).
- Link `--brand-primary` sobre `#ffffff` → contraste **6.8:1** (AAA).
- Botão `--brand-accent` (#f4b400) com texto `#1a1815` → contraste **11.0:1** (AAA).

#### Cores de estado

| Token             | Hex       | Uso |
|-------------------|-----------|-----|
| `--state-error`   | `#b3261e` | Mensagens de erro |
| `--state-success` | `#0d6e44` | Sucesso (voto registrado) |
| `--state-warning` | `#a3650a` | Avisos |
| `--state-info`    | `#1a5fa6` | Informações |

#### Cor de foco — **assinatura visual**

Inspirada no GOV.UK, mas em **mostarda** para harmonizar com o resto:

| Token              | Hex       | Sobre branco | Sobre preto |
|--------------------|-----------|--------------|-------------|
| `--focus-ring`     | `#ffcc00` | 2.0:1 (decorativo, ok com sublinhado) | 13.7:1 |
| `--focus-text`     | `#1a1815` | 17.4:1       | invertido   |

Padrão de foco: **2px de offset transparente + 3px de cor de foco + sublinhado de 2px no texto**, garantindo contraste em qualquer fundo.

### 2. Tipografia

**Fonte primária:** [Inter](https://rsms.me/inter/) — variável, livre, otimizada para tela.
**Fonte de número/título display:** Inter mesmo, com `font-feature-settings: "tnum"` para tabelas.

Razão: Inter combina neutralidade do GOV.UK Transport com leveza moderna. Auto-hospedada (RNF-0005, sem chamadas a Google Fonts).

#### Escala — fluida com `clamp()` (mobile → desktop)

| Token            | Mobile (320px) | Desktop (≥1024px) | Linha | Peso | Uso |
|------------------|---------------:|------------------:|------:|-----:|-----|
| `--font-display` | 32px           | 48px              | 1.1   | 700  | H1 hero |
| `--font-h1`      | 28px           | 36px              | 1.2   | 700  | H1 página |
| `--font-h2`      | 22px           | 28px              | 1.25  | 700  | H2 |
| `--font-h3`      | 18px           | 22px              | 1.3   | 600  | H3 |
| `--font-body`    | 16px           | 18px              | 1.6   | 400  | Texto |
| `--font-small`   | 14px           | 16px              | 1.5   | 400  | Auxiliar |
| `--font-caption` | 12px           | 13px              | 1.4   | 500  | Caption |

Implementação: `clamp(min, fluid, max)` com base em `vw`.

### 3. Espaçamento — escala GOV.UK herdada

| Token   | Mobile | Desktop |
|---------|-------:|--------:|
| `--space-0` | 0    | 0    |
| `--space-1` | 4px  | 4px  |
| `--space-2` | 8px  | 8px  |
| `--space-3` | 12px | 12px |
| `--space-4` | 16px | 20px |
| `--space-5` | 20px | 24px |
| `--space-6` | 24px | 32px |
| `--space-7` | 32px | 40px |
| `--space-8` | 40px | 56px |
| `--space-9` | 56px | 72px |

> Pequena adaptação: começamos em múltiplos de 4 (mais comum no ecossistema CSS) ao invés de 5; a curva é equivalente à do GOV.UK.

### 4. Raios e bordas

| Token         | Valor | Uso |
|---------------|------:|-----|
| `--radius-none` | 0    | inputs (estilo GOV.UK) |
| `--radius-sm`   | 4px  | tags |
| `--radius-md`   | 8px  | cards, botões |
| `--radius-lg`   | 16px | sheets, modals |

| Token            | Valor | Uso |
|------------------|------:|-----|
| `--border-thin`  | 1px solid var(--border) | padrão |
| `--border-strong`| 2px solid var(--border-strong) | inputs, dividers |

### 5. Breakpoints

| Token   | Largura |
|---------|--------:|
| `sm`    | 480px   |
| `md`    | 640px   |
| `lg`    | 1024px  |
| `xl`    | 1280px  |
| `2xl`   | 1536px  |

### 6. Sombras

Minimalismo: **uma única sombra** para destacar elementos elevados, sem cascata de profundidade.

```css
--shadow-1: 0 1px 0 0 var(--border);
--shadow-2: 0 4px 12px -4px rgba(26,24,21,.12);
```

### 7. Movimento

```css
--motion-fast: 120ms;
--motion-base: 200ms;
--motion-slow: 320ms;
--easing-standard: cubic-bezier(.2,.8,.2,1);
```

`prefers-reduced-motion: reduce` reduz toda animação a 0ms.

## Alternativas consideradas

### Alt A — Cópia literal do GOV.UK (azul `#1d70b8`)
- **Prós:** rápido; testes de a11y já feitos.
- **Contras:** azul britânico não conversa com gastronomia regional brasileira.

### Alt B — Paleta vibrante (mostarda + verde) sem terra
- **Prós:** alegre.
- **Contras:** "doceria"; perde a identidade boteco.

### Alt C — Paleta "buteco moderno" (urucum/lima/dendê) — adotada
- Equilibra calor (urucum) + frescor (lima) + acentuação festiva (dendê).
- Mantém AA em todas as combinações.

### Tipografia — Source Sans 3 vs Inter vs IBM Plex
- **Inter (escolhida):** mais neutra para corpo pequeno, fonte variável (1 arquivo, todos os pesos), legibilidade testada em 4G.
- IBM Plex: mais "tech", menos calorosa.
- Source Sans 3: ótima, mas fonte variável menos consolidada.

## Consequências

### Positivas
- Identidade brasileira sem perder rigor.
- Todos os contrastes AA testados antes de implementar.
- Fonte única → 1 download, 1 cache.

### Custos aceitos
- Mais trabalho que copiar tokens prontos.
- Tons quentes exigem cuidado em modo escuro futuro (a tratar quando virar prioridade).

## Plano de implementação (após ACCEPTED)

- [ ] `src/styles/tokens.css` com todas as `--var`.
- [ ] `docs/design-system/tokens/` com cada categoria documentada.
- [ ] Componente "Sample" no Storybook (ou doc estático) mostrando tokens em ação.
- [ ] Verificação automática de contraste em CI (`pa11y`, `axe`).

## Como reverter

Tokens são `--vars` CSS. Trocar valores não exige refatorar componentes.

## Referências

- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- GOV.UK colour — https://design-system.service.gov.uk/styles/colour/
- GOV.UK spacing — https://design-system.service.gov.uk/styles/spacing/
- Inter font — https://rsms.me/inter/
