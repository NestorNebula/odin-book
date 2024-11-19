import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.js',
  },
  resolve: {
    alias: {
      '@': './src',
      '@actions': './src/actions',
      '@assets': './src/assets',
      '@components': './src/components',
      '@hooks': './src/hooks',
      '@loaders': './src/loaders',
      '@pages': './src/pages',
      '@routes': './src/routes',
      '@services': './src/services',
    },
  },
});
