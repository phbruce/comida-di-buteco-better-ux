---
name: cdb-onboarding
description: Tour completo do projeto Comida di Buteco — Better UX. Use SEMPRE no início de uma sessão nova ou quando o usuário pedir "me explica o projeto", "qual o status", "o que está pendente?", ou perguntar pela arquitetura, ADRs, RFs, RNFs ou roadmap.
---

# cdb-onboarding — tour do projeto

Esta skill faz o "tour" completo do projeto Comida di Buteco — Better UX. Ela orienta uma sessão nova até estar pronta para contribuir, na ordem certa.

## Quando usar

- Usuário pergunta "qual o status?", "o que falta?", "me explica o projeto?".
- Sessão nova sem contexto.
- Antes de propor qualquer mudança grande.

## Roteiro de execução

Faça **nesta ordem**, com tool calls reais (não invente). Sempre que possível, calls em paralelo:

1. **Visão geral** — leia em paralelo:
   - `README.md`
   - `CLAUDE.md`
   - `ROADMAP.md`
   - `docs/CONTEXTO.md`

2. **Decisões vigentes** — liste o índice de ADRs:
   ```bash
   ls docs/adr/ADR-*.md
   ```
   Para cada ADR encontrado, leia o **título** e **status** (linhas 1 e 3 do arquivo). Identifique:
   - ADRs `ACCEPTED` (decisões em vigor).
   - ADRs `PROPOSED` (aguardam aprovação — **não implementar**).

3. **Requisitos vigentes** — liste os RFs e RNFs:
   ```bash
   ls docs/requisitos/funcionais/RF-*.md docs/requisitos/nao-funcionais/RNF-*.md
   ```
   Cite os títulos.

4. **Próximos passos** — leia a primeira fase incompleta do `ROADMAP.md` e enumere os checkboxes pendentes.

5. **Saída para o usuário** (em pt-BR):

   Modelo de resposta:
   ```
   ## Status do Comida di Buteco — Better UX

   **Fase atual:** <fase incompleta mais próxima do topo>

   **ADRs aprovados (em vigor):**
   - <lista>

   **ADRs propostos (aguardam aprovação):**
   - <lista>

   **Pendências imediatas:**
   - <checkboxes da fase atual ainda em aberto>

   **O que posso fazer agora?**
   - <sugestões concretas, todas alinhadas a algum RF/RNF/ADR ACCEPTED>
   ```

## Regras

- **Nunca** sugira implementar código se a tarefa depende de um ADR `PROPOSED`. Sugira primeiro promover o ADR.
- Sempre cite o `ID + caminho` do RF/RNF/ADR ao referenciar.
- Se um arquivo esperado não existir, pare e reporte ao usuário em vez de inventar.
