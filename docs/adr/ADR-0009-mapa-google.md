# ADR-0009 — Trocar mapa para Google Maps

- **Status:** ACCEPTED
- **Data:** 2026-05-09
- **Decisor(es):** Dono do produto (aprovado em 2026-05-09 — opção A: Embed via iframe)
- **Supersede:** ADR-0005 (MapLibre + Protomaps/OpenFreeMap)
- **RFs/RNFs relacionados:** RF-0003 (detalhe do buteco), RNF-0001 (a11y), RNF-0002 (performance), RNF-0005 (privacidade)

## Contexto

ADR-0005 escolheu MapLibre + OpenFreeMap por permitir **estilo 100% custom** alinhado ao DS, sem chave de API e sem rastreamento. Implementamos com técnica de casing e paleta dessaturada — mesmo assim o resultado ficou **visualmente abaixo do esperado** ("feio, ruim de ver"). O dono do produto pediu para usar **Google Maps**.

Esta proposta lista as variações de Google Maps com seus trade-offs e recomenda uma.

## Decisão (proposta)

**Recomendação principal: Google Maps Embed via `<iframe>`.** Sem chave de API, sem custo, familiar para o usuário final.

Concretamente:

```html
<iframe
  src="https://www.google.com/maps?q=<lat>,<lng>&z=16&output=embed"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Mapa de <nome do buteco>"
  width="100%" height="360"
  style="border: 0">
</iframe>
```

- Cada detalhe de buteco com `coords` (962 dos 987) usa esse iframe.
- Botão "Como chegar" continua abrindo `maps.google.com/...` em nova aba (deep-link nativo).
- Toggle "Mostrar mapa" mantido (lazy: só renderiza o iframe quando o usuário clica) — preserva privacidade até o consentimento.

## Consequências do trade-off principal: **privacidade** (RNF-0005)

Adotar Google Maps **introduz cookies de terceiros** e tracking de visitantes pelo Google, o que conflita parcialmente com RNF-0005. Mitigações:

- **Lazy load com toggle** (não carrega antes de clicar em "Mostrar mapa") — visitante consente implicitamente.
- **referrerpolicy="no-referrer-when-downgrade"** para não vazar URL completa.
- **Banner de aviso** dentro do toggle: "Ao mostrar o mapa, você carrega conteúdo do Google que pode usar cookies."
- **Sem `<script>` do Google** no caminho crítico — só o iframe quando solicitado.

Isso transforma a violação em **opt-in informado**, aceitável para um redesign não oficial.

## Alternativas consideradas

### Alternativa A — Google Maps Embed (`<iframe>`) — RECOMENDADA
- **Prós:**
  - **Sem chave** de API.
  - **Free**, sem limite prático para nosso volume.
  - Look familiar (a "tia da escola" sabe o que é).
  - Implementação trivial: 1 atributo `src`.
  - Dispensa MapLibre, geocodes.json continua sendo a fonte de coords.
- **Contras:**
  - **Sem customização** — é o estilo Google, não nosso DS.
  - **Cookies/tracking** do Google (mitigado por lazy + opt-in).
  - iframe pesa ~600KB quando carrega.

### Alternativa B — Google Maps JavaScript API com Styled Map
- **Prós:**
  - Customização parcial (recolorir camadas via JSON).
  - POIs ricos.
- **Contras:**
  - **Exige chave** exposta no client (precisa restringir por origem em `script-src` da CSP).
  - Free tier $200/mês de crédito; depois cobra ($7/1.000 carregamentos).
  - Bundle ~150KB.
  - Mesma questão de privacidade.
- **Por que não:** não atende o pedido "Google Maps simples"; setup operacional pesado para benefício marginal.

### Alternativa C — Manter MapLibre + investir em redesign
- **Prós:** zero terceiros, alinhado com nosso DS.
- **Contras:** visualmente o resultado já não agradou; mais ciclos de iteração.
- **Por que não:** dono do produto deu sinal claro "não gostei".

### Alternativa D — Mapa estático (PNG via Google Static Maps API)
- **Prós:** apenas uma imagem, sem JS, sem iframe.
- **Contras:** **exige chave** (Static Maps também é paga); sem interatividade (zoom/pan).
- **Por que não:** a chave reintroduz custo operacional.

### Alternativa E — Sem mapa, só "Como chegar"
- **Prós:** zero JS, zero terceiros, zero custo.
- **Contras:** perde a visualização espacial que justifica o componente.
- **Quando faria sentido:** se a privacidade for inegociável; vale relembrar como fallback se o iframe quebrar.

## Plano de implementação (após ACCEPTED)

- [ ] `Map.astro` reescrito para servir `<iframe>` do Google Maps.
- [ ] Toggle "Mostrar mapa" mantido; texto do aviso atualizado para mencionar privacidade do Google.
- [ ] Remover dependência `maplibre-gl` do `package.json` (~250KB a menos no bundle).
- [ ] Remover `src/data/map-style.ts` (não usado mais).
- [ ] Manter `src/data/geocodes.json` (lat/lng continuam essenciais).
- [ ] ADR-0005 marcado SUPERSEDED por ADR-0009.

## Como reverter

Voltar ao MapLibre é restaurar `Map.astro` e `map-style.ts` do git history e re-adicionar a dep.

## Referências

- Google Maps Embed (sem chave) — https://developers.google.com/maps/documentation/embed/embedding-map (a versão simples por URL `output=embed` é ainda mais leve)
- Google Maps Pricing — https://mapsplatform.google.com/pricing/
- ADR-0005 (anterior) — `./ADR-0005-mapa-interativo.md`
