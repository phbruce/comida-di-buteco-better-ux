# Roadmap

> Última atualização: 2026-05-10

**Status atual:** Fases 0 a 4 **concluídas**. Fase 5 (validação) com a parte automatizável **concluída** (Lighthouse CI, Pa11y CI, Web Vitals beacon); pendência humana — testes com 5 usuários e leitor de tela manual — em aberto.

5 telas no ar (`/`, `/butecos/<cidade>/`, `/butecos/<cidade>/<slug>/`, `/sobre/`, `/concurso/`), 17 ADRs registrados, 14 motivos paper-cut, Feedback ativo via Web3Forms + Turnstile.

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

- [x] Heurísticas de Nielsen aplicadas a cada fluxo principal
- [x] Auditoria de acessibilidade (estática, via inspeção do HTML — runtime fica como dívida da Fase 5)
- [x] Auditoria de performance (hipóteses informadas — runtime fica como dívida da Fase 5)
- [x] Mapa de fluxos: home → cidade → buteco → voto
- [x] Inventário de conteúdo

**Saída:** [`docs/pesquisa/diagnostico-site-atual.md`](./docs/pesquisa/diagnostico-site-atual.md) preenchido com 10 heurísticas, 11 itens de a11y estática, 6 hipóteses de performance, mapa de fluxos completo e tabela de oportunidades capturadas pelo redesign. **Concluída.**

**Status:** auditoria runtime (Lighthouse, axe, testes com usuários) movida pra Fase 5.

---

## Fase 2 — Design tokens e fundamentos

**Objetivo:** transformar o ADR-0004 em tokens utilizáveis.

Tokens já vivem em `src/styles/tokens.css` (CSS variables) e funcionam em produção. Documentação textual em `docs/design-system/tokens/` ainda como dívida.

- [x] Tokens em CSS variables (`src/styles/tokens.css`)
- [x] `docs/design-system/tokens/colors.md`
- [x] `docs/design-system/tokens/typography.md`
- [x] `docs/design-system/tokens/spacing.md`
- [x] `docs/design-system/tokens/radius.md`
- [x] `docs/design-system/grid.md`
- [x] `docs/design-system/breakpoints.md`

**Saída:** tokens documentados, em CSS e em texto. **Concluída.**

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

**Documentação textual dos componentes** (em `docs/design-system/componentes/`):
- [x] `button.md`, `input.md`, `tag.md`, `breadcrumb.md`, `pagination.md`
- [x] `skip-link.md`, `phase-banner.md`
- [x] `illustration.md`, `illustration-band.md`
- [ ] Componentes site-specific (Header, Footer, ButecoCard, ButecoListItem, Map, Feedback) — listados no `componentes/README.md`, sem página dedicada por enquanto.

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

### Automáveis (concluídas)

- [x] **Lighthouse CI** — `.github/workflows/lighthouse.yml` contra 4 URLs deployadas (home, `/concurso/`, `/sobre/`, `/butecos/belo-horizonte/`). Trigger: schedule diário 9 UTC + manual + pós-deploy. Relatório no artifact `lighthouse-results`.
- [x] **Pa11y CI** — `.github/workflows/a11y.yml` rodando WCAG2AA contra as mesmas 4 URLs. Trigger: schedule semanal segunda 9 UTC + manual + pós-deploy. Relatório JSON por URL no artifact `pa11y-results`. Não bloqueia merge por padrão (sinal, não gate).
- [x] **Web Vitals beacon client-side** — `src/components/site/WebVitalsBeacon.astro` injetado em todas as páginas via BaseLayout. Captura LCP, CLS, FCP, TTFB e INP via PerformanceObserver nativo (zero dependências). Por padrão emite em `console.log` com prefixo `[vitals]`. Configurar `PUBLIC_VITALS_ENDPOINT` no GH Secrets pra agregação real-user via `navigator.sendBeacon`.

### Pendência humana (não automatizável)

- [ ] **Testes de usabilidade moderados** — 5 usuários por cidade-alvo, executando 3 tarefas (encontrar buteco, entender votação, achar endereço). Exige pesquisa com pessoas reais.
- [ ] **Teste de leitor de tela** (NVDA + VoiceOver) nos fluxos críticos. Exige tester com leitor instalado (e ouvido humano).
- [ ] **Análise dos relatórios LH/Pa11y** — workflows estão coletando, mas alguém precisa ler os artifacts e criar issues pros achados que merecem fix.

**Status:** infraestrutura de validação automatizada **completa**. Loop com pessoas reais ainda em aberto.

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
