# Princípios — Design System "Buteco Moderno"

Os princípios herdam o rigor britânico do GOV.UK Design System (ver `docs/adr/ADR-0002`) com identidade brasileira/gastronômica.

## 1. Conteúdo primeiro
A interface serve o conteúdo (o buteco, o prato, o endereço). Cromo visual nunca compete com a informação útil.

## 2. Acessibilidade não é feature
WCAG 2.2 AA é o piso, não a meta (`RNF-0001`). Toda combinação de cor passa AA antes de virar token. Foco visível com `--color-focus-ring` e sublinhado preto, alto contraste em qualquer fundo.

## 3. Mobile first
Todo componente nasce em 320px e cresce. Tap targets ≥ 44×44 (`RNF-0003`). Tipografia base ≥ 16px.

## 4. Linguagem clara
Verbos antes de substantivos: "votar", não "registro de votação". Frases curtas, voz ativa, sem jargão. Em pt-BR caloroso, não burocrático.

## 5. HTML semântico antes de ARIA
Use `<button>`, `<nav>`, `<address>`, `<details>`. ARIA só onde a semântica nativa não cobre.

## 6. Padrões pequenos, combinados
Componentes pequenos (`Button`, `Tag`, `Input`) compõem padrões maiores (`ButecoCard`, `Filters`). Nada de "molho secreto" não documentado.

## 7. Performance é ética
Quem está em 4G de bairro tem o mesmo direito ao conteúdo (`RNF-0002`). Sem JS no caminho crítico; imagens com `srcset`; fonte auto-hospedada.

## 8. Reversibilidade
Tokens são `--vars` CSS. Trocar valores não exige refatorar componentes. ADR registra cada mudança.
