// @ts-check
import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    assetsInclude: ['content/**'],
    server: {
      watch: {
        ignored: ['!content/**']
      }
    },
    plugins:
      viteStaticCopy({
        targets: [
          {
            src: './content/**/*.png',
            dest: 'content/blog/'
          },
          {
            src: './content/**/*.gif',
            dest: 'content/blog/'
          },
          {
            src: './content/blog/**/*.md',
            dest: 'content/blog/'
          }
        ]
      })
  }
});