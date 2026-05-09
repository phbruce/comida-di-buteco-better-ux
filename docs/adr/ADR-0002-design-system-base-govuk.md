# ADR-0002 — Design System inspirado em GOV.UK (proposta)

- **Status:** PROPOSED ⚠️ aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **RFs/RNFs relacionados:** RF-0001, RF-0002, RF-0003, RF-0004, RF-0005, RNF-0001, RNF-0002, RNF-0003

## Contexto

O dono do produto pediu um design system "**baseado no GOV.UK**", "**minimalista mas coeso**", "**fácil e bonito de navegar**", "**mobile first** mas lindo no desktop".

O GOV.UK Design System é referência mundial em:
- Acessibilidade (WCAG AA real, testado).
- Linguagem clara e direta.
- Conteúdo antes de cromo visual.
- Foco amarelo `#ffdd00` como marca registrada de usabilidade.
- Componentes pequenos e combináveis.

O domínio Comida di Buteco é, porém, **diferente**: gastronômico, regional brasileiro, lúdico, com forte apelo emocional (comida, descoberta, votação). Um design **cinza-azulado-britânico** seria frio para o público.

## Decisão (proposta)

Adotamos os **princípios e a arquitetura** do GOV.UK Design System como **referência inspiracional**, com **identidade visual brasileira** própria.

Concretamente:

1. **Princípios herdados (sem mudança):**
   - Conteúdo primeiro.
   - Acessibilidade WCAG 2.2 AA mínimo (RNF-0001).
   - Linguagem clara, voz ativa, frases curtas.
   - Foco visível com alto contraste (cor de foco vibrante — provavelmente amarelo, a confirmar em ADR-0004).
   - HTML semântico antes de ARIA.
   - Componentes pequenos e padrões reutilizáveis.

2. **Arquitetura herdada:**
   - Sistema de espaçamento responsivo (escala 0–9, troca em 640px) — herdaremos a escala numérica.
   - Componentes nomeados: Button, Skip-link, Phase banner, Inset text, Notification banner, Details, Pagination, Breadcrumbs, Tag, Form fields.
   - Grid mobile-first; 12 colunas desktop.

3. **Identidade própria:**
   - Paleta com **alma brasileira/gastronômica** (a propor em ADR-0004) — não copiamos o azul GOV.UK.
   - Tipografia **livre e ocidental moderna** (sem fontes proprietárias).
   - Tom de voz **caloroso e direto**, não burocrático.

4. **Não copiamos:**
   - Hex colors literais (a documentação GOV.UK pede explicitamente que não se copie).
   - Marca visual GOV.UK (logo, "crown", brasão).

## Alternativas consideradas

### Alternativa A — Material Design 3
- **Prós:** componentes prontos, ecossistema enorme, suporte a temas.
- **Contras:** opinativo demais; estética "Google" engessa identidade gastronômica; elevation/sombras mais pesadas conflitam com minimalismo pedido.

### Alternativa B — Apple HIG / iOS-like
- **Prós:** elegante, familiar.
- **Contras:** muito vinculado a iOS; pobre em padrões web; menos focado em acessibilidade aberta.

### Alternativa C — Design system do zero, sem referência
- **Prós:** liberdade total.
- **Contras:** alto risco de inconsistência e dívida; reinventa rodas testadas.
- **Por que não:** o pedido do dono é explícito por GOV.UK como referência.

### Alternativa D — Adoção literal do GOV.UK (incluindo paleta) — **proposta principal pelo nome**
- **Prós:** muito rápido.
- **Contras:** o azul/cinza britânico é frio para o público brasileiro de buteco; quebra promessa de "lindo"; conflita com identidade gastronômica.
- **Por que não:** seguimos os **princípios e arquitetura**, não as **cores**.

### Alternativa E — Princípios + arquitetura GOV.UK com identidade BR (adotada nesta proposta)
- **Prós:** rigor britânico em a11y/UX + identidade que o público reconhece.
- **Contras:** mais trabalho que cópia direta.

## Consequências

### Positivas
- Acessibilidade fica embutida no DNA do projeto.
- Componentes têm vocabulário comum, conhecido pela comunidade.
- Linguagem clara reduz erros de votação e de navegação.

### Custos aceitos
- Tempo extra para definir paleta e tipografia "BR" coerentes (Fase 2).
- Equipe precisa internalizar princípios GOV.UK para não desviar.

### Neutras
- Mudança futura para outro DS é viável (componentes são padrão).

## Plano de implementação (após ACCEPTED)

- [ ] ADR-0004 — Tokens (cores, tipografia, espaço) baseados nesta proposta.
- [ ] Documentar princípios em `docs/design-system/principios.md`.
- [ ] Lista canônica de componentes em `docs/design-system/componentes/README.md`.
- [ ] Criar 1 prova de conceito (Card de buteco) usando os tokens.

## Como reverter

Cada componente é independente. Se o caminho não funcionar, podemos pivotar para outro DS por componente, sem refazer tudo.

## Referências

- GOV.UK Design System — https://design-system.service.gov.uk/
- GOV.UK Service Manual — https://www.gov.uk/service-manual
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
