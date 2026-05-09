---
name: cdb-indexer
description: Indexa a base documental do projeto e responde "onde está X?". Use quando o usuário perguntar "onde fala sobre Y?", "qual ADR cobre Z?", "tem algum RF para W?", ou pedir para reindexar/atualizar o índice de documentos.
---

# cdb-indexer — auto-conhecimento por indexação

Esta skill responde perguntas de localização ("onde está X no projeto?") usando uma indexação leve dos documentos.

## Quando usar

- Usuário pergunta "onde está X?", "tem ADR sobre Y?", "qual RF cobre Z?".
- Antes de criar um novo documento, para evitar duplicação.
- Para gerar o sumário do que existe (`scripts/index-docs.sh`).

## Como funciona

O projeto tem **um índice gerável** em `scripts/index-docs.sh`. Ele varre `docs/` e produz uma lista canônica de RFs, RNFs e ADRs com status, título e caminho.

## Roteiro

1. **Tentar responder rápido com grep:**
   ```bash
   # exemplo: "onde está votação?"
   grep -rni "votação\|votacao\|voto" docs/ --include='*.md' -l
   ```

2. **Se a busca semântica é mais ampla**, gere/atualize o índice:
   ```bash
   bash scripts/index-docs.sh
   ```
   Isso imprime um resumo: contagem por tipo, IDs e títulos. Use a saída para responder.

3. **Para "qual ADR cobre Y?":**
   ```bash
   grep -ni "Y" docs/adr/*.md | head
   ```

4. **Sempre devolva ao usuário:**
   - O **caminho exato** do(s) arquivo(s).
   - O **ID** (RF-XXXX, RNF-XXXX, ADR-XXXX).
   - O **status** se for ADR.

## Modelo de resposta

```
Encontrei:
- ADR-0005 — Token de cores (ACCEPTED) → docs/adr/ADR-0005-...md
- RF-0003 — Detalhe do buteco → docs/requisitos/funcionais/RF-0003-...md

Não encontrei nada sobre <Y> em RNFs. Posso propor RNF-XXXX se fizer sentido.
```

## Regras

- Não invente IDs. Se um RF/RNF/ADR não existe, diga.
- Para criar um novo documento, sempre confirme a numeração com `ls` antes.
- Se a busca retornar muitos resultados, agrupe por tipo (ADR/RF/RNF).
