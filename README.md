# Comida di Buteco — Better UX

> ⚠️ **Redesign exploratório, NÃO oficial**, sem vínculo com a organização do concurso Comida di Buteco. Site oficial: https://comidadibuteco.com.br/.
>
> Projeto de redesign de UI/UX com foco em **mobile first**, acessibilidade e um design system minimalista inspirado no [GOV.UK Design System](https://design-system.service.gov.uk/).

Site de referência (oficial, alvo de inspiração): https://comidadibuteco.com.br/butecos/belo-horizonte/
Demo deste redesign: https://phbruce.github.io/comida-di-buteco-better-ux/

---

## O que é este repositório

Este repositório é a **fonte única de verdade** das decisões de produto, design e engenharia para o redesign do site. Antes de implementar qualquer linha de código, capturamos:

1. **Contexto** — o problema e o usuário (ver `docs/CONTEXTO.md`).
2. **Requisitos Funcionais (RF)** — o que o sistema precisa fazer.
3. **Requisitos Não Funcionais (RNF)** — atributos de qualidade (performance, acessibilidade, mobile-first, etc.).
4. **Architecture Decision Records (ADR)** — toda decisão arquitetural significativa, com alternativas consideradas e justificativa.
5. **Design System** — tokens, componentes, padrões e exemplos.

Toda decisão deve ser rastreável de um ADR para um conjunto de RFs/RNFs. Toda implementação deve apontar para ao menos um ADR aceito.

---

## Estrutura

```
.
├── README.md                  # Você está aqui
├── CONTRIBUTING.md            # Como contribuir e fluxo de decisão
├── ROADMAP.md                 # Fases e marcos do projeto
├── CLAUDE.md                  # Briefing para sessões de IA
├── docs/
│   ├── CONTEXTO.md            # Briefing de produto
│   ├── GLOSSARIO.md           # Termos do domínio (buteco, voto, etapa, etc.)
│   ├── requisitos/
│   │   ├── funcionais/        # RFs numerados
│   │   └── nao-funcionais/    # RNFs numerados
│   ├── adr/                   # Architecture Decision Records
│   ├── design-system/         # Tokens, componentes e padrões
│   └── pesquisa/              # Diagnóstico, benchmarks e referências
├── .claude/
│   ├── settings.json          # Hooks e permissões da sessão
│   ├── hooks/                 # Scripts de SessionStart
│   └── skills/                # Skills de auto-conhecimento do projeto
├── scripts/                   # Utilitários (indexação de docs, etc.)
└── src/                       # Código (preenchido após ADRs aceitos)
```

---

## Fluxo de decisão (resumo)

```
Ideia/Problema → RF/RNF (rascunho) → ADR (PROPOSED)
                                        │
                                        ▼
                               Revisão do dono do produto
                                        │
                                        ▼
                                  ADR (ACCEPTED) → Implementação
```

**Nenhum ADR pode sair de PROPOSED para ACCEPTED sem aprovação explícita do dono do produto** (ver `CONTRIBUTING.md`).

---

## Como começar (assistido por IA)

Este repositório é otimizado para sessões com Claude Code:

- O hook `SessionStart` carrega automaticamente contexto, roadmap e ADRs ativos.
- A skill `cdb-onboarding` faz o "tour" do projeto.
- A skill `cdb-indexer` reindexa a base documental e responde "onde está X?".
- A skill `cdb-design-system` traz tokens e componentes na ponta da língua.
- A skill `cdb-decision-log` guia a criação de novos ADRs.

---

## Status

🟡 **Fase 0 — Fundação** (em andamento)
Documentação, requisitos iniciais e ADRs do design system propostos.

Veja `ROADMAP.md` para detalhes.
