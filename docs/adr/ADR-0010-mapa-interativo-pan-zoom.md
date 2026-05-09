# ADR-0010 — Mapa interativo: como destravar pan/zoom (proposta)

- **Status:** PROPOSED ⚠️ aguarda aprovação do dono do produto
- **Data:** 2026-05-09
- **Decisor(es):** —
- **Relacionado:** ADR-0009 (Google Maps Embed)
- **RFs/RNFs relacionados:** RF-0003, RNF-0001 (a11y), RNF-0002 (perf), RNF-0005 (privacidade)

## Contexto

ADR-0009 escolheu Google Maps Embed via URL `?q=lat,lng&output=embed` por ser **sem chave, sem custo**. Em uso real apareceu uma limitação: a URL `output=embed` (sem API key) **bloqueia pan/zoom de 1 dedo no mobile** — a interação é capada para "thumbnail with pegman". O usuário não consegue arrastar/explorar.

Para destravar a interatividade, precisamos mudar o provedor ou o formato.

## Decisão (proposta)

**Recomendação: Google Maps Embed API com chave** — mantém o look familiar do Google (que motivou ADR-0009), interatividade completa, free tier generoso (14.000 carregamentos/dia na Maps Embed API). Custo zero para volume previsto.

Mas há trade-off com o tempo de setup que você precisa fazer (~5–10 min mobile). Por isso listamos alternativas.

## Alternativas consideradas

### Alternativa A — Google Maps Embed API com chave (recomendada)
- **Prós:** look Google, **interativo de verdade** (pan, zoom, click em POIs), oficial.
- **Contras:** exige criar **API Key** no console.cloud.google.com (project + enable "Maps Embed API" + create credential + restringir a `phbruce.github.io`).
- **Setup mobile:** Safari/Chrome desktop é mais fácil que mobile (console do Google é pesado em mobile).
- **Custo:** free até 14k/dia na Maps Embed API; depois US$ 7/1000.
- **Implementação:** trocar URL para `https://www.google.com/maps/embed/v1/place?key=KEY&q=lat,lng&zoom=16&language=pt-BR`. Lê `PUBLIC_GOOGLE_MAPS_KEY` do env (mesmo padrão do Cusdis APP_ID).

### Alternativa B — OpenStreetMap embed iframe (sem chave, interativo)
- **Prós:** interativo de verdade, **zero setup**, **zero custo**, sem cookies do Google.
- **Contras:** look OSM (genérico, parecido com o que MapLibre dava antes — usuário já indicou que não gosta).
- **URL:** `https://www.openstreetmap.org/export/embed.html?bbox=<bbox>&marker=<lat>,<lng>&layer=mapnik`.
- **Quando faria sentido:** se você não quiser criar conta Google.

### Alternativa C — Manter `output=embed` + documentar "use 2 dedos"
- **Prós:** zero trabalho.
- **Contras:** UX ruim no mobile; muitos usuários não sabem do gesto de 2 dedos; dá impressão de bug.
- **Por que não:** essa é a queixa atual.

### Alternativa D — Mapbox / outro provedor pago
- **Contras:** todos exigem chave, e nenhum tem o look "Google" que motivou ADR-0009.

## Consequências

### Positivas (se A escolhida)
- Interatividade completa.
- Look Google familiar.
- Continua dentro do free tier.

### Custos aceitos (se A escolhida)
- Tempo único de setup da chave.
- Nova env var (`PUBLIC_GOOGLE_MAPS_KEY`) no workflow do GitHub Pages.
- Continua trazendo cookies do Google (mas isso já era o caso em ADR-0009 — toggle "Mostrar mapa" mitiga).

## Plano de implementação (após ACCEPTED)

### Se opção A (Google API com key)
- [ ] Você cria a chave no Google Cloud Console:
  1. Cria projeto.
  2. Ativa **Maps Embed API**.
  3. Cria credencial → **API Key**.
  4. Em "Restrições da chave": **HTTP referrers (websites)** → `phbruce.github.io/*`.
  5. Copia a chave.
- [ ] Você adiciona no `.github/workflows/deploy.yml`:
  ```yaml
  env:
    PUBLIC_GOOGLE_MAPS_KEY: <chave>
  ```
- [ ] Eu atualizo `Map.astro` para usar `maps/embed/v1/place?key=...`.

### Se opção B (OSM embed)
- [ ] Eu atualizo `Map.astro` para usar `openstreetmap.org/export/embed.html?...`. Sem env var, sem ação sua.

## Como reverter

Trocar URL do iframe. Mudança em 1 arquivo.

## Referências

- Maps Embed API — https://developers.google.com/maps/documentation/embed/get-started
- Pricing — https://mapsplatform.google.com/pricing/
- OSM export embed — https://wiki.openstreetmap.org/wiki/Export
