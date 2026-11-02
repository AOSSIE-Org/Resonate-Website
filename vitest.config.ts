import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    // Property tests render whole sections many times; leave room for slow CI runners and coverage.
    testTimeout: 30_000,
    server: {
      deps: {
        // Run next-intl through Vite so its imports of `next/navigation` resolve and pick up the test mock.
        inline: ['next-intl'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      // The whole application: every component, page, layout, hook, config and i18n module.
      include: ['src/**/*.{ts,tsx}'],
      // Only files with no runtime code to test are left out.
      exclude: [
        'src/**/*.d.ts', // type declarations only (e.g. src/types/social-share-button.d.ts)
        'src/__tests__/**', // the tests themselves and their helpers
      ],
      thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
