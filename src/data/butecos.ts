/**
 * Dados dos butecos da edição 2026 do concurso Comida di Buteco.
 *
 * Fonte: crawl polite (1 req/s, User-Agent identificável) do site oficial
 * https://comidadibuteco.com.br/, em 2026-05-09.
 *
 * Fotos: NÃO redistribuídas. Apenas hotlink para o servidor original
 * (cdb-static-files.s3.amazonaws.com), com atribuição visível e link de volta.
 *
 * Coordenadas: enriquecidas em build via Nominatim (OpenStreetMap), salvas
 * em ./geocodes.json. Esta camada de dados não importa rede em runtime.
 */

import dataset from "./butecos-edicao-2026.json";
import geocodes from "./geocodes.json";

export interface Endereco {
  raw: string;
  logradouro: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
}

export interface Buteco {
  slug: string;
  url: string;
  nome: string;
  prato: string;
  prato_descricao: string | null;
  foto: string | null;
  foto_srcset: string | null;
  foto_alt: string | null;
  fotografo: string | null;
  edicao_ano: number | null;
  endereco: Endereco | null;
  cidade: string;
  cidade_slug: string;
  bairro: string | null;
  uf: string | null;
  telefone: string | null;
  horario_raw: string | null;
  horario_lista: string[] | null;
  /** Adicionado por geocodes.json em build, opcional. */
  coords?: { lat: number; lng: number; method?: string } | null;
}

export interface Cidade {
  slug: string;
  nome: string;
  uf: string | null;
  total: number;
  popular: boolean;
}

interface Geocode {
  lat: number;
  lng: number;
  method?: string;
  display_name?: string;
}

const geo = geocodes as Record<string, Geocode | null>;

/** Lista canônica de butecos com coords (se geocoded). */
export const butecos: Buteco[] = (dataset.butecos as unknown as Buteco[]).map((b) => {
  const g = geo[b.slug];
  return g ? { ...b, coords: { lat: g.lat, lng: g.lng, method: g.method } } : b;
});

export const cidades: Cidade[] = dataset.cidades as Cidade[];

export const edicao = dataset.edicao;
export const atualizadoEm = dataset.atualizado_em;
export const fonte = dataset.fonte;

/** Lookups úteis. */
export function porCidade(cidadeSlug: string): Buteco[] {
  return butecos.filter((b) => b.cidade_slug === cidadeSlug);
}

export function porSlug(slug: string): Buteco | undefined {
  return butecos.find((b) => b.slug === slug);
}

/** Helpers de formatação. */
export function formatTelefone(t: string | null): string | null {
  if (!t) return null;
  const d = t.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return t;
}

export function tagsButeco(b: Buteco): string[] {
  const tags: string[] = [];
  if (b.bairro) tags.push(b.bairro);
  return tags;
}

export function fotoAltSintetico(b: Buteco): string {
  if (b.foto_alt) return b.foto_alt;
  return `Foto do prato ${b.prato} no buteco ${b.nome}`;
}

export function creditoFoto(b: Buteco): string {
  return b.fotografo
    ? `Foto: ${b.fotografo} / Comida di Buteco`
    : "Foto: Comida di Buteco";
}
