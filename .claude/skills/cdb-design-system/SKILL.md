---
name: cdb-design-system
description: Consulta rápida ao design system do projeto — tokens (cor, tipografia, espaço), princípios e componentes. Use quando o usuário perguntar pela cor de marca, espaçamento, tipografia, foco, breakpoints, ou pedir para implementar/usar um componente do DS.
---

# cdb-design-system — consulta rápida

Acesso rápido aos tokens e princípios do design system do Comida di Buteco — Better UX.

## Quando usar

- Usuário pergunta "qual a cor primária?", "que fonte usamos?", "qual o spacing-4?".
- Implementação que precisa aplicar tokens.
- Revisão de PR que mexe em estilos.

## Fonte da verdade

- **Tokens:** `docs/adr/ADR-0004-tokens-de-design.md` (enquanto status for `PROPOSED`, **não implemente em código** — apenas consulte para discussão).
- **Princípios:** `docs/adr/ADR-0002-design-system-base-govuk.md`.
- **Stack:** `docs/adr/ADR-0003-stack-tecnologico.md`.
- **Referência externa:** `docs/pesquisa/referencias-govuk.md`.

## Roteiro

1. Identifique a categoria do pedido: cor, tipografia, espaço, raio, sombra, breakpoint, motion, componente.
2. Leia o ADR correspondente e responda **citando o token** e o **valor**.
3. Se o ADR ainda está `PROPOSED`, **avise o usuário**:
   > "ADR-0004 está em PROPOSED — esses tokens são proposta, ainda não implementáveis sem aprovação."
4. Se a pergunta envolve um componente que ainda não tem ADR/doc, sugira criar um.

## Modelo de resposta

```
**Token:** --brand-primary
**Valor:** #9c2a1b
**Origem:** ADR-0004 (status: PROPOSED)
**Uso:** CTA principal, links de destaque
**Combinações testadas:**
- com texto #fbf7f0 → contraste 8.6:1 (AAA)

⚠️ Atenção: como ADR-0004 está em PROPOSED, este token não deve aparecer
em código de produção até aprovação.
```

## Princípios resumidos (decoração)

- Conteúdo primeiro.
- WCAG 2.2 AA mínimo.
- Mobile first em 320px.
- Foco visível com cor de assinatura (`--focus-ring`).
- HTML semântico antes de ARIA.
- Frases curtas, voz ativa.

## Regras

- Não invente valores. Se um token não está no ADR, diga.
- Sempre indique se o ADR está PROPOSED, ACCEPTED, etc.
