# Diagnóstico — site atual

> **Data da coleta:** 2026-05-09
> **URL:** https://comidadibuteco.com.br/butecos/belo-horizonte/
> **Forma:** `curl` com User-Agent de browser real + análise estática do HTML retornado.

Este é um **rascunho de Fase 1**. Será aprofundado com auditorias de Lighthouse, axe e testes manuais.

---

## Stack identificado (à primeira vista)

- **CDN/WAF:** Cloudflare (`server: cloudflare`, header `cf-ray`, `cf-mitigated: challenge` em algumas rotas).
- **CMS:** WordPress (presença de slugs típicos, plugin `pojo-a11y` na barra de acessibilidade).
- **Acessibilidade:** plugin **Pojo A11y Toolbar** já instalado (aumentar/diminuir texto, alto contraste, escala de cinza, fonte legível, links sublinhados, reset).
- **SEO:** `<title>` e Open Graph presentes para a listagem de cidade.

## O que funciona / aproveitar

- ✅ `<h1>` único na listagem ("Butecos Participantes").
- ✅ Formulário de busca com `role="search"`.
- ✅ Open Graph configurado.
- ✅ Cidade no path canônico (`/butecos/<cidade>/`) — **manteremos** essa convenção (RF-0004).
- ✅ Já existe preocupação com acessibilidade (toolbar pojo-a11y).
- ✅ Cloudflare na frente — preserva proteção anti-bot.

## Pontos de atenção iniciais

- ⚠️ **Cloudflare bot challenge bloqueia ferramentas legítimas** (WebFetch retornou 403 com `cf-mitigated: challenge` na home `/`). No redesign, calibrar regras para **não impactar leitores de tela, crawlers de busca e ferramentas de auditoria**. Ver RNF-0005.
- ⚠️ **H2 "222"** apareceu fora de contexto na listagem — possivelmente número de butecos exibido como heading. Heading não é o elemento certo para uma contagem; reservar `<h2>` para nomes de butecos. Ver RF-0001.
- ⚠️ **Plugin de acessibilidade externo** (Pojo A11y) é uma muleta histórica. O caminho moderno é construir o site **acessível por padrão**, sem depender de toolbar. Pode ser aposentada após Fase 4.
- ⚠️ **Tipografia e cores** ainda não auditadas (próximo passo: capturar via DevTools / screenshot).
- ⚠️ **Performance** ainda não medida (Lighthouse pendente).

## Próximas perguntas (a resolver antes de Fase 2)

1. Qual o tempo médio de LCP em mobile real? (medir com PageSpeed Insights / WebPageTest)
2. Existe API JSON pública? Páginas são SSR ou cliente?
3. Tamanho médio de payload de imagens dos cards.
4. Padrão de URL para detalhe do buteco.
5. Como funciona a votação atual (autenticação, fluxo, captcha)?
6. O regulamento da edição corrente está publicado e em qual URL?

## Plano de aprofundamento (próximas tarefas)

- [ ] Lighthouse mobile + desktop, salvo em `reports/lighthouse-<data>.json`.
- [ ] axe-core no HTML salvo, salvo em `reports/axe-<data>.json`.
- [ ] WebPageTest 4G mid-tier.
- [ ] Inventário de páginas e fluxos.
- [ ] Coleta de screenshots em 3 viewports (320, 768, 1440).

## Sumário executivo (por enquanto)

> O site atual é estruturalmente OK (WordPress + Cloudflare) e tem cuidados básicos de SEO e acessibilidade. As oportunidades de melhoria são mais de **densidade visual, hierarquia, performance e mobile-first** do que de infraestrutura. O redesign deve **aproveitar** o que existe (URL canônica, OG, WAF, intenção a11y) e **substituir** o que envelheceu (toolbar de acessibilidade externa, headings semanticamente errados, layout legado).
