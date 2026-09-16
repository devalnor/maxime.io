import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maxime.io',
  output: 'static',
  redirects: {
    '/missions': '/experience/'
  }
});
