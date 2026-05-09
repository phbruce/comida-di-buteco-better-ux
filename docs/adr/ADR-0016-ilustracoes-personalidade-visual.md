# ADR-0016 — Sistema de ilustrações decorativas (personalidade visual)

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 — Alternativa B: híbrido Storyset/unDraw + acentos próprios)
- **RFs/RNFs relacionados:** RNF-0001 (a11y), RNF-0002 (performance), RNF-0003 (mobile-first), ADR-0002 (DS GOV.UK), ADR-0004 (tokens "Buteco Moderno")

## Contexto

A versão atual do redesign — toda em texto, regras horizontais e cards — atinge bem os requisitos funcionais e de acessibilidade, mas carece de **personalidade visual**. O site oficial da edição 2026 (`comidadibuteco.com.br`) usa **ilustrações tipo papel-recorte** (frutas, legumes, folhas, mapa do Brasil estilizado) como ornamento em hero, separadores, footer e empty states. Isso dá calor ao tema gastronômico e ajuda a quebrar o ritmo do conteúdo.

Uma primeira tentativa caseira (commit `d4cf895`, componente `OrnamentBand.astro`) ficou crua: as silhuetas em poligonais foram lidas como "blocos de cor abstratos", não como vegetais reconhecíveis. O dono do produto solicitou:

1. **Refinar as ilustrações** (mais detalhe, mais variação, formas reconhecíveis).
2. **Aplicar também em cards** (ButecoCard, city cards, ButecoListItem) e revisitar o **hero da home** (que ficou estranho com a faixa logo abaixo).
3. **Considerar lib profissional gratuita** se acelerar e dar qualidade.

Forças em jogo:

