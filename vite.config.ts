import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const virtualSiteId = 'virtual:site-config';
  const resolvedVirtualSiteId = '\0' + virtualSiteId;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'load-public-site-json',
        resolveId(id: string) {
          if (id === virtualSiteId) {
            return resolvedVirtualSiteId;
          }
          return null;
        },
        load(id: string) {
          if (id === resolvedVirtualSiteId) {
            const siteJsonPath = path.resolve(__dirname, 'public/site.json');
            const raw = fs.readFileSync(siteJsonPath, 'utf-8');
            // Validate JSON at build time so syntax errors fail fast.
            JSON.parse(raw);
            return `export default ${raw};`;
          }
          return null;
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
