/**
 * Estilo de mapa "Buteco Moderno" — derivado dos tokens em src/styles/tokens.css.
 *
 * Source: OpenFreeMap (https://openfreemap.org) — vector tiles OSM, free, sem chave.
 * Schema: OpenMapTiles.
 *
 * Inspiração: Mapbox Light + GOV.UK minimalismo. Cada via tem técnica de
 * "casing" (linha de contorno escura embaixo + preenchimento claro em cima)
 * para legibilidade profissional. Cores derivadas dos tokens com tons
 * dessaturados — o vermelho urucum fica reservado pro marker, mapa é fundo.
 */

import type { StyleSpecification } from "maplibre-gl";

const C = {
  /* Base */
  bgLand: "#f5efe2",          /* cream warm — mais saturado que --bg-soft, contrasta com edifícios */
  bgWater: "#b8d4e6",         /* azul suave, não compete com marca */
  bgWaterway: "#9bc1d8",      /* rios mais escuros que mar */
  bgPark: "#d6e3c9",          /* verde dessaturado */
  bgPitch: "#cee0c1",         /* esporte/quadras */
  bgWood: "#cad9c0",
  bgSand: "#ece2bf",
  bgWetland: "#cfdacb",

  /* Edifícios */
  building: "#e8dec9",
  buildingBorder: "#d8c9a8",
  buildingResidential: "#ebe1cd",

  /* Vias — técnica de casing (outline + fill) */
  roadCasing: "#9b8d76",
  roadFill: "#ffffff",
  roadMinor: "#bdac8e",       /* minor: linha única sem casing */
  roadService: "#cfbf9f",
  motorwayCasing: "#7a6852",
  motorwayFill: "#fff7e0",    /* leve tom warm pra destacar das primárias */

  /* Texto */
  textStrong: "#1a1815",
  textMuted: "#5b554c",
  haloLight: "#f7f1e4",
  haloMuted: "rgba(247,241,228,0.85)",

  /* Bordas administrativas */
  boundaryState: "#a39785",
  boundaryCountry: "#5b554c",
};

