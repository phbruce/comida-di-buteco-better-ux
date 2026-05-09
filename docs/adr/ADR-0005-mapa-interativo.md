# ADR-0005 — Mapa interativo com design customizado

- **Status:** SUPERSEDED por [ADR-0009](./ADR-0009-mapa-google.md) em 2026-05-09
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 — opção A)
- **Motivo da substituição:** o resultado visual do MapLibre + OpenFreeMap (mesmo após redesign com casing) não agradou. Trocado por Google Maps Embed.
- **RFs/RNFs relacionados:** RF-0001 (listagem), RF-0003 (detalhe do buteco), RF-0004 (seleção de cidade), RNF-0001 (acessibilidade), RNF-0002 (performance), RNF-0005 (privacidade/segurança — chamadas a terceiros)

## Contexto

O dono do produto pediu integração com mapa, **com design customizado usando nosso design system**. Hoje o site tem apenas o link "Como chegar (Google Maps)" no detalhe do buteco — funcional, acessível e zero custo, mas sem visualização espacial.

Casos de uso plausíveis:

1. **Detalhe do buteco** — pequeno mapa estático/interativo mostrando a localização exata (substitui o "como chegar" puro).
2. **Listagem da cidade** — mapa com pins de todos os butecos para escolher por proximidade (RF-0001).
3. **Seleção de cidade** — mapa do Brasil com cidades participantes destacadas (RF-0004).

Restrições duras:

- **Site é estático em GitHub Pages** (ADR-0003) — sem backend para proxy de chave API.
- **Mobile-first em 4G** — qualquer JS pesado ameaça LCP ≤ 2,5s (RNF-0002).
- **WCAG 2.2 AA** — mapas interativos historicamente são o ponto fraco de a11y; precisa fallback textual e navegação por teclado.
- **Privacidade** — terceiros podem rastrear o usuário antes de consentimento (RNF-0005).
- **Sem orçamento dedicado** — projeto é redesign não oficial, exploratório.
- **Coordenadas dos butecos** — o site oficial não publica lat/long; precisamos derivar via geocoding do endereço (também limitado por quotas em todos provedores).

## Decisão (proposta)

**Recomendação principal: implementar mapa apenas no detalhe do buteco e usar MapLibre GL JS + Protomaps (vector tiles auto-hospedados ou via CDN free), com estilo próprio derivado dos tokens do design system. Geocoding em build-time (não em runtime), respeitando termos de uso do provedor.**

Concretamente:

1. **Apenas detalhe do buteco na v1.** Mapa de listagem e cidade ficam para fase posterior (decisão separada por ADR), pois multiplicam o custo e a superfície de a11y/performance.
2. **MapLibre GL JS** (fork open source do Mapbox GL antes da licença comercial) — JS de ~250KB gzip, mas carregado **lazy** (só quando o usuário rola até o card "Onde fica" ou clica em "ver mapa").
3. **Protomaps** — provedor de vector tiles que oferece arquivos `.pmtiles` que podem ser hospedados no próprio repo (sem chamada a terceiro!) ou consumidos do CDN público gratuito até 50k carregamentos/mês.
4. **Estilo customizado** derivado de `tokens.css`:
   - Água: `--color-bg-soft`
   - Terra: `--color-bg-canvas`
   - Vias secundárias: `--color-border`
   - Vias principais: `--color-text-muted`
   - Texto: `--color-text-strong`
   - Pin do buteco: `--color-brand-primary` com sombra suave
   - Foco do pin: anel `--color-focus-ring`
5. **Geocoding em build-time** com Nominatim (OpenStreetMap, free, com rate limit de 1 req/s e User-Agent identificável). Resultado é **commitado** no repo (`src/data/geocodes.json`), nunca chamado em runtime.
6. **Fallback textual sempre presente.** O mapa é uma camada visual sobre o endereço já listado. Sem JS / com `prefers-reduced-motion: reduce` extremo / com leitor de tela: o usuário continua vendo endereço + link "Como chegar" inalterados.
7. **Sem cookies, sem rastreamento.** Tiles servidos sem identificadores de sessão.

## Alternativas consideradas

### Alternativa A — Google Maps JS API com Styled Map
- **Prós:** ecossistema enorme, dados de POI ricos, geocoding integrado.
- **Contras:**
  - Exige **chave de API** exposta no site estático (precisa restringir por origem; não é segredo).
  - Free tier limitado a $200/mês de crédito; depois é cobrado por carregamento.
  - Styled Map permite recolorir camadas, **mas não tudo** — estilo fica menos "nosso".
  - Carrega ~150KB JS + tiles raster por domínio googleapis.
  - Cookies/identificação do usuário (privacidade).
  - A11y do widget melhorou nos últimos anos, ainda assim precisa adaptação.
- **Por que não como primeira opção:** o pedido foi explícito por "design customizado **usando nosso design system**". Google Maps limita o quanto se pode customizar.

