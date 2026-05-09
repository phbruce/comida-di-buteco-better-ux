# Architecture Decision Records (ADR)

> Toda decisão estrutural — produto, design, técnica — vira um ADR. Este é o **histórico permanente** das escolhas do projeto.

## Como ler um ADR

Cada ADR responde:

1. **Contexto** — qual problema/questão estava em jogo.
2. **Decisão** — o que escolhemos.
3. **Alternativas consideradas** — o que NÃO escolhemos e por quê.
4. **Consequências** — bônus e ônus que aceitamos.
5. **Rastreabilidade** — quais RFs/RNFs motivam.

## Estados

| Status        | Significado |
|---------------|-------------|
| `PROPOSED`    | Em discussão. **Não implementar.** Aguarda aprovação do dono do produto. |
| `ACCEPTED`    | Aprovado. Pode ser implementado. |
| `DEPRECATED`  | Não recomendado, mas ainda pode estar em uso. |
| `SUPERSEDED`  | Substituído por outro ADR (sempre referenciar o sucessor). |
| `REJECTED`    | Recusado. Mantido como histórico do "não fizemos e por quê". |

## Índice

| ID | Título | Status | Decisão por | Data |
|----|--------|--------|-------------|------|
| [ADR-0001](./ADR-0001-estrutura-de-documentacao.md) | Estrutura de documentação | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0002](./ADR-0002-design-system-base-govuk.md) | Design System inspirado em GOV.UK | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0003](./ADR-0003-stack-tecnologico.md) | Stack tecnológico (Astro + GitHub Pages) | ACCEPTED | Dono do produto (com restrição GH Pages) | 2026-05-09 |
| [ADR-0004](./ADR-0004-tokens-de-design.md) | Tokens de design (cor, tipografia, espaço) | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0005](./ADR-0005-mapa-interativo.md) | Mapa interativo com design customizado | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0006](./ADR-0006-feedback-da-pagina.md) | Botão de feedback "esta info está correta?" | **PROPOSED** | — | 2026-05-09 |

## Como propor um ADR

1. Copie [`_template.md`](./_template.md) → `ADR-XXXX-<slug>.md` (numere sequencial).
2. Status inicial: **PROPOSED**.
3. Liste alternativas com prós/contras.
4. Marque RF/RNF relacionados.
5. Submeta para revisão. **Não implemente** enquanto estiver em PROPOSED.
