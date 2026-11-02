import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { MockIntersectionObserver, MockResizeObserver, resetObservers } from './helpers/observers';
import { resetNavigation } from './helpers/navigation';
import { createMockContext2D } from './helpers/canvas';

// Mock matchMedia for jsdom environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom has no Next.js app router: `next/navigation` reads the state in helpers/navigation.ts.
// next-intl is inlined in vitest.config.ts so its own `next/navigation` imports see this mock too.
vi.mock('next/navigation', async () => {
  const { navigation } = await import('./helpers/navigation');
  return {
    usePathname: () => navigation.pathname,
    useRouter: () => navigation.router,
    useSearchParams: () => navigation.searchParams,
    useParams: () => ({}),
    redirect: vi.fn(),
    permanentRedirect: vi.fn(),
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND');
    }),
  };
});

// Observers jsdom does not implement; tests drive them through helpers/observers.ts.
Object.assign(globalThis, {
  IntersectionObserver: MockIntersectionObserver,
  ResizeObserver: MockResizeObserver,
});

// jsdom has no canvas backend: a recording 2D context stands in for it.
HTMLCanvasElement.prototype.getContext = vi.fn(function () {
  return createMockContext2D();
}) as unknown as HTMLCanvasElement['getContext'];

// jsdom does not implement scrolling.
const scrollTo = vi.fn();
window.scrollTo = scrollTo as unknown as typeof window.scrollTo;

afterEach(() => {
  scrollTo.mockClear();
  resetObservers();
  resetNavigation();
});