export const butecoMapStyle: StyleSpecification = {
  version: 8,
  name: "buteco-moderno",
  metadata: {
    "buteco:designSystem": "ADR-0004",
    "buteco:source": "OpenFreeMap (OpenStreetMap)",
  },
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {
    openfreemap: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    },
  },
  sprite: undefined,
  layers: [
    /* ---------- Base ---------- */
    { id: "background", type: "background", paint: { "background-color": C.bgLand } },

    /* ---------- Landcover (parques, mata, areia, etc.) ---------- */
    {
      id: "lc-wood", type: "fill", source: "openfreemap", "source-layer": "landcover",
      filter: ["in", ["get", "class"], ["literal", ["wood", "forest"]]],
      paint: { "fill-color": C.bgWood, "fill-opacity": 0.9 },
    },
    {
      id: "lc-grass", type: "fill", source: "openfreemap", "source-layer": "landcover",
      filter: ["in", ["get", "class"], ["literal", ["grass", "scrub", "farmland", "meadow"]]],
      paint: { "fill-color": C.bgPark, "fill-opacity": 0.85 },
    },
    {
      id: "lc-sand", type: "fill", source: "openfreemap", "source-layer": "landcover",
      filter: ["==", ["get", "class"], "sand"],
      paint: { "fill-color": C.bgSand },
    },
    {
      id: "lc-wetland", type: "fill", source: "openfreemap", "source-layer": "landcover",
      filter: ["==", ["get", "class"], "wetland"],
      paint: { "fill-color": C.bgWetland, "fill-opacity": 0.9 },
    },

    /* ---------- Landuse específicos ---------- */
    {
      id: "lu-residential", type: "fill", source: "openfreemap", "source-layer": "landuse",
      filter: ["==", ["get", "class"], "residential"],
      paint: { "fill-color": C.bgLand, "fill-opacity": 0.6 },
    },
    {
      id: "park", type: "fill", source: "openfreemap", "source-layer": "park",
      paint: { "fill-color": C.bgPark, "fill-opacity": 0.9 },
    },
    {
      id: "park-outline", type: "line", source: "openfreemap", "source-layer": "park",
      paint: { "line-color": "#a8b89a", "line-width": 0.5, "line-opacity": 0.8 },
    },

    /* ---------- Água ---------- */
    {
      id: "water", type: "fill", source: "openfreemap", "source-layer": "water",
      paint: { "fill-color": C.bgWater },
    },
    {
      id: "waterway", type: "line", source: "openfreemap", "source-layer": "waterway",
      paint: {
        "line-color": C.bgWaterway,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 14, 2, 18, 4],
      },
    },

    /* ---------- Edifícios ---------- */
    {
      id: "building", type: "fill", source: "openfreemap", "source-layer": "building",
      minzoom: 13,
      paint: {
        "fill-color": C.building,
        "fill-outline-color": C.buildingBorder,
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 15, 0.8, 18, 0.95],
      },
    },

    /* ---------- VIAS — técnica de casing ----------
       Cada nível de via tem 2 camadas:
       1) -casing : linha mais larga, cor escura
       2) -fill   : linha mais estreita, cor clara — desenhada DEPOIS (em cima) */

    /* Service & paths — via única, fina */
    {
      id: "road-service", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["service", "track", "path"]]],
      minzoom: 14,
      paint: {
        "line-color": C.roadService,
        "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.5, 18, 2.5],
      },
    },

    /* Minor — sem casing, fica leve */
    {
      id: "road-minor", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "minor"],
      minzoom: 12,
      paint: {
        "line-color": C.roadMinor,
        "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.4, 18, 5],
      },
    },

    /* Tertiary — casing leve */
    {
      id: "road-tertiary-casing", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "tertiary"],
      minzoom: 11,
      paint: {
        "line-color": C.roadCasing,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.6, 18, 8],
      },
    },
    {
      id: "road-tertiary-fill", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "tertiary"],
      minzoom: 11,
      paint: {
        "line-color": C.roadFill,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.2, 18, 6],
      },
    },

    /* Secondary */
    {
      id: "road-secondary-casing", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "secondary"],
      minzoom: 10,
      paint: {
        "line-color": C.roadCasing,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.6, 18, 11],
      },
    },
    {
      id: "road-secondary-fill", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "secondary"],
      minzoom: 10,
      paint: {
        "line-color": C.roadFill,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.2, 18, 8],
      },
    },

    /* Primary & Trunk */
    {
      id: "road-primary-casing", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["primary", "trunk"]]],
      minzoom: 8,
      paint: {
        "line-color": C.roadCasing,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.8, 18, 14],
      },
    },
    {
      id: "road-primary-fill", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["primary", "trunk"]]],
      minzoom: 8,
      paint: {
        "line-color": C.roadFill,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.4, 18, 10],
      },
    },

    /* Motorway — fill com tom warm pra distinguir sem agredir */
    {
      id: "road-motorway-casing", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "motorway"],
      minzoom: 6,
      paint: {
        "line-color": C.motorwayCasing,
        "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.8, 18, 18],
      },
    },
    {
      id: "road-motorway-fill", type: "line", source: "openfreemap", "source-layer": "transportation",
      filter: ["==", ["get", "class"], "motorway"],
      minzoom: 6,
      paint: {
        "line-color": C.motorwayFill,
        "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.4, 18, 14],
      },
    },

    /* ---------- Bordas administrativas ---------- */
    {
      id: "boundary-state", type: "line", source: "openfreemap", "source-layer": "boundary",
      filter: ["==", ["get", "admin_level"], 4],
      paint: {
        "line-color": C.boundaryState,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 10, 1.2],
        "line-dasharray": [3, 2],
      },
    },
    {
      id: "boundary-country", type: "line", source: "openfreemap", "source-layer": "boundary",
      filter: ["==", ["get", "admin_level"], 2],
      paint: {
        "line-color": C.boundaryCountry,
        "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.6, 10, 2],
      },
    },

    /* ---------- Labels ---------- */

    /* Nomes de via grandes — texto seguindo a linha */
    {
      id: "road-name-major", type: "symbol", source: "openfreemap", "source-layer": "transportation_name",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]],
      minzoom: 13,
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name:pt"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 13, 10, 18, 13],
        "text-letter-spacing": 0.02,
      },
      paint: {
        "text-color": C.textMuted,
        "text-halo-color": C.haloLight,
        "text-halo-width": 1.5,
      },
    },
    {
      id: "road-name-minor", type: "symbol", source: "openfreemap", "source-layer": "transportation_name",
      filter: ["in", ["get", "class"], ["literal", ["tertiary", "minor"]]],
      minzoom: 15,
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name:pt"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
      },
      paint: {
        "text-color": C.textMuted,
        "text-halo-color": C.haloLight,
        "text-halo-width": 1.2,
      },
    },

    /* Nome de água */
    {
      id: "water-name", type: "symbol", source: "openfreemap", "source-layer": "water_name",
      layout: {
        "text-field": ["coalesce", ["get", "name:pt"], ["get", "name"]],
        "text-font": ["Noto Sans Italic"],
        "text-size": 11,
      },
      paint: {
        "text-color": "#3a6c84",
        "text-halo-color": C.haloMuted,
        "text-halo-width": 1.2,
      },
    },

    /* Nome de bairro/suburb */
    {
      id: "place-suburb", type: "symbol", source: "openfreemap", "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["suburb", "neighbourhood", "quarter"]]],
      minzoom: 12,
      layout: {
        "text-field": ["coalesce", ["get", "name:pt"], ["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 10, 16, 13],
        "text-letter-spacing": 0.06,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": C.textMuted,
        "text-halo-color": C.haloLight,
        "text-halo-width": 1.5,
      },
    },

    /* Nome de cidade — destaque maior */
    {
      id: "place-city", type: "symbol", source: "openfreemap", "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["city", "town"]]],
      maxzoom: 14,
      layout: {
        "text-field": ["coalesce", ["get", "name:pt"], ["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 5, 11, 14, 18],
      },
      paint: {
        "text-color": C.textStrong,
        "text-halo-color": C.haloLight,
        "text-halo-width": 1.8,
      },
    },
  ],
};
