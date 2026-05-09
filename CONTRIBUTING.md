# Como Contribuir

> Este projeto trata documentação como código. Toda mudança significativa começa numa **decisão escrita**.

## Princípios

1. **Decisão antes de código.** Nada vai para `src/` sem um ADR aceito.
2. **Rastreabilidade.** Todo ADR cita os RFs e RNFs que motiva ou impacta.
3. **Reversibilidade.** Decisões podem ser supersedidas — nunca apagadas.
4. **Mobile first.** Toda solução é desenhada para 320px primeiro.
5. **Acessibilidade não negociável.** WCAG 2.2 AA mínimo (ver RNF-0001).

---

## Fluxo de uma nova decisão

### 1. Identifique a necessidade
Surgiu de um problema real, de uma pesquisa, de um RF novo? Anote a origem.

### 2. Escreva o(s) requisito(s)
- Se é capacidade do sistema → novo arquivo em `docs/requisitos/funcionais/RF-XXXX-<slug>.md`
- Se é atributo de qualidade → novo arquivo em `docs/requisitos/nao-funcionais/RNF-XXXX-<slug>.md`

Use os templates `_template.md` em cada pasta. Numeração é sequencial e nunca reaproveitada.

### 3. Escreva o ADR
- Copie `docs/adr/_template.md` para `docs/adr/ADR-XXXX-<slug>.md`.
- Inclua **alternativas consideradas** com prós e contras.
- Marque o status como `PROPOSED`.

### 4. Submeta para aprovação
**ADRs em PROPOSED só podem ser promovidos a ACCEPTED pelo dono do produto.**

Em PRs, peça revisão explícita. Em sessões de IA, **nunca implemente código baseado em ADR PROPOSED** — pause e aguarde aprovação.

### 5. Implemente
Após `ACCEPTED`:
- Toda PR de implementação deve referenciar o(s) ADR(s) no corpo: `Implementa ADR-0007`.
- Mudanças no design system geram entradas em `docs/design-system/CHANGELOG.md`.

---

## Estados de um ADR

| Status        | Significado |
|---------------|-------------|
| `PROPOSED`    | Em discussão. **Não implementar.** |
| `ACCEPTED`    | Aprovado. Pode-se implementar. |
| `DEPRECATED`  | Não recomendado, mas ainda em uso em código legado. |
| `SUPERSEDED`  | Substituído por outro ADR (sempre referenciar o novo). |
| `REJECTED`    | Recusado. Mantido como histórico de "o que não fizemos e por quê". |

---

## Convenções de arquivo

- Slug em kebab-case: `ADR-0007-paleta-de-cores.md`.
- Numeração sempre com 4 dígitos: `RF-0001`, não `RF-1`.
- Datas no padrão ISO: `2026-05-09`.
- Idioma: **português do Brasil** para conteúdo; nomes de tokens e código em **inglês**.

---

## Convenções de commit

```
docs(adr): adiciona ADR-0007 paleta de cores
docs(rnf): atualiza RNF-0002 metas de performance
feat(ds): implementa Button conforme ADR-0010
fix(a11y): contraste do botão secundário
```

Tipos: `docs`, `feat`, `fix`, `chore`, `refactor`, `test`, `style`.
Escopos sugeridos: `adr`, `rf`, `rnf`, `ds` (design system), `a11y`, `infra`, `hooks`, `skills`.

---

## Skills do projeto (para sessões de IA)

Use essas skills para acelerar contribuições:

- `cdb-onboarding` — primeiro contato com o projeto.
- `cdb-indexer` — "onde está X?", reindexação da base.
- `cdb-design-system` — consulta rápida a tokens e componentes.
- `cdb-decision-log` — guia de criação de ADRs.

---

## Checklist antes de abrir PR

- [ ] Há um ADR `ACCEPTED` cobrindo a mudança?
- [ ] Os RFs/RNFs impactados foram atualizados?
- [ ] O `ROADMAP.md` reflete o avanço?
- [ ] Acessibilidade verificada (axe / Lighthouse a11y ≥ 95)?
- [ ] Mobile testado em 320px, 375px, 768px, 1024px, 1440px?
- [ ] Commits seguem a convenção?
