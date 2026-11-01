import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { fireEvent, render } from '@testing-library/react';
import { MockIntersectionObserver, MockResizeObserver, setIntersecting, triggerResize } from './helpers/observers';
import { installRaf, setProp } from './helpers/raf';
import { createMockContext2D, type MockContext2D } from './helpers/canvas';
import BackgroundTile from '@/components/ui/BackgroundTile';

const W = 600;
const H = 200;

let raf: ReturnType<typeof installRaf>;
let ctx: MockContext2D;
const getContext = HTMLCanvasElement.prototype.getContext;

beforeEach(() => {
  raf = installRaf();
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
  ctx = createMockContext2D();
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ctx) as unknown as typeof getContext;
  setProp(HTMLCanvasElement.prototype, 'offsetWidth', W);
  setProp(HTMLCanvasElement.prototype, 'offsetHeight', H);
  setProp(window, 'devicePixelRatio', 2);
  setProp(window, 'scrollY', 0);
});
afterEach(() => {
  vi.useRealTimers();
  HTMLCanvasElement.prototype.getContext = getContext;
  delete (HTMLCanvasElement.prototype as unknown as Record<string, unknown>).offsetWidth;
  delete (HTMLCanvasElement.prototype as unknown as Record<string, unknown>).offsetHeight;
  document.documentElement.className = '';
  document.documentElement.removeAttribute('lang');
  document.documentElement.style.removeProperty('--line-color');
});

/** MutationObserver callbacks run as microtasks. */
const flushMutations = async () => {
  await Promise.resolve();
  await Promise.resolve();
};
const strokes = () => ctx.stroke.mock.calls.length;
/** y of every point on the last drawn wave. */
const lastWaveYs = () => {
  const n = 25; // 4N + 1 points with N = 6, so 24 curves per wave
  return ctx.bezierCurveTo.mock.calls.slice(-(n - 1)).map((c) => c[5] as number);
};

