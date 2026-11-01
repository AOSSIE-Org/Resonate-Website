import { vi } from 'vitest';

/**
 * State behind the `next/navigation` mock in setup.ts. jsdom has no Next.js app router,
 * so tests set the current path and search params here and assert on the router spies.
 */
export const navigation = {
  /** Path including the locale prefix, as Next.js reports it (e.g. `/hi/support`). */
  pathname: '/en',
  searchParams: new URLSearchParams(),
  router: {
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  },
};

export function resetNavigation() {
  navigation.pathname = '/en';
  navigation.searchParams = new URLSearchParams();
  Object.values(navigation.router).forEach((fn) => fn.mockReset());
}
