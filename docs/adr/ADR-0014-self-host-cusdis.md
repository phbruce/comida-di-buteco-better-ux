# ADR-0014 — Self-host do Cusdis para controle total da UI

- **Status:** REJECTED em 2026-05-09
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (após apresentação honesta da
  complexidade real, escolheu construir solução própria — ADR-0015)
- **Motivo da rejeição:** auto-host do Cusdis envolve operar um Next.js +
  Postgres + email service, com 2-4h de setup e manutenção contínua
  para acompanhar releases upstream. A alternativa proposta (ADR-0015)
  reaproveita Cloudflare Worker + Turnstile já configurados e fica
  alinhada ao espírito de case study do projeto.

## Contexto

ADR-0008 escolheu Cusdis hospedado pra comentários. Após implementar e
inspecionar o código deles, descobrimos que **a versão hospedada do
Cusdis não suporta tema CSS customizado** — o `data-theme` aceita só
`light`/`dark`/`auto` (verificado em `iframe.umd.js`). O widget
renderiza dentro de um iframe servido por `cusdis.com`, então nosso
CSS não atravessa.

Resultado: o formulário interno (Nickname, Email, Reply, Submit)
fica com o look default deles, divergente do nosso design system.

O dono do produto escolheu **self-host do Cusdis** para retomar o
controle visual completo do componente. Esta proposta documenta
honestamente o trabalho envolvido para ele decidir se ainda vale a
pena.

## O que self-host significa, em detalhes

Cusdis é open source (Apache 2.0), construído em **Next.js + Prisma +
tRPC**. Para self-host você precisa:

1. **Banco de dados PostgreSQL** persistente — armazena projetos,
   threads, comentários. Opções de free tier: Neon, Supabase,
   Railway, Vercel Postgres. Todos com cap (~500MB) que cobre uso
   bem além do que esperamos aqui.
2. **Plataforma de deploy** Node.js — Vercel (free tier), Railway,
   Fly.io, Cloudflare Pages. Vercel é o caminho mais fácil porque
   Cusdis já tem template `Deploy on Vercel`.
3. **Provedor de email** para notificações de novo comentário e
   moderação — Resend (free tier 100/dia), SendGrid, Mailgun. Opcional
   se você não quiser email.
4. **Domínio próprio ou subdomínio** — pode usar o que a plataforma
   provê (ex.: `cdb-comments.vercel.app`).
5. **Variáveis de ambiente** configuradas: DATABASE_URL, NEXTAUTH_URL,
   NEXTAUTH_SECRET, ADMIN_EMAIL, etc.

Tempo realista: **2 a 4 horas** entre criar contas, deploy, configurar
DB, testar. Não 30 minutos.

Manutenção contínua:
- Atualizar quando Cusdis lançar novas versões (security patches,
  bug fixes).
- Monitorar quotas de free tier.
- Backup do banco (free tiers normalmente fazem snapshot automático,
  mas é responsabilidade sua).
- Email service pode ter mudanças/expiração de free tier.

## Decisão (proposta)

Aprovar self-host SE o dono confirmar que o trabalho descrito é
aceitável. Caso contrário, voltar atrás e considerar alternativas.

Quando aprovado:

1. **Eu** atualizo o `Comments.astro` para aceitar `PUBLIC_CUSDIS_HOST`
   apontando para a instância self-hosted (componente já lê essa env).
2. **Eu** crio um CSS customizado que se aplica DENTRO da nossa
   instância self-hosted (modificamos o repositório do Cusdis para
   aceitar tema URL ou injetamos CSS no Layout do Next.js dele).
3. **Você** segue os passos de deploy:
   - Cria conta Vercel grátis.
   - Cria projeto Postgres (Neon ou Vercel Postgres).
   - Faz fork do repositório `djyde/cusdis` e aplica nosso patch de
     custom theme.
   - Deploy via "Deploy with Vercel" do README do Cusdis.
   - Configura variáveis de ambiente.
   - Cria projeto admin no painel.
   - Pega o novo APP_ID e a URL do host.
4. **Você** atualiza GitHub Secrets:
   - `CUSDIS_APP_ID` (substitui o atual hospedado pelo novo do self-host)
   - `CUSDIS_HOST` (URL da instância self-hosted)
5. Eu atualizo o workflow para expor essas envs e conferir
   funcionamento.

## Alternativas que valem reconsiderar antes de embarcar

### A — Self-host Cusdis (a proposta)
- **Prós:** controle total da UI; mantém a feature anônima e o fluxo
  de moderação que já conhecemos.
- **Contras:** complexidade operacional (DB, plataforma, fork,
  manutenção); 2-4h de setup.

### B — Comentários próprios via Cloudflare Worker + D1
- **Prós:** alinhado com infra que já temos (Turnstile já em CF);
  controle 100% da UI e do schema; sem dependência de codebase
  externa; super alinhado com o "case study" do projeto.
- **Contras:** mais código original (~200 linhas de Worker + UI no
  componente); mais design (lista de comentários, paginação,
  threading se quiser).
- **Quando faz sentido:** se você curtiria um caminho mais "redesign
  exploratório no espírito original", e tem fôlego pra um pouquinho
  mais de código sob seu controle.

### C — Aceitar look padrão do Cusdis (estado atual)
- **Prós:** zero setup adicional; já funciona; comentários
  efetivamente aparecem no site.
- **Contras:** descontinuidade visual entre o redor (nosso DS) e o
  formulário (look Cusdis).

### D — Trocar para outro sistema com tema custom de verdade
- **giscus** suporta tema URL real, mas exige conta GitHub do
  comentarista — barreira inaceitável (ADR-0008 SUPERSEDED giscus
  por causa disso).
- **Hyvor Talk** é pago.
- **Remark42** é open source mais simples que Cusdis (binário Go),
  mas mesmas implicações de self-host.

## Decisão pendente do dono

Antes de implementar, confirme:

1. Você prefere mesmo **A (self-host Cusdis)** com 2-4h de setup
   operacional + manutenção contínua? OU
2. Reconsidera para **B (comentários próprios via Worker + D1)** que
   é mais código mas zero dependência externa? OU
3. **C (aceitar estado atual)** porque a inconsistência visual é
   aceitável dado o esforço?

## Plano de implementação (após ACCEPTED, opção A)

- [ ] Documentar os passos exatos de fork + deploy no
  `worker/cusdis-self-host.md`.
- [ ] Atualizar `Comments.astro` para usar `PUBLIC_CUSDIS_HOST` e
  `PUBLIC_CUSDIS_APP_ID` (já lê parcialmente).
- [ ] Após o seu deploy, eu aplico o patch CSS no fork e te oriento
  como aplicá-lo a cada update upstream.

## Como reverter

Apontar `PUBLIC_CUSDIS_HOST` de volta para `https://cusdis.com` e
usar o APP_ID antigo. A instância self-hosted pode ser desligada
sem afetar o site.

## Referências

- Cusdis open source — https colon slash slash github ponto com slash djyde slash cusdis
- Self-host docs — https colon slash slash cusdis ponto com slash doc slash self-host slash getting-started
- Cusdis Vercel template — README do repositório
