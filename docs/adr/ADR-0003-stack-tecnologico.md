# ADR-0003 — Stack tecnológico do redesign (proposta)

- **Status:** PROPOSED ⚠️ aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **RFs/RNFs relacionados:** RF-0001, RNF-0002 (performance), RNF-0003 (mobile-first), RNF-0004 (SEO), RNF-0001 (a11y)

## Contexto

Para implementar o redesign respeitando os RNFs (LCP ≤ 2,5s em 4G, SEO ≥ 95, a11y ≥ 95), precisamos de um stack que:

- Gere HTML válido e renderizado no servidor (SSR/SSG) por padrão.
- Tenha **JS mínimo** no caminho crítico.
- Permita componentes reutilizáveis com tipagem.
- Tenha boa interoperabilidade com o WordPress atual (que pode permanecer como CMS-headless ou ser migrado depois).
- Tenha boa DX para a equipe e contribuidores eventuais.

O site atual é WordPress + Cloudflare. Há três caminhos macro:

## Decisão (proposta)

**Caminho recomendado: front-end novo desacoplado, com renderização estática/SSR; back-end pode permanecer WordPress como API headless num primeiro momento.**

Stack proposto:

- **Linguagem:** TypeScript.
- **Framework:** **Astro** (com "islands" pontuais quando precisar de interatividade).
- **Estilo:** **CSS nativo + Custom Properties** (variáveis CSS) para tokens; sem Tailwind nem Sass nesta v1 (decisão a refinar em ADR de tokens).
- **Componentes interativos pontuais:** Web Components (Lit) ou ilhas Astro com pequenos scripts vanilla — sem React/Vue como base.
- **Build/CI:** GitHub Actions, Lighthouse CI obrigatório no PR.
- **Hospedagem:** estático em CDN (Cloudflare Pages, Netlify ou similar) — **mantendo Cloudflare na frente** (RNF-0005, anti-bot).
- **Fonte de dados (provisório):** API REST do WordPress (`wp-json`) ou JSON gerado em build.
- **Imagens:** otimização em build (Astro `<Image>`) + AVIF/WebP + dimensões fixas (CLS).
- **Tipografia:** fonte livre auto-hospedada (decisão final em ADR-0004).
- **Telemetria:** `web-vitals` para CWV em campo; analytics privacy-first (Plausible/Umami, a confirmar em ADR próprio).

## Alternativas consideradas

### Alternativa A — Continuar 100% no WordPress, melhorar tema
- **Prós:** menor risco operacional; equipe atual provavelmente já sabe.
- **Contras:** difícil garantir performance no caminho crítico; jQuery legado; dependência de plugins; menos controle sobre HTML semântico.
- **Por que não como única opção:** podemos atingir os RNFs com mais previsibilidade desacoplando.

### Alternativa B — Next.js + React
- **Prós:** ecossistema vasto; ótimo para apps interativos; DX consolidada.
- **Contras:** payload de JS no caminho crítico mesmo com SSR; mais peso para um site essencialmente de **leitura**; complexidade alta para pouca interatividade real.
- **Por que não:** custo/benefício ruim para um site de listagem + voto.

### Alternativa C — Astro + ilhas (adotada nesta proposta)
- **Prós:** zero JS por padrão; SSG/SSR conforme necessário; suporta múltiplos UIs nas ilhas se necessário; ótimo para sites de conteúdo; performance "barata".
- **Contras:** ecossistema menor que Next/Nuxt; equipe pode precisar aprender.

### Alternativa D — Eleventy (11ty)
- **Prós:** SSG puríssimo, simples, rápido.
- **Contras:** ergonomia de componentes mais limitada; menos suporte a TS de primeira classe; ilhas precisam de wiring manual.
- **Por que não como primeira opção:** Astro entrega o mesmo com melhor DX para componentes.

### Alternativa E — Hugo
- **Prós:** ultra-rápido em build.
- **Contras:** Go templating menos amigável; componentização limitada; difícil reuso com TS.

## Consequências

### Positivas
- Performance "de graça" no caminho crítico.
- HTML limpo e semântico, ótimo para SEO e a11y.
- Possibilidade de migrar gradualmente, mantendo WP como CMS.
- Cache de CDN estável (assets imutáveis com hash).

### Custos aceitos
- Equipe aprende Astro (curto: poucos dias para nível produtivo).
- Integração inicial com WP via API REST/headless tem trabalho pontual.
- Alguns recursos do WP que dependem de plugins precisam re-implementação.

### Neutras
- Migração futura para outro CMS (Sanity, Strapi, custom) fica viável depois.

## Plano de implementação (após ACCEPTED)

- [ ] `package.json`, `astro.config.mjs` mínimos.
- [ ] CI: typecheck + Lighthouse + axe.
- [ ] Stub de página de listagem com dados mockados.
- [ ] ADR de fonte de dados (WP REST vs. build estático).

## Como reverter

Astro é um gerador de HTML. Se quisermos pivotar, podemos exportar HTML estático e manter, ou migrar componentes para outro framework (eles são `.astro` simples, próximos de HTML).

## Referências

- Astro — https://astro.build/
- web.dev "Build a fast site" — https://web.dev/learn/performance/
