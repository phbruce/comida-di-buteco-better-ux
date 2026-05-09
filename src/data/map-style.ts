/**
 * Estilo de mapa "Buteco Moderno" — derivado dos tokens em src/styles/tokens.css.
 *
 * Source: OpenFreeMap (https://openfreemap.org) — vector tiles OSM, free, sem chave.
 * Schema: OpenMapTiles.
 *
 * Para mudar cores, ajuste os tokens. Estes valores espelham docs/adr/ADR-0004.
 */

import type { StyleSpecification } from "maplibre-gl";

const COLORS = {
  canvas: "#ffffff",
  soft: "#faf6ee",
  surface: "#fbf7f0",
  border: "#cfc6b5",
  textMuted: "#5b554c",
  textStrong: "#1a1815",
  brandPrimary: "#9c2a1b",
  brandSecondary: "#1f6f4a",
  brandAccent: "#f4b400",
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
    {
      id: "background",
      type: "background",
      paint: { "background-color": COLORS.soft },
    },
    {
      id: "park",
      type: "fill",
      source: "openfreemap",
      "source-layer": "park",
      paint: {
        "fill-color": COLORS.brandSecondary,
        "fill-opacity": 0.12,
      },
    },
    {
      id: "landcover-grass",
      type: "fill",
      source: "openfreemap",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "grass"],
      paint: {
        "fill-color": COLORS.brandSecondary,
        "fill-opacity": 0.08,
      },
    },
    {
      id: "water",
      type: "fill",
      source: "openfreemap",
      "source-layer": "water",
      paint: {
        "fill-color": "#cdd9e6",
      },
    },
    {
      id: "waterway",
      type: "line",
      source: "openfreemap",
      "source-layer": "waterway",
      paint: {
        "line-color": "#9bb1c8",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 14, 1.5],
      },
    },
    {
      id: "buildings",
      type: "fill",
      source: "openfreemap",
      "source-layer": "building",
      minzoom: 14,
      paint: {
        "fill-color": COLORS.surface,
        "fill-outline-color": COLORS.border,
        "fill-opacity": 0.7,
      },
    },
    {
      id: "roads-minor",
      type: "line",
      source: "openfreemap",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["minor", "service", "path", "track"]]],
      minzoom: 13,
      paint: {
        "line-color": COLORS.border,
        "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0.5, 18, 2],
      },
    },
    {
      id: "roads-tertiary",
      type: "line",
      source: "openfreemap",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "tertiary"],
      paint: {
        "line-color": COLORS.border,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.5, 18, 3],
      },
    },
    {
      id: "roads-secondary",
      type: "line",
      source: "openfreemap",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "secondary"],
      paint: {
        "line-color": COLORS.textMuted,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 18, 4],
      },
    },
    {
      id: "roads-primary",
      type: "line",
      source: "openfreemap",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["primary", "trunk"]]],
      paint: {
        "line-color": COLORS.textMuted,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 18, 5],
      },
    },
    {
      id: "roads-motorway",
      type: "line",
      source: "openfreemap",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "motorway"],
      paint: {
        "line-color": COLORS.brandPrimary,
        "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.5, 18, 6],
      },
    },
    {
      id: "boundary-state",
      type: "line",
      source: "openfreemap",
      "source-layer": "boundary",
      filter: ["==", ["get", "admin_level"], 4],
      paint: {
        "line-color": COLORS.border,
        "line-width": 1,
        "line-dasharray": [2, 2],
      },
    },
    {
      id: "place-city",
      type: "symbol",
      source: "openfreemap",
      "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["city", "town"]]],
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 6, 11, 14, 16],
        "text-anchor": "center",
      },
      paint: {
        "text-color": COLORS.textStrong,
        "text-halo-color": COLORS.canvas,
        "text-halo-width": 1.5,
      },
    },
    {
      id: "place-suburb",
      type: "symbol",
      source: "openfreemap",
      "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["suburb", "neighbourhood"]]],
      minzoom: 12,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 11,
        "text-anchor": "center",
        "text-letter-spacing": 0.05,
      },
      paint: {
        "text-color": COLORS.textMuted,
        "text-halo-color": COLORS.canvas,
        "text-halo-width": 1.2,
      },
    },
    {
      id: "road-name-major",
      type: "symbol",
      source: "openfreemap",
      "source-layer": "transportation_name",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]],
      minzoom: 13,
      layout: {
        "symbol-placement": "line",
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 11,
      },
      paint: {
        "text-color": COLORS.textMuted,
        "text-halo-color": COLORS.canvas,
        "text-halo-width": 1.2,
      },
    },
  ],
};