### Alternativa B — Mapbox GL JS
- **Prós:** customização de estilo via JSON, qualidade altíssima.
- **Contras:**
  - Licença não-OSS desde 2.0 (a partir de 2020). Aceitável para uso comercial pago, mas estranho para redesign exploratório.
  - Free tier 50k loads/mês depois cobra.
  - Mesma exposição de chave que Google.
- **Por que não:** MapLibre (fork OSS pré-mudança de licença) cobre 95% dos casos sem essas amarras.

### Alternativa C — MapLibre GL JS + Protomaps (proposta principal)
- **Prós:**
  - Open source (BSD), zero royalty.
  - Vector tiles permitem **estilo 100% controlado** (exatamente o que o pedido exige).
  - Protomaps `.pmtiles` pode ser hospedado **localmente no GH Pages**, eliminando dependência de terceiros.
  - Sem cookies, sem rastreamento.
  - Bundle ~250KB gzip — pesado, mas carregado lazy.
- **Contras:**
  - Mais trabalho inicial (gerar style JSON, escolher área de tiles).
  - Tile do mundo todo é grande (~80GB). Para v1, podemos hospedar tiles **só do Brasil** (~5GB) ou ainda menor (apenas as cidades participantes, ~500MB), ou usar o CDN gratuito do Protomaps.
- **Por que sim:** alinha "design system customizado", privacidade-by-default, custo zero.

### Alternativa D — Leaflet + tiles raster OSM
- **Prós:** simples, leve (~40KB), API estável.
- **Contras:** tiles raster são imagens prontas — para "design customizado" você precisa rodar um servidor de tiles próprio, complexo e caro. Tiles OSM padrão são funcionais mas genéricos, não nosso.
- **Por que não:** não atende "usando nosso design system".

### Alternativa E — Static Map (imagem PNG renderizada em build)
- **Prós:** zero JS, zero custo runtime, performance perfeita, a11y trivial (é uma imagem).
- **Contras:** sem interação (zoom, pan, descoberta).
- **Por que não como única opção:** boa para detalhe do buteco como fallback ou versão "lite", não substitui mapa interativo da listagem se a gente algum dia quiser.
- **Considerar como fallback:** servir static map como `<noscript>` e quando o JS do mapa falhar.

### Alternativa F — Não implementar mapa agora
- **Prós:** zero custo de implementação, mantém RNF-0002 confortável.
- **Contras:** não atende o pedido.
- **Quando faz sentido:** se o teste com usuários (Fase 5) mostrar que ninguém usa mapa, voltamos para esta opção.

## Consequências

### Positivas
- Mapa "nosso" — cada cor é token do design system.
- Sem terceiro essencial — pode rodar 100% offline-friendly.
- Carrega só quando precisa, sem ferir LCP.

### Custos aceitos
- +250KB gzip de JS quando o mapa é interativo (lazy).
- Trabalho inicial não-trivial: estilo, geocoding, hospedagem de tiles.
- Geocoding em build pode falhar para endereços ambíguos — precisa fallback (mostra só "como chegar" sem mapa).

### Neutras
- Substituir provedor de tiles é um arquivo JSON (style) + URL — não precisa refatorar.

## Plano de implementação (após ACCEPTED)

- [ ] **ADR-0005a** opcional: definir provider de geocoding (Nominatim vs. paid).
- [ ] Build-time: script `scripts/geocode.mjs` que lê `butecos.json`, consulta provider, escreve `src/data/geocodes.json`, com fallback graceful para endereços não encontrados.
- [ ] Componente `<Map />` Astro, dynamic import de MapLibre, lazy via `IntersectionObserver` (carrega quando vira visível).
- [ ] Style JSON em `src/data/map-style.json` derivando dos tokens.
- [ ] Marker custom desenhado em SVG inline com `--color-brand-primary`.
- [ ] Fallback: enquanto JS não carrega, mostrar imagem static placeholder com endereço por baixo.
- [ ] Atributo `aria-label` no container, instrução para usuários de teclado, botões "+/−" alternativos visíveis.
- [ ] Adicionar a opção `Mostrar mapa` (toggle) — usuário só vê o mapa se quiser, ainda mais respeitoso de performance e bateria.
- [ ] Atualizar RNF-0002 para considerar custo do mapa (excluir da rota inicial).

## Como reverter

- Componente `<Map />` é isolado num único arquivo. Remover ou trocar por static image é trivial.
- Tiles e estilo são arquivos versionados — qualquer mudança vira commit.

## Referências

- MapLibre — https://maplibre.org/
- Protomaps — https://protomaps.com/
- Nominatim usage policy — https://operations.osmfoundation.org/policies/nominatim/
- Comparativo de provedores OSS — https://wiki.openstreetmap.org/wiki/Tile_servers
- A11y de mapas — https://www.w3.org/WAI/RD/2012/maps/
