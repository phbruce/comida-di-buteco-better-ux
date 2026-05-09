# ADR-0003 — Stack tecnológico do redesign

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 com **restrição: deve funcionar em GitHub Pages**)
- **RFs/RNFs relacionados:** RF-0001, RNF-0002 (performance), RNF-0003 (mobile-first), RNF-0004 (SEO), RNF-0001 (a11y)

> **Restrição imposta na aprovação:** _"Pode mas só se funcionar no gh pages"_.
> Esta restrição transforma a stack em **SSG puro** (Static Site Generation) — sem SSR em runtime. WordPress, se usado, é consumido **em tempo de build** ou via JSON estático. Hospedagem é **GitHub Pages** com GitHub Actions; Cloudflare em frente é **opcional** (já há CDN do GH).

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
- **Framework:** **Astro** em **modo `output: 'static'`** (SSG puro — compatível com GitHub Pages).
- **Estilo:** **CSS nativo + Custom Properties** (variáveis CSS) para tokens; sem Tailwind nem Sass nesta v1.
- **Componentes interativos pontuais:** ilhas Astro com pequenos scripts vanilla — sem React/Vue como base.
- **Hospedagem:** **GitHub Pages** (branch `gh-pages` ou ação oficial `actions/deploy-pages`).
- **Domínio/base path:** o site provavelmente publicará em `https://<owner>.github.io/<repo>/` num primeiro momento — Astro usa `base` no `astro.config.mjs` para gerar URLs relativas corretas. Quando houver custom domain, basta remover o `base`.
- **Build/CI:** GitHub Actions:
  - PR: `npm ci`, `astro check` (typecheck), `astro build`, Lighthouse CI, `axe` HTML.
  - `main`: build + deploy via `actions/deploy-pages`.
- **Fonte de dados:**
  - Conteúdo do redesign: **arquivos Markdown/JSON em `src/content/`** (Content Collections do Astro).
  - Integração com WordPress (se necessária): **fetch em build time** do `wp-json` ou export estático para JSON commitado. **Sem chamadas runtime ao WP a partir do browser** (privacidade + estabilidade + cache).
- **Imagens:** otimização em build (`@astrojs/image` ou `astro:assets`) + AVIF/WebP + dimensões fixas (CLS).
- **Tipografia:** Inter auto-hospedada (RNF-0005, sem Google Fonts) — ver ADR-0004.
- **Telemetria:** `web-vitals` enviando para endpoint privacy-first (Plausible/Umami) — ADR próprio futuro.
- **Cloudflare:** **opcional**. Se mantido, fica como WAF/anti-bot no DNS apontando para o GH Pages. Não é dependência da stack.

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

## Plano de implementação

- [x] `package.json`, `astro.config.mjs` mínimos com `output: 'static'` e `base` correto para GH Pages.
- [x] Workflow `.github/workflows/deploy.yml` usando `actions/deploy-pages`.
- [ ] CI de PR: typecheck + Lighthouse + axe.
- [x] Stub de página de listagem com dados mockados.
- [ ] ADR de fonte de dados definitiva (WP REST em build vs. JSON commitado).

## Restrições do GitHub Pages (importantes para a equipe)

1. **Sem SSR em runtime.** Toda página é HTML pré-gerado. Decisões dinâmicas dependem de JS no browser ou de regenerar o site.
2. **Sem variáveis de ambiente em runtime.** Tudo que vai para o HTML precisa estar disponível em build.
3. **Pastas `_*` (com underscore).** GH Pages serve via Jekyll por padrão e ignora `_*`. Adicionamos `.nojekyll` na raiz do build para desativar isso (Astro coloca seu CSS em `_astro/`).
4. **Custom domain.** Quando houver, configurar `cname` no workflow e remover `base` do `astro.config.mjs`.
5. **Cache.** GH Pages tem cache curto (~10min). Para CWV em produção, considerar Cloudflare na frente.

## Como reverter

Astro é um gerador de HTML. Se quisermos pivotar, podemos exportar HTML estático e manter, ou migrar componentes para outro framework (eles são `.astro` simples, próximos de HTML).

## Referências

- Astro — https://astro.build/
- web.dev "Build a fast site" — https://web.dev/learn/performance/
