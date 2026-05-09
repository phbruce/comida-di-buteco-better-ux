// @ts-check
import { defineConfig } from 'astro/config';

// Base path: o repositório é servido por GitHub Pages em
// https://phbruce.github.io/Comida-di-Buteco-Better-UX/. Para builds com
// custom domain, exporte BASE_PATH="" antes de `npm run build`.
//
// IMPORTANTE: GH Pages é CASE-SENSITIVE no path do repo. O case aqui precisa
// bater com o nome real do repositório no GitHub.
const BASE = process.env.BASE_PATH ?? '/Comida-di-Buteco-Better-UX';
const SITE = process.env.SITE_URL ?? 'https://phbruce.github.io';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
    assets: '_astro',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
