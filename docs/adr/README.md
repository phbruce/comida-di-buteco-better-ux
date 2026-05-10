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
| [ADR-0005](./ADR-0005-mapa-interativo.md) | Mapa interativo com design customizado | ~~SUPERSEDED~~ | — | 2026-05-09 |
| [ADR-0006](./ADR-0006-feedback-da-pagina.md) | Botão de feedback "esta info está correta?" | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0007](./ADR-0007-comentarios-giscus.md) | Comentários nas páginas via giscus | ~~SUPERSEDED~~ | — | 2026-05-09 |
| [ADR-0008](./ADR-0008-comentarios-cusdis.md) | Comentários nas páginas via Cusdis | ~~SUPERSEDED~~ por ADR-0015 | Dono do produto | 2026-05-09 |
| [ADR-0009](./ADR-0009-mapa-google.md) | Trocar mapa para Google Maps (Embed) | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0010](./ADR-0010-mapa-interativo-pan-zoom.md) | Destravar pan/zoom do mapa (Google API key) | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0011](./ADR-0011-tags-alimentares.md) | Tags vegetariano/vegano e filtros alimentares | ~~REJECTED~~ (adiado) | Dono do produto | 2026-05-09 |
| [ADR-0012](./ADR-0012-feedback-publico.md) | Feedback acessível a qualquer visitante (Web3Forms) | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0013](./ADR-0013-turnstile-anti-bot.md) | Cloudflare Turnstile como anti-bot do feedback | ACCEPTED | Dono do produto (delegado) | 2026-05-09 |
| [ADR-0014](./ADR-0014-self-host-cusdis.md) | Self-host do Cusdis | ~~REJECTED~~ | Dono do produto | 2026-05-09 |
| [ADR-0015](./ADR-0015-comentarios-proprios.md) | Sistema de comentários próprio (Worker + D1) | ~~DEPRECATED~~ em 2026-05-10 | Dono do produto | 2026-05-09 |
| [ADR-0016](./ADR-0016-ilustracoes-personalidade-visual.md) | Sistema de ilustrações decorativas (Storyset/unDraw + acentos próprios) | ACCEPTED | Dono do produto | 2026-05-09 |
| [ADR-0017](./ADR-0017-rating-com-pergunta-de-visita.md) | Pergunta de visita + rating por estrelas no comentário | ~~DEPRECATED~~ em 2026-05-10 | Dono do produto | 2026-05-10 |

## Como propor um ADR

1. Copie [`_template.md`](./_template.md) → `ADR-XXXX-<slug>.md` (numere sequencial).
2. Status inicial: **PROPOSED**.
3. Liste alternativas com prós/contras.
4. Marque RF/RNF relacionados.
5. Submeta para revisão. **Não implemente** enquanto estiver em PROPOSED.
