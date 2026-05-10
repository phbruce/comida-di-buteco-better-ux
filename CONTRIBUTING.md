# Como Contribuir

> Este projeto trata documentação como código. Toda mudança significativa começa numa **decisão escrita** (ADR), não num PR.

## Princípios não-negociáveis

1. **Decisão antes de código.** Nada vai pra `src/` sem um ADR `ACCEPTED`.
2. **Rastreabilidade.** Todo ADR cita os RFs e RNFs que motiva ou impacta.
3. **Reversibilidade.** Decisões podem ser supersedidas, depreciadas ou rejeitadas — nunca apagadas.
4. **Mobile first.** Toda solução é desenhada e implementada começando em 320px.
5. **Acessibilidade não negociável.** WCAG 2.2 AA mínimo (RNF-0001).
6. **Sem emojis no produto.** Proibido em qualquer parte renderizada ao usuário (`src/`, páginas, body de e-mails). Use SVG inline `aria-hidden`. Em docs internas (`docs/`) é tolerado, mas evite por consistência.
7. **pt-BR pra conteúdo, inglês pra código e tokens.**

---

## Fluxo de uma nova decisão

### 1. Identifique a necessidade
Surgiu de um problema real, de uma pesquisa, de um RF novo? Anote a origem.

### 2. Escreva o(s) requisito(s)
- Capacidade do sistema → novo arquivo em `docs/requisitos/funcionais/RF-XXXX-<slug>.md`
- Atributo de qualidade → novo arquivo em `docs/requisitos/nao-funcionais/RNF-XXXX-<slug>.md`

Use os templates `_template.md` em cada pasta. Numeração é sequencial e nunca reaproveitada.

### 3. Escreva o ADR
- Copie `docs/adr/_template.md` pra `docs/adr/ADR-XXXX-<slug>.md`.
- Inclua **alternativas consideradas** com prós, contras e "por que não".
- Marque o status como `PROPOSED`.

### 4. Submeta pra aprovação
**ADRs em PROPOSED só podem ser promovidos a ACCEPTED pelo dono do produto.**

- Em PRs, peça revisão explícita.
- Em sessões de IA, **nunca implemente código baseado em ADR PROPOSED** — pause e aguarde aprovação. O hook `guard-adr` já bloqueia automaticamente em alguns fluxos.

### 5. Implemente
Depois de `ACCEPTED`:
- Toda PR de implementação referencia o(s) ADR(s) no corpo: `Implementa ADR-0007`.
- Mudanças no design system geram entradas em `docs/design-system/CHANGELOG.md` (quando existir).
- Atualize o `ROADMAP.md` se for marco relevante.

---

## Estados de um ADR

| Status        | Significado |
|---------------|-------------|
| `PROPOSED`    | Em discussão. **Não implementar.** Hook bloqueia automaticamente. |
| `ACCEPTED`    | Aprovado. Pode-se implementar. |
| `DEPRECATED`  | Decisão revertida. Código pode ainda existir mas não é mais consumido (ex: ADR-0015 e ADR-0017). |
| `SUPERSEDED`  | Substituído por outro ADR — sempre referencie o novo (ex: ADR-0005 → ADR-0009). |
| `REJECTED`    | Recusado na avaliação. Mantido como histórico de "o que não fizemos e por quê" (ex: ADR-0011, ADR-0014). |

---

## Convenções de arquivo

- Slug em kebab-case: `ADR-0017-rating-com-pergunta-de-visita.md`.
- Numeração sempre com 4 dígitos: `RF-0001`, não `RF-1`. Sequencial, nunca reaproveitada.
- Datas no padrão ISO: `2026-05-10`.
- Idioma: pt-BR pro conteúdo; inglês pros nomes de tokens e código.

---

## Convenções de commit

```
docs(adr): adiciona ADR-0007 paleta de cores
docs(rnf): atualiza RNF-0002 metas de performance
feat(ds): implementa Button conforme ADR-0010
fix(a11y): contraste do botão secundário
fix(comments): timeout de 30s no submit
ci: ajustar nome do secret do Google Maps
```

Tipos: `docs`, `feat`, `fix`, `chore`, `refactor`, `test`, `style`, `ci`.
Escopos sugeridos: `adr`, `rf`, `rnf`, `ds` (design system), `a11y`, `infra`, `hooks`, `skills`, `comments`, `feedback`, `map`, `illustrations`, `ci`.

Mensagens em pt-BR. Body do commit explica **por que** mudou (não só "o que"); o diff já mostra o quê.

---

## Skills do projeto (sessões de IA)

Use essas skills pra acelerar contribuições:

- `cdb-onboarding` — primeiro contato com o projeto (status, ADRs ativos, decisões importantes).
- `cdb-indexer` — "onde está X?", reindexação da base documental.
- `cdb-design-system` — consulta rápida a tokens e componentes.
- `cdb-decision-log` — guia de criação de ADRs (template + dicas).

---

## Como rodar local

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type check + diagnostics (astro check)
npm run build    # gera dist/
```

### Deploy

GitHub Pages dispara via `.github/workflows/deploy.yml` em push pra `main` ou pra branch de feature ativa.

Secrets opcionais (build cai em fallback se ausentes):

- `FOOGLE_MAPS_SECRET` — Google Maps Embed API key (ADR-0010).
- `FEEDBACK_W3F_KEY` — Web3Forms access key (ADR-0012).
- `TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (ADR-0013).

---

## Checklist antes de abrir PR

- [ ] Há um ADR `ACCEPTED` cobrindo a mudança? (ou é uma melhoria de UI/conteúdo que não exige ADR — explicite)
- [ ] Os RFs/RNFs impactados foram atualizados?
- [ ] O `ROADMAP.md` reflete o avanço?
- [ ] Acessibilidade verificada (axe / Lighthouse a11y ≥ 95)?
- [ ] Mobile testado em 320px, 375px, 768px, 1024px, 1440px?
- [ ] Sem emojis no que vai pro produto?
- [ ] `npm run check` e `npm run build` passam?
- [ ] Commits seguem a convenção?
