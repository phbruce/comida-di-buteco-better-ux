# RF-0005 — Registrar voto em um buteco

- **Status:** Em rascunho
- **Prioridade:** Alta
- **Criado em:** 2026-05-09
- **RNFs relacionados:** RNF-0001, RNF-0005 (segurança)
- **ADRs relacionados:** ADR-0002

## Descrição

O sistema deve permitir que um visitante registre seu voto durante o período do concurso, dentro das regras oficiais.

## Atores

- Visitante (votante).

## Premissas a validar

- O regulamento oficial estabelece o que pode ser votado (categorias) e como (autenticação, limites).
- Pode haver requisitos legais de coleta mínima de dados (CPF, e-mail).
- Esses pontos serão fechados em ADR específico **após** revisão do regulamento da edição.

## Cenários

### Cenário 1 — voto durante o período aberto
- **Dado** que o concurso está aberto,
- **Quando** o visitante clica em "votar" num buteco,
- **Então** ele inicia o fluxo de votação na cédula digital, com confirmação clara antes do envio.

### Cenário 2 — voto fora do período
- **Quando** o concurso não está aberto,
- **Então** o CTA é substituído por estado informativo (ver RF-0003).

### Cenário 3 — voto duplicado
- **Quando** o votante já votou neste buteco/categoria,
- **Então** o sistema informa de forma clara, sem perda da contagem original.

### Cenário 4 — confirmação
- Após voto válido, exibir tela de confirmação com:
  - resumo do voto
  - opção de compartilhar (sem revelar dados pessoais)
  - link "votar em outro buteco"

## Critérios de aceitação

- [ ] Formulário com labels, mensagens de erro acessíveis (`aria-describedby`) e foco gerenciado.
- [ ] Sem CAPTCHA visual sem alternativa acessível.
- [ ] Erros server-side comunicados de forma clara, sem perder os dados preenchidos.
- [ ] Conformidade com LGPD: aviso explícito do uso de dados, política de privacidade vinculada.

## Fora de escopo

- Painel administrativo de apuração.
- Detecção de fraude além do mínimo (rate limiting / honeypot) — coberto pelo back-end.
