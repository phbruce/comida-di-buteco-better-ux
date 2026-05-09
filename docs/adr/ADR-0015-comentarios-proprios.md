# ADR-0015 — Sistema de comentários próprio (Cloudflare Worker + D1)

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (delegado em 2026-05-09 — opção A:
  construir o nosso)
- **Supersede:** ADR-0008 (Cusdis hospedado), ADR-0014 (rejeitado)
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0002 (performance),
  RNF-0005 (privacidade)

## Contexto

Após investigar profundamente, ficou comprovado que o Cusdis hospedado
não suporta CSS custom (verificado em `iframe.umd.js` deles —
`data-theme` aceita só `light`/`dark`/`auto`). O dono optou por
construir uma solução própria, alinhada ao espírito de case study
exploratório e à infraestrutura Cloudflare que já temos por causa do
Turnstile e do Maps key.

## Decisão

**Comentários armazenados em Cloudflare D1 (SQLite no edge), expostos
via Cloudflare Worker, consumidos pelo componente `Comments.astro` com
nosso design system.**

### Escopo da v1

- Visitante anônimo. Apelido (1-50 chars) + mensagem (1-1000 chars).
  Nenhum email obrigatório.
- Lista de comentários por página, ordenados do mais recente ao mais
  antigo, paginada (50 por load, "carregar mais" se passar disso).
- Sem threading na v1. Sem reply-to-comment. Sem edição. Sem delete
  pelo visitante.
- Auto-aprovação: comentário aparece imediatamente. Moderação reativa
  via campo `status` no banco (`approved` default; admin pode marcar
  `hidden`/`spam` direto no painel D1 se preciso).
- Anti-spam em camadas:
  - Cloudflare Turnstile (já integrado no projeto, ADR-0013).
  - Honeypot oculto.
  - Rate limit no Worker: 1 comentário por minuto por IP.
  - Tamanhos máximos rígidos.

### Arquitetura

- **D1 database** (`cdb-comments`) com tabela `comments`:
  - `id INTEGER PK AUTOINCREMENT`
  - `page_id TEXT NOT NULL`
  - `page_url TEXT`, `page_title TEXT`
  - `nickname TEXT NOT NULL`, `message TEXT NOT NULL`
  - `created_at INTEGER NOT NULL` (ms timestamp)
  - `ip_hash TEXT` (sha256 do IP + salt; usado para rate limit, nunca
    exibido)
  - `status TEXT DEFAULT 'approved'`
  - Índice em `(page_id, status, created_at DESC)`

- **Cloudflare Worker** com 2 endpoints:
  - `GET /api/comments?pageId=X&limit=50&before=<id>` — lista
    aprovados, ordenado decrescente.
  - `POST /api/comments` — valida Turnstile via siteverify, valida
    inputs, checa rate limit, insere e devolve o comentário criado.
  - CORS restrito a `phbruce.github.io`.

- **Componente Astro** `Comments.astro` reescrito:
  - Carrega lazy via IntersectionObserver.
  - Renderiza lista de comentários no nosso DS (sem iframe).
  - Form integrado com Turnstile widget.
  - Estados: loading, vazio, erro, sucesso, rate-limited.

- **Sem email de notificação na v1** (cortamos pra simplificar). Para
  saber se há novos comentários, dono consulta o painel D1 ou roda
  `wrangler d1 execute` com query.

### Setup operacional do dono (uma vez, ~15-30 min)

1. `wrangler d1 create cdb-comments` (ou via painel CF) — devolve
   database_id.
2. Adicionar binding D1 ao `worker/wrangler.toml` (eu deixo pré-
   preenchido, só falta colar o id).
3. `wrangler d1 execute cdb-comments --file=worker/comments.sql`
   roda o schema.
4. Pegar Turnstile **Secret Key** (já tem o Site Key) e setar como
   secret do Worker: `wrangler secret put TURNSTILE_SECRET`.
5. `wrangler deploy worker/comments.ts`.
6. Wrangler imprime URL do worker. Cole como GitHub Secret
   `COMMENTS_ENDPOINT`. Eu já preparo o workflow.
7. Próximo deploy do Pages, o site passa a usar nosso sistema.

### Custos

- Workers free: 100k req/dia (cobre infinitamente o uso esperado).
- D1 free: 5GB armazenamento, 5M reads/dia, 100k writes/dia. Cap.
- Turnstile free.
- Total: **R$ 0**.

## Alternativas consideradas (registro)

- **Self-host Cusdis** (ADR-0014, REJECTED): mais complexo e mais
  amarrado a codebase de terceiro.
- **giscus** (ADR-0007, SUPERSEDED): exige conta GitHub do
  comentarista — barreira de público.
- **Cusdis hospedado** (ADR-0008): mantido como histórico, mas o que
  efetivamente roda agora é este ADR-0015 quando o dono fizer o setup.
- **Sem comentários:** mais simples, mas perde a feature.

## Consequências

### Positivas

- Look 100% nosso DS, sem iframe.
- Privacidade: dado fica no nosso D1, sem terceiros (exceto Turnstile,
  que é só validação anti-bot, não armazena conteúdo).
- Aproveita infra já existente.
- Material de case study sobre como construir features no Astro+CF.

### Custos aceitos

- Manutenção: somos donos do código. Bug = nossa responsabilidade.
- Sem features ricas (threading, reactions, edição) na v1. Podem
  vir depois se houver demanda.
- Sem moderação por email na v1. Acompanhar comentários requer
  consulta ao D1.

## Plano de implementação

- [x] Componente `Comments.astro` reescrito sem iframe.
- [x] `worker/comments.ts` com endpoints GET e POST.
- [x] `worker/comments.sql` com schema e índice.
- [x] `worker/wrangler.toml` atualizado com binding D1 e secret.
- [x] `.github/workflows/deploy.yml` lê `COMMENTS_ENDPOINT` do secret.
- [x] `/sobre/` atualizado com a nova realidade.
- [ ] Você executa o setup operacional descrito acima.

## Como reverter

Apontar `PUBLIC_COMMENTS_ENDPOINT` para vazio e o componente cai num
estado "comentários temporariamente indisponíveis". Worker e D1 podem
ser desligados pelo painel CF.

## Referências

- Cloudflare Workers — https colon slash slash workers ponto cloudflare ponto com
- Cloudflare D1 — https colon slash slash developers ponto cloudflare ponto com slash d1
- Turnstile siteverify — https colon slash slash developers ponto cloudflare ponto com slash turnstile slash get-started slash server-side-validation
