// @ts-check
import { defineConfig } from 'astro/config';

// Base path: o repositório é servido por GitHub Pages em
// https://phbruce.github.io/comida-di-buteco-better-ux/. Para builds com
// custom domain, exporte BASE_PATH="" antes de `npm run build`.
const BASE = process.env.BASE_PATH ?? '/comida-di-buteco-better-ux';
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