- **Identidade brasileira/gastronômica** — pimenta, cebola roxa, milho, beterraba, folhas, pequi, mandioca etc.
- **Coerência com o DS sharp** (GOV.UK + ADR-0002): cantos retos, alta legibilidade, cores fortes da paleta Buteco Moderno (urucum #9c2a1b, lima #1f6f4a, dendê #f4b400).
- **Performance** (RNF-0002): cada KB extra no caminho crítico conta. Hoje o site é zero-JS no critical path.
- **Acessibilidade** (RNF-0001): toda ilustração decorativa precisa ser `aria-hidden`/`role="presentation"`.
- **Licenciamento**: este é um redesign público no GitHub Pages. Ativos precisam ser livres para uso comercial OU CC0.
- **Habilidade de ilustração**: equipe (essencialmente o mantenedor + IA) não tem ilustrador profissional. Custom-puro tende ao "bloco de cor".

## Decisão (proposta) — Alternativa B: Híbrido com Storyset/unDraw como base

Adotar uma **abordagem híbrida**:

1. **Base**: ilustrações de uma **lib profissional gratuita** (Storyset com atribuição OU unDraw MIT-like) recolorizadas para a paleta Buteco Moderno via SVG inline + tokens CSS.
2. **Acentos brasileiros**: silhuetas curtas, próprias, em SVG inline para elementos que nenhuma lib genérica cobre bem (pimenta, mandioca, milho, vagem, garrafa long-neck), também coloridas via tokens.
3. **Sistema componentizado**: tudo via `<Illustration kind="..." />` (ou similar) para uniformizar tamanho, ratio, accessibility e tokens.
4. **Aplicação restrita** — não ornamentar tudo. Pontos onde agregam:
   - Hero da home (uma cena grande, lateral à coluna de texto).
   - Empty states (cidade sem butecos, busca sem resultados, página de buteco sem foto).
   - Topo do footer (faixa decorativa fina).
   - Possivelmente um motivo curto no canto de cards quando o card não tem foto.

## Alternativas consideradas

### Alternativa A — Custom inline SVG, refinado

Continuar 100% caseiro, mas dedicando tempo de desenho de verdade — talvez via Figma/Inkscape, com formas mais detalhadas (silhueta + sombras chapadas + textura via padrões SVG simples).

- **Prós:**
  - Identidade 100% nossa, sem se parecer com nenhum outro site.
  - Coerência total com ADR-0002 e ADR-0004.
  - Sem dependência externa, sem questão de licença.
  - Performance ótima (SVG inline, comprime bem com gzip).
- **Contras:**
  - Exige **habilidade de ilustração** que a equipe atual não tem. A primeira tentativa já mostrou o limite.
  - Tempo de iteração alto: cada refinamento custa horas.
  - Risco de continuar parecendo "bloco de cor" se não houver vetorização cuidadosa.
- **Por que não (recomendação principal):** o gargalo é talento de ilustração, não vontade. Sem isso, refinar o `OrnamentBand` continuará dando resultado morno.

### Alternativa B — Híbrido: lib profissional + acentos próprios — RECOMENDADA

Usar **Storyset** (https://storyset.com) ou **unDraw** (https://undraw.co) como base de cenas/figuras humanas e abstrações genéricas (mesa, prato, gente conversando, mapa do Brasil), recolorizadas via CSS pra paleta Buteco Moderno. Complementar com SVGs próprios curtos pra elementos brasileiros que a lib não cobre.

- **Prós:**
  - Resultado **profissional desde o dia 1**.
  - Variedade enorme (ambas têm centenas de ilustrações).
  - **Recoloríveis** — ambas servem SVG editável; trocamos cores pra usar nossos tokens.
  - Storyset oferece versões "Cuate" (linhas), "Pana" (cor chapada) e "Bro" (cor forte) — combinam com o tom DS quando escolhemos a chapada.
  - **Licença comercial-friendly**:
    - **unDraw** — licença "open source" tipo MIT: uso comercial e não-comercial sem atribuição.
    - **Storyset** — gratuito **com atribuição** ou pago para remover atribuição.
- **Contras:**
  - **Storyset exige atribuição** se não pagar. Pra um redesign não-oficial OSS, atribuição é razoável (já temos crédito de fotógrafo, créditos de marca, etc.).
  - **unDraw é mais "tech/gente"** que "comida". Pra hero da home, dá; pra ornamento de comida, não.
  - Cada cena vira 5-30 KB de SVG. Aplicação descuidada pode pesar a página.
  - Risco de "site genérico" se usarmos só unDraw cru sem recolorização cuidadosa.
- **Por que sim:** combina velocidade + qualidade. Storyset cobre cenas; SVG próprio cobre os motivos brasileiros.

### Alternativa C — Lib profissional pura (só unDraw / só Storyset)

- **Prós:** mais rápido ainda, zero custom. 
- **Contras:** perde toda identidade brasileira/gastronômica. Vira site genérico de SaaS. Não atende ao espírito do site oficial.
- **Por que não:** sacrifica a personalidade que o pedido busca.

### Alternativa D — Hand-drawn assets de bibliotecas estilizadas (Open Peeps, Open Doodles, Humaaans, DrawKit free)

- **Prós:** estética hand-drawn, mais coerente com o "papel-recorte" do oficial.
- **Contras:** Open Peeps é só pessoas; Open Doodles é abstrato; Humaaans é só pessoas modulares. Nenhum cobre comida brasileira. DrawKit free é limitado.
- **Por que não (sozinho):** mesmo problema da C — não há cobertura temática. Pode entrar como complemento na Alternativa B.

### Alternativa E — Contratar/comissionar ilustrador

- **Prós:** identidade 100% própria e profissional.
- **Contras:** custa dinheiro; o redesign é experimento aberto sem orçamento.
- **Por que não:** fora do escopo do projeto.

## Consequências

### Positivas
- Personalidade visual à altura do site oficial (ou melhor), sem precisar de talento de ilustração interno.
- Reuso fácil via componente único; cada nova página recebe o mesmo padrão.
- Recolorização via tokens — quando ADR-0004 evoluir, ilustrações acompanham.

### Negativas / custos aceitos
- **Atribuição visível** ao Storyset (se for a escolha) em algum lugar — provavelmente footer e/ou página `sobre`.
- Aumento de peso de página (estimativa: 20-60 KB por cena, gzipped). Mitigação: lazy-loading via `loading="lazy"` em `<img src="...svg">`, ou inline só quando crítico.
- Acentos brasileiros próprios ainda exigem desenho — só que mais focado e curto que faixas inteiras.
- Pequena dose de "já vi essa ilustração em outro site" se Storyset/unDraw forem reconhecíveis. Mitigação: recolorização forte e composição própria.

### Neutras
- O componente atual `OrnamentBand.astro` fica como referência histórica; pode ser depreciado e removido depois que o sistema novo estiver de pé.
- ADR-0017 (futuro, opcional) pode formalizar **onde NÃO usar** ilustração, pra evitar inflação visual.

## Plano de implementação (se aprovado)

### Fase 1 — Decisão de lib + atribuição (1 dia)
- [ ] Comparar Storyset vs unDraw em 3 casos concretos (hero, empty state, footer top) — mockups rápidos.
- [ ] Escolher uma das duas. Registrar a decisão como apêndice deste ADR.
- [ ] Adicionar bloco de atribuição no footer e/ou `sobre/#direitos` se Storyset.

### Fase 2 — Componente base e tokens (1-2 dias)
- [ ] Criar `src/components/ui/Illustration.astro` com props: `kind` (enum), `size` (sm/md/lg), `aria-hidden` por padrão.
- [ ] Tokens novos em `tokens.css`: `--illustration-color-primary`, `--illustration-color-secondary`, `--illustration-color-accent`, `--illustration-color-line` mapeados pra paleta Buteco Moderno.
- [ ] Pipeline de recolorização: baixar SVG da lib → trocar fills/strokes hardcoded por `currentColor` ou `var(--illustration-color-*)` → salvar em `src/assets/illustrations/*.svg` ou inline em variants do componente.

### Fase 3 — Acentos brasileiros próprios (2-3 dias)
- [ ] 6-8 motivos curtos: pimenta, cebola roxa, folha de couve, espiga de milho, vagem, garrafa long-neck, mandioca, beterraba.
- [ ] Cada um com viewBox 0 0 64 64 (ou 96), usando padrão consistente (silhueta sólida + 1-2 sombras chapadas).
- [ ] Desenhar em Figma/Inkscape, exportar limpo, integrar no `Illustration.astro` como variants.

### Fase 4 — Aplicação criteriosa (1-2 dias)
- [ ] Hero da home — cena lateral grande (Storyset/unDraw), substitui ou complementa o gradiente atual.
- [ ] Empty states: "nenhum buteco em X", "nenhum comentário ainda", "buteco sem foto".
- [ ] Topo do footer — substituir `OrnamentBand` por uma faixa nova mais densa.
- [ ] Cards: opcional acento em ButecoCard quando não há foto (motivo brasileiro pequeno no canto).
- [ ] Sobre — uma ilustração no topo de cada seção, nem todas (escolha curatorial).

### Fase 5 — Limpeza
- [ ] Depreciar `OrnamentBand.astro` (manter no repo até a v1 do sistema novo estar estável; depois remover).
- [ ] Atualizar `sobre/#stack` com a referência à lib usada.
- [ ] Lighthouse antes/depois para garantir que RNF-0002 não regrediu.

## Como reverter

Se o resultado ficar genérico ou pesar performance:
- Remover os usos do `<Illustration />` das páginas.
- Reativar o `OrnamentBand` ou eliminar ornamentos completamente.
- Apagar `src/assets/illustrations/` e `src/components/ui/Illustration.astro`.
- Remover tokens `--illustration-*` de `tokens.css`.

Custo de reverter: ~1 hora.

## Referências

- Site oficial 2026 — observação de uso de ilustrações: ornamentos top/bottom, hero, footer.
- **Storyset** — https://storyset.com (atribuição grátis ou pago sem atribuição).
- **unDraw** — https://undraw.co (MIT-like, sem atribuição).
- **Open Peeps** — https://www.openpeeps.com (CC0, só pessoas hand-drawn).
- **Open Doodles** — https://www.opendoodles.com (CC0, hand-drawn abstrato).
- **Humaaans** — https://www.humaaans.com (CC0, pessoas modulares).
- **DrawKit free tier** — https://www.drawkit.com (algumas ilustrações free).
- **Manypixels Gallery** — https://www.manypixels.co/gallery (CC0).
- ADR-0002 — Design System inspirado em GOV.UK.
- ADR-0004 — Tokens de design Buteco Moderno.
- Commit `d4cf895` — primeira tentativa caseira (`OrnamentBand`), referência do que evitar.
