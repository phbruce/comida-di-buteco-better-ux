---
name: cdb-decision-log
description: Guia de criação de novos ADRs (Architecture Decision Records). Use quando o usuário disser "preciso decidir X", "registrar uma decisão", "criar um ADR para Y", ou quando uma mudança significativa surgir e ainda não tenha ADR cobrindo.
---

# cdb-decision-log — guia de criação de ADRs

Ajuda a transformar uma necessidade em um ADR bem estruturado, no formato canônico do projeto.

## Quando usar

- Usuário pede para "registrar decisão", "criar ADR", "documentar escolha de X".
- Uma mudança chegou ao código antes de ter ADR — pare, crie o ADR primeiro.
- Revisão de PR identifica decisão não documentada.

## Roteiro

1. **Confirmar que ainda não existe ADR cobrindo o tema:**
   ```bash
   ls docs/adr/
   grep -li "<termo>" docs/adr/*.md
   ```

2. **Descobrir o próximo número:**
   ```bash
   ls docs/adr/ADR-*.md | sed -E 's|.*/ADR-([0-9]+).*|\1|' | sort -n | tail -1
   ```
   Some 1 e use **4 dígitos**.

3. **Criar o arquivo a partir do template:**
   ```bash
   cp docs/adr/_template.md docs/adr/ADR-XXXX-<slug-kebab>.md
   ```

4. **Preencher** com o conteúdo, garantindo:
   - **Status: PROPOSED** (sempre começa assim).
   - Pelo menos **2 alternativas** consideradas com prós/contras.
   - **Consequências positivas E negativas** (custo aceito).
   - Lista de **RFs/RNFs relacionados** (com IDs).
   - **Plano de implementação** se aplicável.
   - **Como reverter**.

5. **Atualizar o índice** em `docs/adr/README.md`.

6. **Atualizar o ROADMAP.md** se a decisão impacta uma fase.

7. **Notificar o usuário** que o ADR está em PROPOSED e precisa de aprovação humana **antes** de ser implementado:

   > "ADR-XXXX criado em status PROPOSED. Ele NÃO pode ser implementado
   > até que você (dono do produto) confirme. Quer revisar agora?"

## Anti-padrões

- ❌ Marcar o ADR como ACCEPTED sem aprovação humana explícita.
- ❌ Criar ADR sem alternativas — força a documentação a justificar a escolha.
- ❌ Implementar código baseado em ADR PROPOSED.
- ❌ Pular numeração ou reaproveitar IDs.

## Boas práticas

- Cada ADR é **autossuficiente**: alguém lendo só ele entende a decisão.
- Cite **dados objetivos** quando possível (métricas, contraste, tamanho de payload).
- Liste o que **não** consideramos (escopo fechado).
- Linke RFs/RNFs por ID — ferramenta de indexação se beneficia.

## Pós-aprovação

Quando o usuário aprovar:

1. Trocar status para `ACCEPTED`.
2. Atualizar `docs/adr/README.md`.
3. Atualizar `ROADMAP.md` se necessário.
4. Só **então** abrir trabalho de implementação.
