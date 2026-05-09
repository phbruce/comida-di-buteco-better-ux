# RF-0001 — Listar butecos por cidade

- **Status:** Em rascunho
- **Prioridade:** Alta
- **Criado em:** 2026-05-09
- **Atualizado em:** 2026-05-09
- **RNFs relacionados:** RNF-0001 (acessibilidade), RNF-0002 (performance), RNF-0003 (mobile-first)
- **ADRs relacionados:** ADR-0002, ADR-0004

## Descrição

O sistema deve permitir que um visitante veja a lista de butecos participantes de uma determinada cidade na edição corrente do concurso.

## Atores

- **Visitante** (anônimo).

## Cenários

### Cenário 1 — listagem padrão (caminho feliz)
- **Dado** que o visitante acessou a URL da cidade (ex.: `/butecos/belo-horizonte/`),
- **Quando** a página termina de carregar,
- **Então** ele vê uma lista paginada de butecos da cidade contendo, no mínimo:
  - Nome do buteco
  - Nome do prato concorrente
  - Bairro
  - Foto principal do prato
  - Indicador visual se o buteco recebeu prêmio anterior

### Cenário 2 — cidade sem butecos no momento
- **Dado** que a cidade selecionada ainda não tem butecos cadastrados na edição,
- **Quando** a página carrega,
- **Então** o visitante vê uma mensagem clara explicando o estado e CTA para outra cidade.

### Cenário 3 — falha de rede
- **Dado** que a chamada de dados falhou,
- **Quando** o erro é detectado,
- **Então** o visitante vê uma mensagem de erro acionável com botão "tentar novamente".

## Critérios de aceitação

- [ ] Listagem renderizada em ≤ 2,5 s em 4G simulado (LCP).
- [ ] Cards têm contraste mínimo 4.5:1 para texto.
- [ ] Cada card é navegável por teclado em ordem lógica.
- [ ] Imagens têm `alt` significativo (não decorativo).
- [ ] Listagem suporta paginação ou rolagem com âncora estável (sem perder lugar ao voltar).
- [ ] Em 320px, cada card é totalmente legível sem rolagem horizontal.

## Fora de escopo

- Mapa interativo dos butecos (futuro).
- Comparador lado a lado (backlog).

## Notas

- Investigar formato da API atual.
- Considerar número médio de butecos por cidade para definir paginação.
