# ADR-0001 — Estrutura de documentação do projeto

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (pedido inicial: "Crie um projeto para melhorar o ui e ux da comida di buteco. Crie todos os arquivos base de um repositório para documentações...")
- **RFs/RNFs relacionados:** todos (define o "como" de todos os documentos)

## Contexto

Este redesign envolve decisões cruzadas de produto, design, engenharia e acessibilidade. Sem um padrão claro de captura de requisitos e decisões, o projeto vira "memória oral" e perde a rastreabilidade que é essencial para um produto público.

O dono do produto definiu:
- Toda decisão deve passar por **RF**, **RNF** e **ADR**.
- Decisões de ADR precisam de **aprovação humana** antes da implementação.

## Decisão

Adotamos a seguinte estrutura, onde **cada artefato tem um único lar**:

```
docs/
  CONTEXTO.md                  # briefing do produto
  GLOSSARIO.md                 # termos do domínio e do projeto
  requisitos/
    funcionais/                # RFs (RF-XXXX)
    nao-funcionais/            # RNFs (RNF-XXXX)
  adr/                         # ADRs (ADR-XXXX) — fonte da verdade de decisões
  design-system/               # tokens, componentes, padrões — preenchido após ADR aceito
  pesquisa/                    # diagnósticos, benchmarks, referências externas
```

E mais:

- `README.md` — porta de entrada.
- `CONTRIBUTING.md` — fluxo de decisão e contribuição.
- `ROADMAP.md` — fonte da verdade de "onde estamos / para onde vamos".
- `CLAUDE.md` — briefing curto para sessões de IA.
- `.claude/` — hooks (SessionStart) e skills de auto-conhecimento.
- `scripts/` — utilitários (indexação, etc.).
- `src/` — código (preenchido apenas após ADRs de stack ACCEPTED).

**Convenções:**
- Numeração sequencial com 4 dígitos (`RF-0001`, nunca reaproveitada).
- Slug em kebab-case (`ADR-0007-paleta-de-cores`).
- Conteúdo em pt-BR; tokens e código em inglês.
- ADR só sai de `PROPOSED` para `ACCEPTED` por aprovação explícita do dono do produto.

## Alternativas consideradas

### Alternativa A — Wiki / Notion externo
- **Prós:** mais "amigável" para quem não usa git.
- **Contras:** divorcia documentação do código; sem rastreabilidade via PR; duplicação; sem versionamento granular.
- **Por que não:** a fonte da verdade precisa estar no mesmo lugar das decisões executáveis (código).

### Alternativa B — README único enorme
- **Prós:** simples.
- **Contras:** vira papel de parede; impossível rastrear evolução de uma decisão; conflitos de merge constantes.
- **Por que não:** não escala.

### Alternativa C — Estrutura escolhida (adotada)
- **Prós:** documentação como código, rastreável, granular, indexável por IA, navegável manualmente, baixa fricção.
- **Contras:** exige disciplina de numeração e checklist de PR.

## Consequências

### Positivas
- Toda decisão é PR-rastreável.
- IA tem mapa cognitivo claro (`CLAUDE.md` aponta para o resto).
- Onboarding humano fica curto: "leia README → ROADMAP → CONTEXTO → ADRs ACCEPTED".

### Custos aceitos
- Pequeno overhead para registrar ADRs/RFs/RNFs antes de codar.
- Disciplina de não pular para `src/` sem ADR.

## Plano de implementação

- [x] Criar diretórios e arquivos base.
- [x] Templates de RF, RNF, ADR.
- [x] RFs iniciais (0001-0005) e RNFs iniciais (0001-0005).
- [x] CLAUDE.md, ROADMAP.md, CONTRIBUTING.md, README.md.
- [x] SessionStart hook + skills de auto-conhecimento.

## Como reverter

Improvável. Se necessário, exportar tudo para outro formato — todo conteúdo é Markdown e fica versionado.
