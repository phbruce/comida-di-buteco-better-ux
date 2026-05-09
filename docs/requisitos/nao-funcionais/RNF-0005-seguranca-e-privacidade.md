# RNF-0005 — Segurança e privacidade

- **Status:** Em rascunho
- **Categoria:** Segurança / Compliance
- **Criado em:** 2026-05-09
- **RFs relacionados:** RF-0005

## Atributo de qualidade

O site protege dados dos visitantes e cumpre LGPD.

## Métricas / requisitos

| Item                                                   | Alvo / Estado |
|--------------------------------------------------------|----------------|
| HTTPS only                                             | 100% das rotas; HSTS habilitado |
| CSP (Content Security Policy)                          | Definida; sem `unsafe-inline` quando possível |
| Headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Configurados |
| Cookies                                                | `Secure`, `HttpOnly`, `SameSite=Lax` por padrão |
| LGPD                                                   | Aviso de cookies somente quando houver tracking; política de privacidade vinculada |
| Dependências                                           | Auditoria semanal (`npm audit` / Dependabot) |
| Formulários                                            | Proteção contra CSRF; rate-limit em ações sensíveis |
| PII                                                    | Mínimo necessário; nunca em logs |
| **Proteção anti-bot / anti-fraude**                    | **WAF + bot challenge (ex.: Cloudflare Turnstile, hCaptcha invisível) na votação e em endpoints públicos sensíveis. Manter o site público acessível a leitores de tela e crawlers legítimos (Googlebot, etc.).** |
| Rate limiting                                          | Por IP e por sessão em endpoints de voto e busca |
| Honeypot em formulários                                | Campo oculto que, se preenchido, descarta envio |

## Cenários

### Cenário 1 — voto com dados pessoais
- **Estímulo:** votante envia formulário com nome/e-mail/CPF (a confirmar pelo regulamento).
- **Resposta:** transmissão por HTTPS; dados não persistidos no client; aviso de uso de dados visível antes do envio.

### Cenário 2 — análise sem cookies de terceiros
- **Estímulo:** página inicial.
- **Resposta:** sem cookies de terceiros antes de consentimento explícito.

### Cenário 3 — bot tentando fraudar votação
- **Estímulo:** automação tenta votar em massa.
- **Resposta:** WAF + Turnstile/captcha invisível detectam e bloqueiam; usuário humano genuíno passa sem fricção visível na maioria dos casos.

### Cenário 4 — usuário com leitor de tela
- **Estímulo:** humano legítimo usando NVDA/VoiceOver acessa qualquer página pública.
- **Resposta:** challenge não dispara em fluxo de leitura; se disparar em ação sensível, há alternativa acessível (RNF-0001).

> **Achado da pesquisa inicial (2026-05-09):** o site atual **já usa Cloudflare** com `cf-mitigated: challenge` em algumas rotas (`/`). É um sinal de que proteção anti-bot já é considerada importante — manteremos e aprimoraremos no redesign. Detalhes em `docs/pesquisa/diagnostico-site-atual.md`.

## Estratégias

- Server-side render do conteúdo público (sem JS necessário para ler).
- Bibliotecas de telemetria privadas-por-padrão (avaliar Plausible, Umami).
- Revisão de dependências em CI.

## Como validar

- `securityheaders.com`, `observatory.mozilla.org`, `mozilla/observatory-cli` em CI.
- Teste de CSP em staging.
