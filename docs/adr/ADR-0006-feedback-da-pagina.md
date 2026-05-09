# ADR-0006 — Botão de feedback "esta info está correta?" (proposta)

- **Status:** PROPOSED ⚠️ aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0002 (performance), RNF-0005 (privacidade)

## Contexto

Os dados dos butecos vêm de crawl do site oficial e podem estar desatualizados (endereço mudou, prato trocado, etc.). Queremos que o usuário sinalize "esta info está correta?" com **2 cliques** — útil porque é o tipo de erro que o owner do redesign não consegue ver sem alguém apontar.

Restrições duras:
- Site é estático em GitHub Pages (ADR-0003) — sem backend.
- Privacidade-first: sem Google/Disqus/etc tracking (RNF-0005).
- Lighthouse a11y/perf não pode degradar (RNF-0001/0002).
- Conteúdo do feedback geralmente curto: "endereço errado", "buteco fechou", "prato mudou", livre.

## Decisão (proposta)

**Recomendação principal: feedback como `<form>` HTML que envia para um Cloudflare Worker simples, que cria um Issue no próprio repositório do redesign.**

Concretamente:

1. **UI** (cliente):
   - No detalhe do buteco, footer com 2 botões: **"Sim, está correto"** e **"Tem algo errado"**.
   - "Sim" registra evento (1 POST silencioso) e mostra "Obrigado" — não pede mais nada.
   - "Tem algo errado" expande textarea com placeholder "O que está errado? (opcional)" + Enviar.
   - Sem JS = `<form action="..." method="POST">` continua funcionando (o Worker aceita form-encoded).
2. **Backend** (Cloudflare Worker — fora do GH Pages):
   - Recebe POST, valida origem + rate-limita (1 req/min por IP), formata e abre Issue via GitHub API com PAT escopado a `issues:write` no repo.
   - Issues geram template: `[feedback] <slug-do-buteco>: <resumo>`, body com URL, user agent (sem PII), texto do usuário, timestamp.
   - Labels automáticos: `feedback`, `cidade:<slug>`.
3. **Privacidade**:
   - Sem cookies, sem analytics, sem cabeçalho de tracking.
   - Worker NÃO armazena IP do usuário; só usa em memória para rate-limit.
   - Conteúdo do feedback aparece publicamente como Issue (avisar no formulário).
4. **Segurança**:
   - Token GitHub fica como secret no Worker (nunca no GH Pages).
   - Rate-limit + honeypot anti-bot.
   - CSP do site lista o domínio do Worker em `connect-src`.

## Alternativas consideradas

### Alternativa A — Cloudflare Worker → GitHub Issues (proposta principal)
- **Prós:**
  - 100% free dentro do free tier do CF (100k req/day).
  - Issues ficam no repo, grátis, com triagem natural.
  - Sem terceiros adicionais — só CF Workers + GitHub.
  - Dá para automatizar (GitHub Actions resolve issues que viram PRs etc).
- **Contras:**
  - Precisa criar conta CF, deployar Worker (script ~50 linhas).
  - Token GitHub precisa ser administrado.
- **Por que sim:** controle máximo, custo zero, fica todo o histórico no projeto.

### Alternativa B — Tally Forms
- **Prós:** zero código no backend; UI bonita; integra com Notion/Sheets/Slack/email.
- **Contras:** dados ficam num provedor terceiro; menos controle; embed adiciona JS deles.
- **Por que não como primeira:** custo do "embed externo" no caminho crítico + dado em terceiro privado.

### Alternativa C — Formspree
- **Prós:** dead simple, `<form action="https://formspree.io/...">`.
- **Contras:** free tier 50/mês (rápido para 1.000+ páginas com tráfego).
- **Por que não:** quota baixa demais.

### Alternativa D — Web3Forms
- **Prós:** free e ilimitado; só uma access-key no `<form>`.
- **Contras:** dados vão direto para o e-mail informado; sem painel; risco de spam.
- **Por que não:** workflow ruim para triagem.

### Alternativa E — Google Forms embed
- **Prós:** grátis, planilha pronta, bem conhecido.
- **Contras:** Google rastreia visitantes (cookies) → fere RNF-0005; estética não casa com nosso DS.
- **Por que não:** privacidade.

### Alternativa F — Apenas mailto:
- **Prós:** zero infraestrutura.
- **Contras:** abre cliente de e-mail, atrito alto, baixa conversão.
- **Por que não:** queremos UX em 2 cliques.

### Alternativa G — Não fazer
- **Prós:** simplicidade.
- **Contras:** não aprendemos com erros nos dados.

## Consequências

### Positivas
- Histórico permanente de feedback no GitHub.
- Sem cookies, sem tracking, alinhado com nosso "redesign não oficial".
- Custo zero.

### Custos aceitos
- Pequeno setup operacional (CF Worker + token GitHub).
- Deploy do Worker é separado do GH Pages (mais um lugar para olhar).
- Sem moderação — qualquer um pode enviar feedback público; mitigado por rate-limit + revisão humana.

### Neutras
- Migrar de A → B no futuro é trivial: trocar `action` do `<form>`.

## Plano de implementação (após ACCEPTED)

- [ ] Criar repo/branch separado `cdb-feedback-worker/` ou `worker/` no mesmo repo.
- [ ] Worker em ~50 linhas (Workers + GitHub REST `POST /issues`).
- [ ] Setup token GitHub PAT escopado.
- [ ] Componente `<Feedback />` Astro com 2 botões + textarea progressivo.
- [ ] CSP atualizada para `connect-src` incluir o domínio do Worker.
- [ ] Página privacidade explicando o que o feedback envia.
- [ ] Documentar workflow de triagem (label → close → quem responde).

## Como reverter

Trocar `action` do form para `mailto:` ou outro provedor. Worker é opcional para a UX; sem Worker, mostramos o link de e-mail.

## Referências

- Cloudflare Workers free tier — https://developers.cloudflare.com/workers/platform/limits/
- GitHub REST POST issue — https://docs.github.com/rest/issues/issues#create-an-issue
- Tally — https://tally.so/
- Formspree — https://formspree.io/
- Web3Forms — https://web3forms.com/
