import { vi } from 'vitest';

type Listener = (e: { matches: boolean }) => void;

/**
 * Replaces window.matchMedia with one whose answers come from `matches(query)` and whose
 * change listeners can be fired with `emit`. Restore with the returned `restore()`.
 */
export function mockMatchMedia(matches: (query: string) => boolean) {
  const original = window.matchMedia;
  const listeners = new Map<string, Set<Listener>>();
  window.matchMedia = vi.fn((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_type: string, cb: Listener) => {
      if (!listeners.has(query)) listeners.set(query, new Set());
      listeners.get(query)!.add(cb);
    },
    removeEventListener: (_type: string, cb: Listener) => {
      listeners.get(query)?.delete(cb);
    },
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;

  return {
    listenerCount: (query: string) => listeners.get(query)?.size ?? 0,
    emit(query: string, value: boolean) {
      listeners.get(query)?.forEach((cb) => cb({ matches: value }));
    },
    restore() {
      window.matchMedia = original;
    },
  };
}
