# Cloudflare Workers — feedback e comentários

Esta pasta contém DOIS workers independentes, cada um com seu wrangler config:

- `feedback.ts` + `wrangler.toml` — Worker do feedback (ADR-0006). NÃO é o
  caminho atual: hoje o feedback usa Web3Forms (ADR-0012). Mantido como
  alternativa.
- `comments.ts` + `wrangler.comments.toml` + `comments.sql` — Worker de
  comentários próprio (ADR-0015). É o caminho ATIVO. Setup descrito mais
  abaixo.

---

## Setup do worker de COMENTÁRIOS (ADR-0015)

Pré-requisitos: conta Cloudflare grátis (sem cartão), wrangler CLI
instalado (`npm install -g wrangler`), `wrangler login` feito.

Passos (executar do diretório `worker/`):

1. Criar o database D1:
   ```
   wrangler d1 create cdb-comments
   ```
   O comando devolve um `database_id`. Cole no campo `database_id` de
   `worker/wrangler.comments.toml` (substitui `REPLACE-ME-AFTER-CREATE`).

2. Aplicar o schema:
   ```
   wrangler d1 execute cdb-comments --file=worker/comments.sql --remote
   ```

3. Definir os secrets do worker:
   ```
   wrangler secret put TURNSTILE_SECRET --config worker/wrangler.comments.toml
   ```
   Cole a Secret Key do widget Turnstile (a mesma usada no feedback).

   ```
   wrangler secret put APP_SALT --config worker/wrangler.comments.toml
   ```
   Cole qualquer string aleatória longa (ex.: gerada por
   `openssl rand -base64 32`). É só pra hash do IP.

4. Deploy:
   ```
   wrangler deploy --config worker/wrangler.comments.toml
   ```
   Wrangler imprime o endpoint, algo como:
   `https://cdb-comments.<seu-subdomain>.workers.dev`

5. Conectar ao site: adicione GitHub Secret `COMMENTS_ENDPOINT` com
   esse URL em `Settings → Secrets and variables → Actions`. O
   workflow já está configurado para expor como
   `PUBLIC_COMMENTS_ENDPOINT` durante o build.

6. Faça qualquer commit (ou re-run da última action) para disparar
   deploy. O componente `Comments.astro` detecta a env e usa o novo
   sistema.

Sem o secret, o componente cai num estado "Comentários temporariamente
indisponíveis" — site não quebra.

### Moderação

Não há painel admin. Para listar/moderar comentários, use o D1 direto:

```
# Listar últimos 20
wrangler d1 execute cdb-comments --command="SELECT id, page_id, nickname, substr(message,1,80) FROM comments ORDER BY created_at DESC LIMIT 20" --remote

# Esconder um comentário
wrangler d1 execute cdb-comments --command="UPDATE comments SET status='hidden' WHERE id=42" --remote

# Apagar
wrangler d1 execute cdb-comments --command="DELETE FROM comments WHERE id=42" --remote
```

Pra um painel real, dá pra construir uma página `/admin/comments` no
futuro com auth básica — fica como TODO se a feature crescer.

### Custos

- D1 free: 5 GB storage, 5M reads/dia, 100k writes/dia. Cap.
- Workers free: 100k requests/dia.
- Total: R$ 0 para uso esperado.

---

## Setup do worker de FEEDBACK (legado, ADR-0006)

> Não é o caminho ativo. O feedback usa Web3Forms (ADR-0012). Mantido
> aqui como referência caso queira migrar pro Worker no futuro.

Implementa o backend do **ADR-0006**: recebe POST do `<Feedback>` no site e cria Issue no repositório.

## Deploy (5 minutos)

1. Tenha conta no Cloudflare (free) e instale o CLI:
   ```sh
   npm install -g wrangler
   wrangler login
   ```
2. Crie um **Personal Access Token (fine-grained)** no GitHub com permissão `Issues: Read and write` apenas neste repositório.
3. No diretório `worker/`:
   ```sh
   wrangler secret put GITHUB_TOKEN   # cole o PAT
   wrangler deploy
   ```
4. Wrangler imprime o endpoint, algo como:
   `https://cdb-feedback.<seu-subdomain>.workers.dev`

## Conectar ao site

Depois do deploy, edite o arquivo de variáveis de ambiente do site (em build):

```sh
# .env.production na raiz do projeto Astro
PUBLIC_FEEDBACK_ENDPOINT=https://cdb-feedback.<seu-subdomain>.workers.dev/api/feedback
```

Ou exporte no GitHub Actions:
```yaml
# .github/workflows/deploy.yml — passo "Build"
env:
  PUBLIC_FEEDBACK_ENDPOINT: https://cdb-feedback.<seu-subdomain>.workers.dev/api/feedback
```

Sem esse env, o componente `<Feedback>` mostra fallback `mailto:`.

## Rate limit (opcional)

Para rate-limit persistente entre isolates, crie um KV:

```sh
wrangler kv:namespace create RATE_LIMIT_KV
# adicione ao wrangler.toml:
# [[kv_namespaces]]
# binding = "RATE_LIMIT_KV"
# id = "<id-impresso-pelo-comando>"
```

## Custos

- Workers free tier: 100k requests/dia.
- KV free tier: 1k writes/dia (mais que suficiente para feedback).

## Testes locais

```sh
wrangler dev   # roda em http://localhost:8787
```

Use `curl`:
```sh
curl -X POST http://localhost:8787 \
  -F "pageId=alexandres-bar" \
  -F "pageTitle=Alexandre's Bar" \
  -F "pageUrl=https://phbruce.github.io/comida-di-buteco-better-ux/butecos/belo-horizonte/alexandres-bar/" \
  -F "rating=ok"
```

## O que vai pro Issue

- Título: `[feedback] <título da página>`
- Body: link para a página, ID, rating (✅/⚠️), mensagem, timestamp, UA.
- Labels: `feedback`, `cidade:<…>`, `feedback-ok` ou `feedback-corrigir`.
