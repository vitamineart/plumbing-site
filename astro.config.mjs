import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pro-plumbing-site.netlify.app',
  integrations: [sitemap()],
  output: 'static',
});
