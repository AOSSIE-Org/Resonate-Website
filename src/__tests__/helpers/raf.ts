import { vi } from 'vitest';

/**
 * Replaces requestAnimationFrame with a manual queue so animation frames run only when a
 * test flushes them. Call inside a test (or beforeEach); `vi.unstubAllGlobals()` restores it.
 */
export function installRaf() {
  const queue = new Map<number, FrameRequestCallback>();
  let nextId = 0;
  const cancelAnimationFrame = vi.fn((id: number) => {
    queue.delete(id);
  });
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    nextId += 1;
    queue.set(nextId, cb);
    return nextId;
  });
  vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame);

  return {
    cancelAnimationFrame,
    get pending() {
      return queue.size;
    },
    /** Runs the frames queued so far (frames they request wait for the next flush). */
    flush(time = performance.now()) {
      const frames = [...queue.values()];
      queue.clear();
      frames.forEach((cb) => cb(time));
      return frames.length;
    },
    /** Flushes until no frame is queued, up to `max` rounds. */
    flushAll(max = 500) {
      let rounds = 0;
      while (queue.size && rounds < max) {
        this.flush();
        rounds += 1;
      }
      return rounds;
    },
  };
}

/** Sets a read-only window/element metric (scrollY, innerWidth, offsetTop...) for a test. */
export function setProp<T extends object>(target: T, key: string, value: unknown) {
  Object.defineProperty(target, key, { configurable: true, writable: true, value });
}
