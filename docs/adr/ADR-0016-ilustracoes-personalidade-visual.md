# ADR-0016 — Sistema de ilustrações decorativas (personalidade visual)

- **Status:** ACCEPTED (revisado em 2026-05-09 — direção pivotada de Storyset → silhuetas CC0 vegetais + restyling próprio)
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09)
- **Histórico de revisão:** v1 escolheu Storyset/unDraw como base; v2 (mesma data) pivotou para silhuetas CC0 de motivos vegetais (OpenClipart/SVG Repo) restilizadas, porque Storyset/unDraw têm cenas com pessoas e nada de comida brasileira — fora do tema "verduras / papel-recorte" do site oficial.
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

## Decisão (revisada v2) — Alternativa F: motivos vegetais próprios sobre silhuetas CC0

Adotar **biblioteca própria de motivos** (`pimenta`, `cebola roxa`, `milho`, `beterraba`, `mandioca`, `couve`, `alho`, `tomate`, `jiló`, `garrafa long-neck`) construída assim:

1. **Referência anatômica**: silhuetas CC0 de OpenClipart e SVG Repo (filtro CC0) usadas só como base de proporção e geometria — não vão pra produção como estão.
2. **Restyle paper-cut sharp**: cada motivo redesenhado com polígonos de retas (sem curvas), 15-25 vértices por shape, em camadas chapadas (silhueta principal → sombra/profundidade → highlight → detalhe pontual). Coerente com o DS GOV.UK + Buteco Moderno (ADR-0002, ADR-0004).
3. **Paleta nossa**: cores via tokens `--color-brand-primary` (urucum), `--color-brand-secondary` (lima), `--color-brand-accent` (dendê), além de variações pontuais documentadas (verde-folha mais claro, vinho mais escuro).
4. **Sistema componentizado**: `<Illustration kind="pimenta|cebola|milho|..." size="sm|md|lg" />` em `src/components/ui/Illustration.astro`, com `aria-hidden` por padrão (decorativo).
5. **Composições**: cenas próprias (band do footer, hero accent, empty state) construídas posicionando vários motivos — composição é nossa, motivos são nossos, anatomia inspirada em CC0.
6. **Aplicação restrita** — não ornamentar tudo. Pontos onde agregam:
   - Hero da home (cena lateral ou faixa).
   - Empty states (cidade sem butecos, busca sem resultados, comentários vazios).
   - Topo do footer (faixa decorativa).
   - Possível acento em cards sem foto.

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

### Alternativa B — Híbrido: lib profissional + acentos próprios — descartada na revisão v2

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

### Alternativa F — Motivos vegetais próprios sobre silhuetas CC0 — RECOMENDADA (revisão v2)

Construir biblioteca interna de motivos vegetais (pimenta, cebola roxa, milho, beterraba, mandioca, couve, alho, tomate, jiló, garrafa long-neck) usando SVGs CC0 públicos (OpenClipart, SVG Repo) **só como referência anatômica/proporção**. Cada motivo é redesenhado com polígonos de retas (15-25 vértices), em camadas chapadas, na paleta Buteco Moderno.

- **Prós:**
  - **Tema correto** (verduras/comida) — espelha o oficial.
  - **Identidade própria** — composição + restyling + paleta são nossos.
  - **CC0 sem atribuição** — uso comercial-safe.
  - **Coerente com DS sharp** — todos polígonos retos, sem curvas.
  - **Recolorível via tokens** — quando ADR-0004 evoluir, ilustrações acompanham.
  - **Performance ótima** — SVG inline curto por motivo (~1-3 KB cada).
- **Contras:**
  - **Investimento de desenho** — 6-10 motivos exigem 1-2 dias de modelagem cuidadosa, com iteração visual.
  - Cada motivo precisa "ler" como o vegetal correto (a primeira tentativa falhou nisso).
  - Sem cenas de pessoas — pra hero, podemos compor uma "mesa de buteco com pratos/garrafas/folhas" usando os motivos, ou aceitar que o hero fique sem personagens.
- **Por que sim:** combina tema correto + identidade própria + DS coerente. Substitui a Alternativa B descartada.

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

## Plano de implementação (revisado v2)

### Fase 1 — Modelagem dos motivos (iterativo)
- [ ] Listar 8 motivos prioritários: pimenta dedo-de-moça, cebola roxa, milho, beterraba, mandioca, couve (folha), alho, garrafa long-neck.
- [ ] Para cada motivo: olhar referência CC0 (OpenClipart/SVG Repo) só pra anatomia, depois desenhar à mão em SVG com 15-25 vértices por shape, em camadas (silhueta + sombra + highlight + detalhe).
- [ ] Salvar cada um em `src/assets/illustrations/<kind>.svg` com viewBox 0 0 64 64, fills usando tokens via `currentColor` ou `data-fill="primary|secondary|accent|deep"` com CSS resolvendo.
- [ ] Renderizar localmente (svglib → PNG) pra validar legibilidade antes de declarar pronto.

### Fase 2 — Tokens + componente
- [ ] Adicionar em `tokens.css`: `--illustration-deep` (urucum mais escuro), `--illustration-leaf` (verde mais claro), e aliases `--illustration-{primary|secondary|accent}` mapeando pros tokens de marca.
- [ ] Criar `src/components/ui/Illustration.astro` com props `kind`, `size` (sm 32px / md 64px / lg 128px), `aria-label?` (default decorativo).
- [ ] O componente importa o SVG correspondente e injeta classes que o CSS resolve com tokens.

### Fase 3 — Composições / cenas
- [ ] `IllustrationBand.astro` — faixa horizontal compondo 4-6 motivos espaçados (substitui o `OrnamentBand` da v1).
- [ ] `IllustrationScene.astro` (opcional) — agrupamento "mesa de buteco" pra hero da home: garrafa + prato + folha + pimenta posicionados.

### Fase 4 — Aplicação criteriosa
- [ ] Hero da home: scene ou band lateral, sem invadir o lede.
- [ ] Empty states: cidade sem butecos, busca vazia, comentários vazios.
- [ ] Topo do footer: band fina.
- [ ] Cards: acento sutil quando não há foto (TBD após Fase 3).

### Fase 5 — Limpeza
- [ ] Documentar a biblioteca em `docs/design-system/illustrations.md` (lista de motivos + tokens + uso).
- [ ] Lighthouse antes/depois pra garantir que RNF-0002 não regrediu.

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
