# Documentação

Índice central da documentação do projeto.

## Por onde começar

- [`CONTEXTO.md`](./CONTEXTO.md) — o problema, o público, o produto.
- [`GLOSSARIO.md`](./GLOSSARIO.md) — termos do domínio.
- [`../ROADMAP.md`](../ROADMAP.md) — onde estamos e para onde vamos.

## Requisitos

- [`requisitos/funcionais/`](./requisitos/funcionais/) — o que o sistema **faz**.
- [`requisitos/nao-funcionais/`](./requisitos/nao-funcionais/) — atributos de **qualidade**.

## Decisões

- [`adr/`](./adr/) — Architecture Decision Records.
- Toda decisão de impacto (visual, técnico, de produto) tem um ADR.

## Design

- [`design-system/`](./design-system/) — tokens, componentes e padrões. Tokens vivem em `src/styles/tokens.css` (CSS vars); componentes em `src/components/`. Documentação textual aqui é dívida em curso.

## Pesquisa

- [`pesquisa/`](./pesquisa/) — diagnósticos, benchmarks e referências externas.

## Convenções de numeração

- RF: `RF-0001`, `RF-0002`, …
- RNF: `RNF-0001`, `RNF-0002`, …
- ADR: `ADR-0001`, `ADR-0002`, …

Numeração é sequencial e nunca reutilizada. Documento removido fica como "tombstone" indicando o motivo.
