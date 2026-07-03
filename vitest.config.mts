import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    server: {
      deps: {
        // next-intl importe next/server.js & next/navigation.js via l'exports map
        inline: ['next-intl', 'next'],
      },
    },
  },
});
