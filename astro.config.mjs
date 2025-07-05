// @ts-check
import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins:
      viteStaticCopy({
        targets: [
          {
            src: './content/**/*.png',
            dest: 'assets/blog/'
          },
          {
            src: './content/**/*.gif',
            dest: 'assets/blog/'
          }
        ]
      })
  }
});