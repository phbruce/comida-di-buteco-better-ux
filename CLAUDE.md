# CLAUDE.md — Briefing para sessões de IA

> Este arquivo é lido automaticamente por Claude Code no início de toda sessão. **Mantenha-o curto, denso e atualizado.**

## O que é o projeto

Redesign completo de UI/UX do site **Comida di Buteco** (https://comidadibuteco.com.br/butecos/belo-horizonte/).

Concurso gastronômico anual em que butecos competem com um prato autoral; usuários visitam, comem e votam. O site atual lista butecos por cidade.

## Diretrizes não-negociáveis

1. **Mobile first** — tudo é desenhado e implementado começando em 320px.
2. **Acessibilidade WCAG 2.2 AA** mínimo (ver `docs/requisitos/nao-funcionais/RNF-0001`).
3. **Inspiração GOV.UK Design System** — minimalismo, alto contraste, foco amarelo `#ffdd00`, tipografia clara.
4. **Toda decisão arquitetural vira ADR.** ADRs em status `PROPOSED` **NÃO** podem ser implementados sem aprovação humana explícita.
5. **Documentação em pt-BR**; código e tokens em inglês.
6. **PROIBIDO emojis** em qualquer parte do site renderizado ao usuário (componentes em `src/`, páginas, conteúdo, body de e-mails/issues gerados, etc.). Use ícones SVG inline com `aria-hidden`, ou apenas texto/badge. Vale para emojis decorativos E semânticos (✓ ✗ ⚠ etc.). Em docs internas (`docs/`) é tolerado, mas evite por consistência.

## Antes de propor implementação

1. Existe um ADR `ACCEPTED` cobrindo essa decisão?
2. Os RFs/RNFs estão atualizados?
3. A mudança aparece no `ROADMAP.md`?

Se a resposta a qualquer uma é "não" — pare e proponha primeiro. **Nunca implemente código de produção a partir de um ADR `PROPOSED`.**

## Mapa rápido

| Pergunta                                | Onde responder                            |
|-----------------------------------------|-------------------------------------------|
| Qual o problema do produto?             | `docs/CONTEXTO.md`                        |
| Que termo é esse?                       | `docs/GLOSSARIO.md`                       |
| O sistema precisa fazer X?              | `docs/requisitos/funcionais/`             |
| Qualidade/atributo Y?                   | `docs/requisitos/nao-funcionais/`         |
| Por que essa decisão técnica?           | `docs/adr/`                               |
| Qual o token visual de Z?               | `docs/design-system/`                     |
| O que falta no projeto?                 | `ROADMAP.md`                              |

## Skills disponíveis

- `/cdb-onboarding` — tour completo do projeto (use quando começar uma sessão nova)
- `/cdb-indexer` — reindexa e responde "onde está X"
- `/cdb-design-system` — consulta rápida a tokens e componentes
- `/cdb-decision-log` — guia de criação de novos ADRs

## Estado atual

Veja `ROADMAP.md` (fonte da verdade). Em resumo: **Fases 0 a 4 concluídas** + Fase 5 com a parte automatizável feita (Lighthouse CI, Pa11y CI, Web Vitals beacon). 17 ADRs registrados, 5 telas no ar (`/`, `/butecos/<cidade>/`, `/butecos/<cidade>/<slug>/`, `/sobre/`, `/concurso/`), 14 motivos paper-cut, Feedback ativo. Comentários (ADR-0015/0017) DEPRECATED em 2026-05-10. Pendência humana da Fase 5: testes com 5 usuários e leitor de tela manual.
