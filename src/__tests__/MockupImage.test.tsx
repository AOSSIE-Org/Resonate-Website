import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { act, render, renderHook } from '@testing-library/react';
import React from 'react';
import { MockupImage, getMockupSrcSet } from '@/components/ui/MockupImage';
import { useIntersectionObserver } from '@/components/ui/useIntersectionObserver';

const KNOWN = [
  '/assets/mockups/phone.webp',
  '/assets/mockups/phone_about.webp',
  '/assets/mockups/phone_metric.webp',
  '/assets/mockups/phone_features.webp',
  '/assets/mockups/hand.webp',
];

const srcSetUrls = (srcSet: string | null) => (srcSet ?? '').split(',').map((s) => s.trim().split(' ')[0]).filter(Boolean);
const publicFile = (url: string) => path.join(process.cwd(), 'public', url);

function renderImg(props: Partial<React.ComponentProps<typeof MockupImage>> = {}) {
  const { container } = render(
    <MockupImage src="/assets/mockups/phone_about.webp" alt="About screen" sizes="320px" {...props} />,
  );
  return container;
}

describe('MockupImage', () => {
  it('offers the generated width variants plus the original in srcSet', () => {
    const img = renderImg().querySelector('img')!;
    expect(img.getAttribute('srcset')).toBe(
      '/assets/mockups/phone_about-320.webp 320w, /assets/mockups/phone_about-480.webp 480w, /assets/mockups/phone_about.webp 714w',
    );
    expect(img.getAttribute('sizes')).toBe('320px');
  });

  it('every file referenced by any mockup srcSet exists in public/', () => {
    for (const src of KNOWN) {
      const img = renderImg({ src }).querySelector('img')!;
      for (const url of [src, ...srcSetUrls(img.getAttribute('srcset'))]) {
        expect(existsSync(publicFile(url)), url).toBe(true);
      }
    }
  });

  it('exposes the same srcSet for preload hints as the rendered img uses', () => {
    for (const src of KNOWN) {
      const img = renderImg({ src }).querySelector('img')!;
      expect(getMockupSrcSet(src)).toBe(img.getAttribute('srcset') ?? undefined);
    }
    expect(getMockupSrcSet('/assets/mockups/hand.webp')).toBe(
      '/assets/mockups/hand-480.webp 480w, /assets/mockups/hand.webp 607w',
    );
    expect(getMockupSrcSet('/unknown.webp')).toBeUndefined();
  });

  it('omits srcSet and sizes for images without variants', () => {
    const img = renderImg({ src: '/assets/mockups/phone.webp' }).querySelector('img')!;
    expect(img.hasAttribute('srcset')).toBe(false);
    expect(img.hasAttribute('sizes')).toBe(false);
  });

  it('loads lazily by default and eagerly with high priority for the LCP image', () => {
    expect(renderImg().querySelector('img')!.getAttribute('loading')).toBe('lazy');
    const lcp = renderImg({ priority: true }).querySelector('img')!;
    expect(lcp.getAttribute('loading')).toBe('eager');
    expect(lcp.getAttribute('fetchpriority')).toBe('high');
  });

  it('drops intrinsic size and fills the parent in fill mode', () => {
    const img = renderImg({ fill: true, width: 714, height: 1400 }).querySelector('img')!;
    expect(img.hasAttribute('width')).toBe(false);
    expect(img.className).toContain('absolute inset-0');
  });

  it('serves a 1px placeholder under placeholderMedia so hidden layouts download nothing', () => {
    const container = renderImg({ placeholderMedia: '(min-width: 1024px)' });
    const source = container.querySelector('picture > source')!;
    expect(source.getAttribute('media')).toBe('(min-width: 1024px)');
    expect(source.getAttribute('srcset')).toMatch(/^data:image\/gif;base64,/);
  });

  it('property: always renders exactly one img with the given alt text, whatever the options', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...KNOWN, '/unknown.webp'),
        fc.boolean(),
        fc.boolean(),
        fc.option(fc.constant('(max-width: 767px)'), { nil: undefined }),
        (src, fill, priority, placeholderMedia) => {
          const { container, unmount } = render(
            <MockupImage src={src} alt="Mockup" sizes="50vw" fill={fill} priority={priority} placeholderMedia={placeholderMedia} />,
          );
          const imgs = container.querySelectorAll('img');
          expect(imgs).toHaveLength(1);
          expect(imgs[0].getAttribute('alt')).toBe('Mockup');
          expect(container.querySelector('picture') !== null).toBe(placeholderMedia !== undefined);
          unmount();
        },
      ),
      { numRuns: 40 },
    );
  });
});

describe('useIntersectionObserver', () => {
  type Callback = (entries: Pick<IntersectionObserverEntry, 'isIntersecting'>[]) => void;
  let trigger: Callback = () => {};
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();

  function mockObserver() {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function (cb: Callback) {
        trigger = cb;
        return { observe, unobserve, disconnect };
      }),
    );
  }

  afterEach(() => {
    vi.unstubAllGlobals();
    [observe, unobserve, disconnect].forEach((m) => m.mockClear());
  });

  function Probe({ onState }: { onState: (visible: boolean) => void }) {
    const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();
    onState(isVisible);
    return <div ref={ref} />;
  }

  it('becomes visible on first intersection and stops observing the element', () => {
    mockObserver();
    const states: boolean[] = [];
    render(<Probe onState={(v) => states.push(v)} />);
    expect(observe).toHaveBeenCalledTimes(1);
    act(() => trigger([{ isIntersecting: false }]));
    expect(states.at(-1)).toBe(false);
    act(() => trigger([{ isIntersecting: true }]));
    expect(states.at(-1)).toBe(true);
    expect(unobserve).toHaveBeenCalled();
  });

  it('disconnects on unmount', () => {
    mockObserver();
    const { unmount } = render(<Probe onState={() => {}} />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('does not observe when no element is attached', () => {
    mockObserver();
    renderHook(() => useIntersectionObserver());
    expect(observe).not.toHaveBeenCalled();
  });
});
