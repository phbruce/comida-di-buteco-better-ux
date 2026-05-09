# RF-0004 — Selecionar cidade do concurso

- **Status:** Em rascunho
- **Prioridade:** Alta
- **Criado em:** 2026-05-09
- **RNFs relacionados:** RNF-0001, RNF-0003
- **ADRs relacionados:** ADR-0002

## Descrição

O sistema deve permitir que o visitante encontre rapidamente a lista de butecos de **sua cidade** entre todas as cidades participantes da edição.

## Atores

- Visitante.

## Cenários

### Cenário 1 — primeira visita
- **Dado** que o visitante não tem cidade memorizada,
- **Quando** acessa a home,
- **Então** vê uma seleção de cidade clara, com:
  - busca por nome
  - lista agrupada por estado
  - destaque das cidades mais populares (sem coletar geolocalização sem consentimento)

### Cenário 2 — visitante recorrente
- **Dado** que o visitante já selecionou cidade,
- **Quando** retorna,
- **Então** é direcionado direto para a listagem dessa cidade, com opção "trocar cidade" sempre acessível no header.

### Cenário 3 — geolocalização (opt-in)
- O visitante pode **clicar** em "usar minha localização" para sugerir a cidade mais próxima.
- Geolocalização **nunca** é solicitada automaticamente.

## Critérios de aceitação

- [ ] URL canônica por cidade: `/butecos/<cidade-slug>/`.
- [ ] Cidade memorizada por cookie/localStorage por 30 dias.
- [ ] Trocar cidade é acessível em ≤ 2 toques a partir de qualquer página.
- [ ] Seleção navegável por teclado e leitor de tela.

## Fora de escopo

- Multi-cidade simultânea (ex.: viajante escolhendo entre 3) — backlog.
