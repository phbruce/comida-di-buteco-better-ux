# RNF-0001 — Acessibilidade WCAG 2.2 AA

- **Status:** Em rascunho
- **Categoria:** Acessibilidade
- **Criado em:** 2026-05-09
- **RFs relacionados:** RF-0001, RF-0002, RF-0003, RF-0004, RF-0005

## Atributo de qualidade

O site é utilizável por pessoas com deficiência (visual, motora, cognitiva, auditiva) em conformidade com WCAG 2.2 nível AA.

## Métricas

| Métrica                                | Alvo                  | Como medir                         |
|----------------------------------------|------------------------|------------------------------------|
| Lighthouse a11y score                  | ≥ 95 em todas as telas | CI por PR + auditoria manual       |
| axe-core violations                    | 0 críticas, 0 sérias   | `@axe-core/cli` em CI              |
| Contraste de texto                     | ≥ 4.5:1 (normal), ≥ 3:1 (grande) | DevTools / contrast checker |
| Navegação por teclado                  | 100% das ações alcançáveis | Smoke test manual por release   |
| Skip-link                              | Presente em todas as páginas | Inspeção                       |
| Foco visível                           | Em todos os elementos focáveis | Inspeção                     |

## Cenários

### Cenário 1 — leitor de tela
- **Estímulo:** usuário de NVDA/VoiceOver/TalkBack abre a listagem.
- **Resposta:** estrutura de headings é anunciada corretamente; cards são percorríveis; títulos identificam buteco e prato.

### Cenário 2 — sem mouse
- **Estímulo:** usuário navega só com Tab/Shift+Tab/Enter/Espaço.
- **Resposta:** ordem lógica, foco visível com mínimo 2px e contraste ≥ 3:1, sem armadilhas de foco.

### Cenário 3 — zoom de texto 200%
- **Estímulo:** zoom in 200% no navegador.
- **Resposta:** sem rolagem horizontal, sem corte de conteúdo, sem sobreposição.

### Cenário 4 — preferência de movimento
- **Estímulo:** `prefers-reduced-motion: reduce` ativado.
- **Resposta:** transições essenciais são curtas; animações decorativas são suprimidas.

## Estratégias

- HTML semântico antes de ARIA. ARIA só onde semântica não cobre.
- Componentes do design system seguem padrões da [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).
- Foco visível inspirado no GOV.UK: contorno amarelo `#ffdd00` sobre underline preto, alto contraste em qualquer fundo.
- Skip-link no início de toda página.
- Headings em hierarquia única e ininterrupta.
- Imagens decorativas com `alt=""`; informativas com texto significativo.

## Trade-offs

- Animações ricas → custo cognitivo e de a11y. Preferimos sutileza.

## Como validar

- CI: `axe-core` em PRs.
- Mensal: auditoria com leitor de tela real.
- Pré-release: Lighthouse a11y ≥ 95 obrigatório.
