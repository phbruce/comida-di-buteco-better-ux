# ADR-0008 — Comentários via Cusdis (substitui giscus)

- **Status:** SUPERSEDED por [ADR-0015](./ADR-0015-comentarios-proprios.md) em 2026-05-09 (que por sua vez foi DEPRECATED em 2026-05-10 quando a feature de comentários foi removida do produto)
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 — opção A: Cusdis)
- **Supersede:** ADR-0007 (giscus)
- **Superseded por:** ADR-0015 (sistema próprio Worker + D1)
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0002 (performance), RNF-0005 (privacidade)

## Contexto

ADR-0007 adotou **giscus** (comentários via GitHub Discussions). Após instalar, percebemos que **giscus exige conta GitHub para comentar** — barreira inaceitável para o público alvo do site (visitantes não-técnicos: "tia da escola que quer falar do prato"). O dono do produto optou por trocar.

## Decisão

**Adotamos Cusdis** (https://cusdis.com) — sistema de comentários open source que:

- Permite comentar **sem cadastro** (basta um nome livre).
- Aceita opcionalmente **e-mail** (não verificado, não exibido) para receber aviso de resposta.
- Tem free tier hospedado (cusdis.com) ou self-hosted via Docker.
- Embed leve (~5KB) carregado de forma assíncrona.
- Sem cookies de tracking, sem ads, open source (Apache 2.0).
- Suporta CSS overrides para alinhar com nosso DS.

## Pré-requisitos operacionais (uma vez só, ~5 min)

1. Criar conta grátis em **https://cusdis.com** (sem cartão).
2. Criar projeto. Cusdis devolve um `APP_ID` (UUID).
3. Definir env de build:
   ```yaml
   # .github/workflows/deploy.yml passo "Build"
   env:
     PUBLIC_CUSDIS_APP_ID: <uuid-do-cusdis>
   ```

Sem `PUBLIC_CUSDIS_APP_ID` configurado, o componente mostra fallback informativo ("comentários ainda não configurados") — não quebra a página.

## Alternativas consideradas

### Alternativa A — Cusdis (escolhida)
- **Prós:** sem login para visitante; free; OSS; tema customizável.
- **Contras:** precisa criar conta no cusdis.com; free tier tem rate-limit moderado.

### Alternativa B — Disqus
- **Prós:** ampla adoção.
- **Contras:** privacy-hostile (cookies de tracking, ads no free), JS pesado.
- **Por que não:** fere RNF-0005.

### Alternativa C — giscus (anterior, ADR-0007)
- **Contras:** exige conta GitHub para comentar — barreira para público geral.
- **Por que não mais:** público alvo identificado como heterogêneo.

### Alternativa D — Self-hosted Cusdis em Vercel/Railway
- **Prós:** controle total dos dados, sem rate-limit.
- **Contras:** deploy adicional, mais coisa pra manter.
- **Quando considerar:** se cusdis.com tiver indisponibilidade incômoda.

### Alternativa E — Sem comentários
- **Prós:** zero infra, zero JS de terceiros.
- **Contras:** perde feedback orgânico que pode trazer correções.

## Consequências

### Positivas
- Visitante anônimo consegue comentar.
- Página continua leve (~5KB do embed).
- Tema custom respeita nosso DS (zero round, foco amarelo, urucum).

### Custos aceitos
- Conta cusdis.com extra para gerenciar.
- Free tier tem cap mensal de comentários (suficiente para baixo volume).
- Moderação: você recebe e-mail por novo comentário e aprova no painel cusdis.com.

### Neutras
- Trocar para self-hosted ou outro provedor é trocar a env.

## Plano de implementação

- [x] `src/components/site/Comments.astro` reescrito para Cusdis.
- [x] CSS overrides em `<style is:global>` mirando os tokens.
- [x] Fallback amigável quando `PUBLIC_CUSDIS_APP_ID` não está setado.
- [x] giscus removido (ADR-0007 SUPERSEDED).
- [ ] Você criar conta cusdis.com + definir env (5 min).

## Como reverter

Trocar `PUBLIC_CUSDIS_APP_ID` por outra config se mudar de provedor. O componente é único arquivo.

## Referências

- Cusdis — https://cusdis.com/
- GitHub do Cusdis — https://github.com/djyde/cusdis
- ADR-0007 (SUPERSEDED) — `./ADR-0007-comentarios-giscus.md`
