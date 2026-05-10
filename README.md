# Comida di Buteco — Better UX

> Redesign exploratório, **NÃO oficial**, sem vínculo com a organização do concurso Comida di Buteco. Site oficial: https://comidadibuteco.com.br/.
>
> Case study de UI/UX com foco em **mobile first**, **acessibilidade WCAG 2.2 AA** e um design system inspirado no [GOV.UK Design System](https://design-system.service.gov.uk/) com identidade brasileira.

**Demo no ar:** https://phbruce.github.io/comida-di-buteco-better-ux/

---

## O que existe hoje

Astro 5 estático servido via GitHub Pages. ~1.052 páginas pré-renderizadas a partir de dados públicos do site oficial (crawl polite, fotos hotlinkadas com atribuição visível e link de volta).

### Funcionalidades

- **Home** com 62 cidades participantes da edição 2026 (987 butecos no total).
- **Listagem por cidade** com busca tipo combobox autocomplete (ARIA pattern), filtro por bairro e paginação.
- **Detalhe do buteco**: hero com foto + crédito do fotógrafo, prato + descrição, endereço, Google Maps Embed lazy-loaded (clique-pra-mostrar com aviso de cookies), link telefone + WhatsApp, CTA "Como votar" apontando pro site oficial.
- **`/concurso/`** — mecânica, critérios de avaliação, calendário e regras 2026, extraído do oficial.
- **`/sobre/`** — sobre o redesign, stack, acessibilidade, privacidade, marca e direitos.
- **Feedback "Tem algo errado?"** em cada detalhe — Web3Forms + Cloudflare Turnstile, sem cadastro.
- **Sistema de ilustrações** paper-cut sharp com 14 motivos vegetais/buteco (pimenta, folha, milho, cebola, tomate, garrafa, limão, pão de queijo, alho, abacaxi, mandioca, coxinha, caipirinha, espetinho) — aplicados em hero, footer band, empty states, cards sem foto, headers de seção.

### Stack

- **Astro 5** estático, TypeScript
- **CSS nativo** com Custom Properties (zero framework de utility, zero CSS-in-JS)
- **Inter Variable** auto-hospedada via `@fontsource-variable/inter` (sem Google Fonts)
- **Google Maps Embed API** (lazy + opt-in)
- **Web3Forms** (transporte do feedback por email)
- **Cloudflare Turnstile** (anti-bot do feedback, modo invisível)

---

## Princípios não-negociáveis

1. Mobile first (design e implementação começam em 320px).
2. Acessibilidade WCAG 2.2 AA mínimo.
3. Inspiração GOV.UK Design System — sharp, alto contraste, foco amarelo `#ffdd00`.
4. Toda decisão arquitetural vira ADR. ADR em PROPOSED **não** vai pra código sem aprovação humana explícita.
5. Documentação em pt-BR; código e tokens em inglês.
6. Proibido emojis em qualquer parte do site renderizado ao usuário (componentes em `src/`, páginas, body de e-mails). Use SVG inline com `aria-hidden`.

---

## Estrutura

```
.
├── README.md                  # Você está aqui
├── CONTRIBUTING.md            # Fluxo de ADR + como contribuir
├── ROADMAP.md                 # Fases e marcos
├── CLAUDE.md                  # Briefing para sessões de IA
├── docs/
│   ├── CONTEXTO.md            # Briefing de produto
│   ├── GLOSSARIO.md           # Termos do domínio
│   ├── requisitos/
│   │   ├── funcionais/        # RF-0001 a RF-0005
│   │   └── nao-funcionais/    # RNF-0001 a RNF-0005
│   ├── adr/                   # 17 ADRs (índice em docs/adr/README.md)
│   ├── design-system/
│   └── pesquisa/
├── .claude/
│   ├── settings.json          # Hooks + permissões
│   ├── hooks/                 # SessionStart, etc.
│   └── skills/                # Skills do projeto
├── scripts/                   # Utilitários (indexação de docs)
├── src/
│   ├── assets/illustrations/  # 14 motivos paper-cut SVG
│   ├── components/
│   │   ├── site/              # Header, Footer, ButecoCard, ButecoListItem, Map, Feedback
│   │   └── ui/                # Button, Breadcrumb, Input, Illustration, IllustrationBand, etc.
│   ├── data/                  # 987 butecos + geocodes (estáticos, sem rede em runtime)
│   ├── layouts/               # BaseLayout
│   ├── pages/                 # index, sobre, concurso, butecos/[cidade]/[slug]
│   └── styles/                # tokens.css + global.css + base.css
└── worker/                    # Cloudflare Workers (feedback ativo; comments DEPRECATED em ADR-0015)
```

---

## Fluxo de decisão

```
Ideia/Problema → RF/RNF → ADR (PROPOSED) → Aprovação dono → ACCEPTED → Implementação
```

ADRs em **DEPRECATED**, **REJECTED** ou **SUPERSEDED** continuam no repo como histórico — ver `docs/adr/README.md` pro índice completo.

---

## Como rodar local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ com ~1.052 HTMLs
npm run check    # astro check (type-check + diagnostic)
```

### Deploy

GitHub Pages dispara via `.github/workflows/deploy.yml` em push pra `main` ou `claude/design-system-setup-6xB7T`.

**Secrets opcionais** (sem eles, o build cai em fallback degradado):

| Secret no GH | Para que serve | Sem ele |
|---|---|---|
| `FOOGLE_MAPS_SECRET` | Google Maps Embed API key | mapa abre sem chave (`?output=embed`), perde interação no mobile |
| `FEEDBACK_W3F_KEY` | Web3Forms access key | Feedback abre issue no GitHub (exige conta) |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | Feedback usa só defesas client-side (honeypot, rate limit, time-check) |

---

## Status

**Fase 0 — Fundação documental + design system base:** concluída.

Implementado além da fase 0: listagem com busca + filtros, detalhe com mapa + feedback, página `/concurso/`, sistema de ilustrações paper-cut, branding atualizado pra garrafa long-neck.

Próximos passos em `ROADMAP.md`.

---

## Contribuir

- **Erro de dado** (endereço errado, prato fora de carta, buteco fechou) → botão "Tem algo errado" em qualquer detalhe.
- **Sugestão / bug do site** → abrir issue ou discussion no GitHub.
- **PR de código** → veja `CONTRIBUTING.md` pro fluxo de ADR.

---

## Marca e direitos

"Comida di Buteco" é marca registrada da organização que promove o concurso. Este redesign não reivindica direitos sobre marca, logo ou identidade visual oficial. Conteúdo coletado dos butecos (nome, prato, foto) pertence aos respectivos titulares e aparece aqui exclusivamente a título informativo, com link de volta ao oficial.

Pedido de remoção é atendido na hora — abra issue ou use o botão de feedback.

Código deste repositório sob **licença MIT** (cobre só código; não cobre marca, logos nem conteúdo coletado).
