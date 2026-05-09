# Cloudflare Worker — feedback

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
