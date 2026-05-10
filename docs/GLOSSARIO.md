# Glossário

> Termos do domínio e do projeto. Acrescente sempre que cunhar uma palavra "interna".

## Domínio

| Termo                | Definição |
|----------------------|-----------|
| **Buteco**           | Estabelecimento participante do concurso (bar, boteco, boteca). |
| **Prato**            | Receita autoral inscrita pelo buteco no concurso. Há **um** prato por buteco por edição. |
| **Edição**           | Ano-cidade do concurso (ex.: "BH 2026"). |
| **Etapa**            | Fase do concurso: **regional** (cidade) → **estadual** (se aplicável) → **nacional**. |
| **Voto**             | Avaliação atribuída pelo público a um buteco visitado. |
| **Cédula**           | Documento (físico ou digital) onde o voto é registrado. |
| **Vencedor**         | Buteco premiado em sua etapa. |
| **Categoria de prêmio** | Eixos avaliados: prato, atendimento, higiene, temperatura, etc. |

## Projeto

| Termo                | Definição |
|----------------------|-----------|
| **RF**               | Requisito Funcional — capacidade que o sistema deve oferecer. |
| **RNF**              | Requisito Não Funcional — atributo de qualidade (performance, a11y, etc.). |
| **ADR**              | Architecture Decision Record — decisão técnica/produto registrada. |
| **DS**               | Design System. |
| **Token**            | Variável de design (cor, espaçamento, tipografia) reutilizável. |
| **Skill (Claude)**   | Comando/conhecimento empacotado em `.claude/skills/<nome>/SKILL.md`. |
| **Hook**             | Script que dispara em eventos do Claude Code (SessionStart, etc.). |
| **PROPOSED**         | Status de ADR em discussão; não pode ser implementado. |
| **ACCEPTED**         | Status de ADR aprovado; libera implementação. |
| **DEPRECATED**       | Status de ADR cuja decisão foi revertida; código pode ainda existir mas não é mais consumido. |
| **SUPERSEDED**       | Status de ADR substituído por outro (cita o ADR sucessor). |
| **REJECTED**         | Status de ADR recusado na avaliação; mantido como histórico de "o que não fizemos e por quê". |
| **Motif**            | Ilustração SVG curta de um vegetal/elemento de buteco (pimenta, folha, garrafa, etc.) — sistema do ADR-0016. |
| **Paper-cut sharp**  | Estilo das ilustrações: silhuetas em polígonos de retas (sem curvas), camadas chapadas, sem gradientes. |

## Acessibilidade

| Termo                | Definição |
|----------------------|-----------|
| **WCAG 2.2**         | Web Content Accessibility Guidelines, versão 2.2. |
| **AA**               | Nível mínimo de conformidade alvo deste projeto. |
| **Skip link**        | Link "pular para o conteúdo" no início da página. |
| **Focus ring**       | Anel de foco visível no elemento ativo. |
| **Contraste**        | Razão de luminância entre texto e fundo. AA exige ≥ 4.5:1 (texto normal) e ≥ 3:1 (texto grande). |
