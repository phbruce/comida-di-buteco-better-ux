# Roadmap

> Última atualização: 2026-05-09

Status: 🟢 Fase 0 concluída · 🟡 Fase 2 e 3 iniciadas (com ADRs 0002-0004 ACCEPTED em 2026-05-09).

---

## Fase 0 — Fundação documental e do design system

**Objetivo:** estabelecer a base de decisão e o vocabulário visual do projeto.

- [x] Estrutura de repositório (`docs/`, `.claude/`, `scripts/`)
- [x] Templates de RF, RNF e ADR
- [x] RFs iniciais (RF-0001 a RF-0005)
- [x] RNFs iniciais (RNF-0001 a RNF-0005)
- [x] ADR-0001 — Estrutura de documentação (ACCEPTED)
- [x] ADR-0002 — Design system base GOV.UK (ACCEPTED em 2026-05-09)
- [x] ADR-0003 — Stack tecnológico Astro + GitHub Pages (ACCEPTED em 2026-05-09)
- [x] ADR-0004 — Tokens de design "Buteco Moderno" (ACCEPTED em 2026-05-09)
- [x] SessionStart hook + skills de auto-conhecimento

**Saída:** repositório navegável, decisões de fundação aprovadas.

---

## Fase 1 — Diagnóstico do site atual

**Objetivo:** documentar de forma objetiva os problemas e oportunidades do site atual.

- [ ] Heurísticas de Nielsen aplicadas a cada fluxo principal
- [ ] Auditoria de acessibilidade (axe / Lighthouse) do site atual
- [ ] Auditoria de performance (Core Web Vitals) do site atual
- [ ] Mapa de fluxos: home → cidade → buteco → voto
- [ ] Inventário de conteúdo

**Saída:** `docs/pesquisa/diagnostico-site-atual.md` preenchido com evidências.

---

## Fase 2 — Design tokens e fundamentos

**Objetivo:** transformar o ADR-0004 em tokens utilizáveis.

- [ ] `docs/design-system/tokens/colors.md`
- [ ] `docs/design-system/tokens/typography.md`
- [ ] `docs/design-system/tokens/spacing.md`
- [ ] `docs/design-system/tokens/radius.md`
- [ ] `docs/design-system/tokens/elevation.md` (se aplicável)
- [ ] `docs/design-system/grid.md` — sistema de grid mobile-first
- [ ] `docs/design-system/breakpoints.md`

**Saída:** tokens documentados e prontos para virar CSS variables.

---

## Fase 3 — Componentes essenciais

**Objetivo:** desenhar os componentes mínimos para reconstruir as telas-chave.

- [ ] Button (primário, secundário, terciário, warning)
- [ ] Input (text, search, select, radio, checkbox)
- [ ] Card de buteco
- [ ] Header / Skip-link
- [ ] Footer
- [ ] Phase banner (estilo GOV.UK)
- [ ] Tag / Badge
- [ ] Pagination
- [ ] Notification / Inset text
- [ ] Breadcrumb

Cada componente terá: especificação, estados, exemplos, anatomia, acessibilidade, ADR próprio se decisão estrutural.

---

## Fase 4 — Telas-chave

**Objetivo:** aplicar o design system às páginas principais.

- [ ] Seleção de cidade
- [ ] Listagem de butecos por cidade
- [ ] Detalhe do buteco (com prato, fotos, votação)
- [ ] Página de votação
- [ ] Página estática (regulamento, sobre)

---

## Fase 5 — Validação

- [ ] Testes de usabilidade moderados (5 usuários por cidade-alvo)
- [ ] Testes de acessibilidade automatizados (CI)
- [ ] Métricas de performance no campo (Core Web Vitals)

---

## Backlog

Itens sem prazo, candidatos a fases futuras:

- Modo escuro
- Internacionalização
- PWA / instalação no celular
- Login social para votação
- Lista de favoritos
- Comparador de butecos

---

## Marcos (milestones)

| Marco                                  | Critério de saída                                    |
|----------------------------------------|------------------------------------------------------|
| M0 — Fundação aprovada                 | ADRs 0001-0004 ACCEPTED                              |
| M1 — Diagnóstico publicado             | Documento com 5+ evidências por categoria            |
| M2 — Tokens prontos                    | CSS vars publicadas em `src/styles/tokens.css`       |
| M3 — DS v0.1                           | 8 componentes documentados e implementados          |
| M4 — Beta navegável                    | 4 telas-chave acessíveis em ambiente de preview      |
| M5 — Lighthouse ≥ 95 (a11y, perf, SEO) | Métricas validadas em produção                       |
