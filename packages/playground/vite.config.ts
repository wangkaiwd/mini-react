import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import url from 'url';
import * as path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sppk/mini-react': path.resolve(__dirname, '../mini-react/index.ts')
    }
  }
});
