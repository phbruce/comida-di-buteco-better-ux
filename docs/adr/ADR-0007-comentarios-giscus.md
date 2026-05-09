# ADR-0007 — Comentários nas páginas via giscus

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (delegado ao agente em 2026-05-09 — "pode escolher o mais legalzinho")
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0002 (performance), RNF-0005 (privacidade)

## Contexto

Após o feedback estruturado (ADR-0006: "esta info está correta?"), faz sentido ter um espaço de **conversa aberta** por página — usuário compartilhando experiência sobre o buteco, dúvidas, etc.

Restrições:
- Site estático em GH Pages (sem backend) — ADR-0003.
- Privacidade: zero rastreamento de terceiros antes de consentimento — RNF-0005.
- Performance: comentários não podem ferir LCP — RNF-0002.

## Decisão

**Adotamos giscus** (https://giscus.app) — provedor de comentários que usa **GitHub Discussions** como banco. Cada página vira uma discussion threaded.

Concretamente:
- Repositório: `phbruce/comida-di-buteco-better-ux`.
- Categoria: `General` (ou criar `Comentários` dedicada).
- Mapping: `pathname` (cada URL = thread única).
- Reações habilitadas.
- Tema: custom CSS hospedado em `/giscus-theme.css`, derivado dos tokens.
- Carregamento: lazy via IntersectionObserver, abaixo da seção de feedback no detalhe.
- Apenas em **páginas de detalhe do buteco** (não home, não listagens).

Pré-requisitos operacionais (você no GitHub mobile, 1 minuto):
1. **Habilitar Discussions** no repo: `https://github.com/phbruce/comida-di-buteco-better-ux/settings` → role até **Features** → marque **Discussions** ✓.
2. **Instalar o app giscus**: `https://github.com/apps/giscus` → "Install" → escolher **only this repository**.
3. (Opcional, melhora performance) Pegar IDs de repo/categoria em **`https://giscus.app/pt`** (preencher repo + categoria, copiar `data-repo-id` e `data-category-id`) e passar para o componente. Sem isso, o giscus funciona mas faz uma busca extra por nome a cada page-load.

Sem (1) e (2), o componente mostra placeholder "Carregando comentários…" + link para abrir Discussion direta no GitHub.

## Alternativas consideradas

### Alternativa A — giscus (escolhida)
- **Prós:**
  - 100% open source, free, sem servidor próprio.
  - Comentários ficam no GitHub (mesma "casa" do feedback ADR-0006 e do código).
  - Reações + threads + edição.
  - Sem cookies de tracking.
  - Tema customizável via CSS própria.
- **Contras:**
  - Comentarista precisa ter conta GitHub.
  - Bundle ~30KB JS.

### Alternativa B — Cusdis
- **Prós:** anônimo, leve (~5KB), free hosted.
- **Contras:** dados num provedor terceiro; menos integrado com nosso fluxo.
- **Por que não:** "mais legalzinho" no contexto técnico do projeto = giscus, com benefício extra de centralizar tudo no GitHub.

### Alternativa C — Disqus
- **Contras:** cookies de tracking, JS pesado, ads no free tier, privacy hostile.
- **Por que não:** fere RNF-0005 e a estética do projeto.

### Alternativa D — Sem comentários
- **Prós:** simplicidade.
- **Contras:** perde conversa orgânica que poderia gerar correções/anedotas.

## Consequências

### Positivas
- Comunidade técnica + brasileira do GitHub pode comentar.
- Tudo num lugar só (Issues + Discussions + Pages).

### Custos aceitos
- Audiência precisa GitHub account → barreira para visitante casual.
- Bundle JS adiciona ~30KB; mitigado por lazy-load.

### Neutras
- Trocar para outro provedor depois é trocar um componente.

## Plano de implementação (após este ADR)

- [ ] `src/components/site/Comments.astro` com lazy-load via IntersectionObserver e tema custom.
- [ ] `public/giscus-theme.css` derivado dos tokens.
- [ ] Adicionar abaixo do `<Feedback>` no detalhe.
- [ ] Documentar pré-requisitos (Discussions on + app instalado) no README.

## Como reverter

Remover o componente. Discussions criadas continuam existindo no GitHub.

## Referências

- giscus — https://giscus.app/
- Tema custom — https://github.com/giscus/giscus/blob/main/styles/themes/_base.scss
