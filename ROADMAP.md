# Roadmap

> Última atualização: 2026-05-10

**Status atual:** Fase 0 concluída · Fase 4 concluída no essencial (4 telas-chave no ar) · Fase 5 (validação) pendente.

Vários itens originalmente listados nas Fases 2-3 foram implementados direto em código (`src/styles/tokens.css`, `src/components/`) sem documento intermediário em `docs/design-system/`. A documentação textual desses itens segue como dívida.

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

**Saída:** repositório navegável, decisões de fundação aprovadas. **Concluída.**

---

## Fase 1 — Diagnóstico do site atual

**Objetivo:** documentar de forma objetiva os problemas e oportunidades do site atual.

- [ ] Heurísticas de Nielsen aplicadas a cada fluxo principal
- [ ] Auditoria de acessibilidade (axe / Lighthouse) do site atual
- [ ] Auditoria de performance (Core Web Vitals) do site atual
- [ ] Mapa de fluxos: home → cidade → buteco → voto
- [ ] Inventário de conteúdo

**Saída:** `docs/pesquisa/diagnostico-site-atual.md` preenchido com evidências.

**Status:** pendente. Skipped na primeira passada — partimos direto pra implementação. Boa candidata pra ser feita pós-MVP, comparando "antes vs depois".

---

## Fase 2 — Design tokens e fundamentos

**Objetivo:** transformar o ADR-0004 em tokens utilizáveis.

Tokens já vivem em `src/styles/tokens.css` (CSS variables) e funcionam em produção. Documentação textual em `docs/design-system/tokens/` ainda como dívida.

- [x] Tokens em CSS variables (`src/styles/tokens.css`)
- [ ] `docs/design-system/tokens/colors.md` — explicação das escolhas (urucum, lima, dendê)
- [ ] `docs/design-system/tokens/typography.md` — escala tipográfica e Inter Variable
- [ ] `docs/design-system/tokens/spacing.md` — escala (space-1 a space-9)
- [ ] `docs/design-system/tokens/radius.md` — todos zero (sharp)
- [ ] `docs/design-system/grid.md` — grid mobile-first
- [ ] `docs/design-system/breakpoints.md` — 380, 480, 640, 768, 1024

**Saída:** tokens documentados (já estão prontos como CSS).

---

## Fase 3 — Componentes essenciais

**Objetivo:** desenhar os componentes mínimos para reconstruir as telas-chave.

Implementação no ar; documentação em `docs/design-system/` ainda dívida.

- [x] Button (primário, secundário, terciário, warning) — `src/components/ui/Button.astro`
- [x] Input — `src/components/ui/Input.astro`
- [x] ButecoCard + ButecoListItem — `src/components/site/`
- [x] Header / SkipLink — `src/components/site/Header.astro`, `src/components/ui/SkipLink.astro`
- [x] Footer — `src/components/site/Footer.astro`
- [x] PhaseBanner — `src/components/ui/PhaseBanner.astro`
- [x] Tag — `src/components/ui/Tag.astro`
- [x] Pagination — `src/components/ui/Pagination.astro`
- [x] Breadcrumb — `src/components/ui/Breadcrumb.astro`
- [x] Illustration + IllustrationBand (sistema paper-cut, ADR-0016) — `src/components/ui/`
- [x] Map (Google Maps Embed lazy, ADR-0009/0010) — `src/components/site/Map.astro`
- [x] Feedback (Web3Forms + Turnstile, ADR-0012/0013) — `src/components/site/Feedback.astro`
- [ ] Notification / Inset text (não implementado ainda — usado inline em `/concurso/` mas sem componente reusável)

---

## Fase 4 — Telas-chave

**Objetivo:** aplicar o design system às páginas principais.

- [x] Seleção de cidade (`/`)
- [x] Listagem de butecos por cidade com busca + filtro por bairro + paginação (`/butecos/<cidade>/`)
- [x] Detalhe do buteco com foto, prato, mapa, contato, CTA "votar" → site oficial (`/butecos/<cidade>/<slug>/`)
- [x] Página `/sobre/` (sobre o redesign, stack, privacidade, marca)
- [x] Página `/concurso/` (mecânica, critérios, calendário 2026, regras)

**Status:** todas as telas previstas no MVP estão no ar.

---

## Fase 5 — Validação

- [ ] Testes de usabilidade moderados (5 usuários por cidade-alvo)
- [ ] Testes de acessibilidade automatizados (CI com axe-core ou pa11y)
- [ ] Métricas de performance no campo (Core Web Vitals via beacon ou GA4 web vitals)
- [ ] Teste de leitor de tela (NVDA + VoiceOver) nos fluxos críticos

**Status:** não iniciada.

---

## Itens reportados em uso (pós-MVP)

Coisas notadas durante uso real do site, com tratamento já decidido:

- **Comentários removidos.** ADR-0015 e ADR-0017 marcados DEPRECATED em 2026-05-10. Worker e D1 deployados podem ser deletados via dashboard.
- **Brand mark renovado** pra silhueta de garrafa long-neck paper-cut, alinhada com sistema de ilustrações ADR-0016.
- **Half-page-blank no mobile** mitigado com preconnects (Cloudflare, Google Maps, S3 das fotos) no `<head>`.

---

## Backlog

Itens sem prazo, candidatos a fases futuras:

- Documentar tokens e componentes em `docs/design-system/` (dívida da Fase 2/3)
- Modo escuro
- Internacionalização
- PWA / instalação no celular
- Lista de favoritos local (localStorage, sem login)
- Comparador de butecos
- Página `/butecos/` consolidada (todos butecos do Brasil, não só por cidade)

---

## Marcos (milestones)

| Marco                                  | Critério de saída                                    | Status |
|----------------------------------------|------------------------------------------------------|--------|
| M0 — Fundação aprovada                 | ADRs 0001-0004 ACCEPTED                              | feito |
| M1 — Diagnóstico publicado             | Documento com 5+ evidências por categoria            | pendente |
| M2 — Tokens prontos                    | CSS vars publicadas em `src/styles/tokens.css`       | feito |
| M3 — DS v0.1                           | 8+ componentes documentados e implementados          | implementados; doc em dívida |
| M4 — Beta navegável                    | 4+ telas-chave acessíveis em produção                | feito (5 telas) |
| M5 — Lighthouse ≥ 95 (a11y, perf, SEO) | Métricas validadas em produção                       | pendente |