describe('BackgroundTile', () => {
  it('renders a rounded tile with a canvas that fills it', () => {
    const { container } = render(<BackgroundTile />);
    const tile = container.firstElementChild as HTMLElement;
    expect(tile.style.borderRadius).toBe('24px');
    expect(tile.style.overflow).toBe('hidden');
    const canvas = tile.querySelector('canvas')!;
    expect(canvas.style.position).toBe('absolute');
    expect(canvas.style.width).toBe('100%');
  });

  it('sizes the canvas for the device pixel ratio and draws a flat line at rest', () => {
    document.documentElement.style.setProperty('--line-color', 'rgb(1, 2, 3)');
    const { container } = render(<BackgroundTile />);
    const canvas = container.querySelector('canvas')!;
    expect(canvas.width).toBe(W * 2);
    expect(canvas.height).toBe(H * 2);
    expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
    expect(strokes()).toBe(1);
    expect(ctx.lineWidth).toBe(14);
    expect(new Set(lastWaveYs())).toEqual(new Set([H / 2]));
    expect(ctx.gradient.addColorStop).toHaveBeenCalledWith(0.12, 'rgb(1, 2, 3)');
    expect(ctx.gradient.addColorStop).toHaveBeenCalledWith(0, 'transparent');
  });

  it('falls back to a pixel ratio of 1', () => {
    setProp(window, 'devicePixelRatio', 0);
    const { container } = render(<BackgroundTile />);
    expect(container.querySelector('canvas')!.width).toBe(W);
  });

  it('does nothing without a 2D context', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as unknown as typeof getContext;
    render(<BackgroundTile />);
    expect(MockResizeObserver.instances).toHaveLength(0);
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it('redraws in the new line colour when the theme changes', async () => {
    render(<BackgroundTile />);
    document.documentElement.style.setProperty('--line-color', 'rgb(9, 9, 9)');
    document.documentElement.className = 'dark';
    await flushMutations();
    expect(strokes()).toBe(2);
    expect(ctx.gradient.addColorStop).toHaveBeenLastCalledWith(1, 'transparent');
    expect(ctx.gradient.addColorStop).toHaveBeenCalledWith(0.12, 'rgb(9, 9, 9)');
    // Unrelated attribute changes do not redraw
    document.documentElement.setAttribute('lang', 'hi');
    await flushMutations();
    expect(strokes()).toBe(2);
  });

  it('resizes the canvas from ResizeObserver entries', () => {
    const { container } = render(<BackgroundTile />);
    triggerResize({ width: 300, height: 100 });
    expect(container.querySelector('canvas')!.width).toBe(600);
    expect(strokes()).toBe(2);
    triggerResize();
    expect(strokes()).toBe(3);
  });

  it('ignores scrolling while off screen', () => {
    render(<BackgroundTile />);
    fireEvent.wheel(window, { deltaY: 120 });
    setProp(window, 'scrollY', 300);
    fireEvent.scroll(window);
    expect(raf.pending).toBe(0);
  });

  it('undulates while the wheel turns, then comes to rest once it stops', () => {
    render(<BackgroundTile />);
    setIntersecting(true);
    fireEvent.wheel(window, { deltaY: 120 });
    expect(raf.pending).toBe(1);
    for (let i = 0; i < 5; i++) raf.flush();
    expect(lastWaveYs().some((y) => Math.abs(y - H / 2) > 1)).toBe(true);

    // The loop keeps running until 80ms after the last wheel event
    vi.advanceTimersByTime(80);
    const rounds = raf.flushAll();
    expect(rounds).toBeLessThan(500);
    expect(raf.pending).toBe(0);
    // At rest the wave holds its last shape: no more frames, no more drawing
    const drawn = strokes();
    vi.advanceTimersByTime(1000);
    raf.flush();
    expect(strokes()).toBe(drawn);
  });

  it('treats page scrolling as a medium swell, but not right after a wheel event', () => {
    render(<BackgroundTile />);
    setIntersecting(true);
    setProp(window, 'scrollY', 120);
    fireEvent.scroll(window);
    expect(raf.pending).toBe(1);
    raf.flush();
    raf.flush();
    const before = strokes();

    fireEvent.wheel(window, { deltaY: -60 });
    vi.advanceTimersByTime(50);
    setProp(window, 'scrollY', 60);
    fireEvent.scroll(window); // within 100ms of the wheel: the wheel's swell wins
    raf.flush();
    expect(strokes()).toBeGreaterThan(before);

    // Scroll events without movement only refresh the swell
    vi.advanceTimersByTime(200);
    fireEvent.scroll(window);
    raf.flush();
    vi.advanceTimersByTime(80);
    raf.flushAll();
    expect(raf.pending).toBe(0);
  });

  it('stops and cancels its frame when scrolled off screen', () => {
    render(<BackgroundTile />);
    setIntersecting(true);
    fireEvent.wheel(window, { deltaY: 120 });
    expect(raf.pending).toBe(1);
    setIntersecting(false);
    expect(raf.cancelAnimationFrame).toHaveBeenCalled();
    expect(raf.pending).toBe(0);
    // Going off screen with nothing queued is fine too
    setIntersecting(false);
    setIntersecting(true);
    expect(strokes()).toBeGreaterThan(1);
  });

  it('tears everything down on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<BackgroundTile />);
    setIntersecting(true);
    fireEvent.wheel(window, { deltaY: 120 });
    unmount();
    expect(raf.pending).toBe(0);
    expect(MockResizeObserver.instances[0].disconnected).toBe(true);
    expect(MockIntersectionObserver.instances[0].disconnected).toBe(true);
    expect(remove).toHaveBeenCalledWith('wheel', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('property: whatever the wheel and scroll input, the wave stays finite, evenly spaced and within its swell', () => {
    const input = fc.array(
      fc.oneof(
        fc.record({ kind: fc.constant('wheel' as const), deltaY: fc.integer({ min: -2000, max: 2000 }) }),
        fc.record({ kind: fc.constant('scroll' as const), y: fc.integer({ min: 0, max: 5000 }) }),
        fc.record({ kind: fc.constant('wait' as const), ms: fc.integer({ min: 0, max: 200 }) }),
      ),
      { maxLength: 15 },
    );
    fc.assert(
      fc.property(input, (events) => {
        ctx = createMockContext2D();
        const { unmount } = render(<BackgroundTile />);
        setIntersecting(true);
        for (const e of events) {
          if (e.kind === 'wheel') fireEvent.wheel(window, { deltaY: e.deltaY });
          else if (e.kind === 'scroll') {
            setProp(window, 'scrollY', e.y);
            fireEvent.scroll(window);
          } else vi.advanceTimersByTime(e.ms);
          raf.flush();
          const xs = ctx.bezierCurveTo.mock.calls.slice(-24).map((c) => c[4] as number);
          for (let i = 1; i < xs.length; i++) expect(xs[i] - xs[i - 1]).toBeCloseTo(W / 5, 6);
          for (const y of lastWaveYs()) {
            expect(Number.isFinite(y)).toBe(true);
            // Largest swell: amplitude 0.92 scaled by 0.95 around the middle
            expect(Math.abs(y - H / 2)).toBeLessThanOrEqual(0.92 * 0.95 * H + 1e-9);
          }
        }
        unmount();
      }),
      { numRuns: 40 },
    );
  });
});
