import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      // Logic modules and shared UI helpers. Visual sections are verified by the build and visual review.
      include: [
        'src/config/**',
        'src/i18n/metadata.ts',
        'src/app/sitemap.ts',
        'src/components/ui/MockupImage.tsx',
        'src/components/ui/useIntersectionObserver.ts',
        'src/components/LanguageSwitcher.tsx',
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
