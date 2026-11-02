import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { act, fireEvent, render } from '@testing-library/react';
import { setIntersecting, triggerResize } from './helpers/observers';
import { installRaf, setProp } from './helpers/raf';
import { mockMatchMedia } from './helpers/matchMedia';
import { HeroVisuals } from '@/components/home/HeroVisuals';

const MOBILE = '(max-width: 1279px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

type Box = { top: number; height: number; left?: number; width?: number };

/** Gives an element a document position; its client rect follows window.scrollY like a real layout. */
function place(el: Element, { top, height, left = 0, width = 100 }: Box) {
  (el as HTMLElement).getBoundingClientRect = () => {
    const y = top - window.scrollY;
    return { top: y, bottom: y + height, left, right: left + width, height, width, x: left, y } as DOMRect;
  };
}

type Variant = {
  dock?: 'marquee' | 'hoverCue' | 'slot' | 'none';
  techHeading?: boolean;
  obstacles?: boolean;
};

/** The landing page around HeroVisuals: the sections and feature rows it measures. */
function Page({ dock = 'marquee', techHeading = true }: Variant) {
  return (
    <>
      <section id="section-hero">
        <HeroVisuals />
      </section>
      <section id="section-about" />
      <section id="section-metric">
        <p id="obstacle">stat</p>
        <h2 id="beside">beside the phone</h2>
        <a id="hidden-link">hidden</a>
      </section>
      <section id="section-features">
        <div id="features-top-row">{techHeading && <h3>tech</h3>}</div>
        {dock === 'marquee' && (
          <div id="features-marquee-row">
            <button>card</button>
          </div>
        )}
        {(dock === 'marquee' || dock === 'hoverCue') && <div id="features-hover-cue-row" />}
        {dock !== 'none' && <div id="features-phone-slot" />}
      </section>
    </>
  );
}

let raf: ReturnType<typeof installRaf>;
let media: ReturnType<typeof mockMatchMedia> | undefined;

beforeEach(() => {
  raf = installRaf();
  setProp(window, 'innerHeight', 900);
  setProp(window, 'innerWidth', 1600);
  setProp(window, 'scrollY', 0);
});
afterEach(() => {
  media?.restore();
  media = undefined;
});

function setup({ mobile = false, reduced = false, ...variant }: Variant & { mobile?: boolean; reduced?: boolean } = {}) {
  media = mockMatchMedia((q) => (q === MOBILE ? mobile : q === REDUCED ? reduced : false));
  const utils = render(<Page {...variant} />);
  const $ = (sel: string) => utils.container.querySelector(sel) as HTMLElement;
  const phone = $('.z-30');
  const hand = $('[style*="will-change: opacity"].relative');
  const screens = Array.from(phone.querySelectorAll<HTMLElement>(':scope > div > div'));

  // Document layout (px): hero 0-1000, about 1000-2000, metric 2000-3000, features from 3000
  place($('#section-hero'), { top: 0, height: 1000 });
  place($('#section-about'), { top: 1000, height: 1000 });
  place($('#section-metric'), { top: 2000, height: 1000 });
  place($('#section-features'), { top: 3000, height: 1500 });
  if (variant.obstacles !== false) {
    place($('#obstacle'), { top: 2600, height: 80, left: 700, width: 200 });
    place($('#beside'), { top: 2900, height: 80, left: 0, width: 100 });
  }
  if ($('#features-top-row h3')) place($('#features-top-row h3'), { top: 3100, height: 40 });
  if ($('#features-marquee-row button')) place($('#features-marquee-row button'), { top: 3800, height: 140 });
  if ($('#features-hover-cue-row')) place($('#features-hover-cue-row'), { top: 4000, height: 80 });
  if ($('#features-phone-slot')) place($('#features-phone-slot'), { top: 3100, height: 400 });
  setProp(phone, 'offsetTop', 300);
  setProp(phone, 'offsetHeight', 540);
  setProp(phone, 'offsetParent', null);
  const img = phone.querySelector('img')!;
  setProp(img, 'offsetLeft', 720);
  setProp(img, 'offsetWidth', 260);
  setProp(img, 'offsetParent', null);

  // Re-measure now that the layout exists, then draw the first frame
  fireEvent(window, new Event('resize'));
  raf.flush();
  return { ...utils, phone, hand, screens };
}

function scrollTo(y: number) {
  setProp(window, 'scrollY', y);
  fireEvent.scroll(window);
  raf.flush();
}

function pose(phone: HTMLElement) {
  const m = /^translate3d\((.+)px, (.+)px, 0\) rotate\((.+)deg\) scale\((.+)\)$/.exec(phone.style.transform)!;
  const [x, y, rotate, scale] = m.slice(1).map(Number);
  return { x, y, rotate, scale };
}

const opacities = (els: HTMLElement[]) => els.map((el) => Number(el.style.opacity));

describe('HeroVisuals markup', () => {
  it('renders the static phone for small screens and the hand-held phone for desktop', () => {
    const { container } = setup();
    const imgs = Array.from(container.querySelectorAll('img')).map((img) => img.getAttribute('alt'));
    expect(imgs).toEqual([
      'Resonate app interface',
      'Hand holding phone',
      'Resonate app interface',
      'About Resonate app interface',
      'Metric Resonate app interface',
      'Features Resonate app interface',
    ]);
  });

  it('preloads the hero phone and, for desktop only, the hand image', () => {
    setup();
    const preloads = Array.from(document.head.querySelectorAll('link[rel="preload"]'));
    expect(preloads.some((l) => l.getAttribute('href') === '/assets/mockups/phone.webp')).toBe(true);
    const hand = preloads.find((l) => l.getAttribute('imagesrcset')?.includes('hand-480.webp'));
    expect(hand?.getAttribute('media')).toBe('(min-width: 1280px)');
    expect(hand?.getAttribute('imagesizes')).toBe('480px');
  });
});

describe('HeroVisuals scroll animation', () => {
  it('does not animate on phones and tablets', () => {
    const { phone } = setup({ mobile: true });
    scrollTo(1500);
    expect(raf.pending).toBe(0);
    expect(phone.style.transform).toBe('translate3d(0, 0, 0) rotate(0deg) scale(1)');
  });

  it('starts animating when the window widens to desktop', () => {
    const { phone } = setup({ mobile: true });
    act(() => media!.emit(MOBILE, false));
    raf.flush();
    scrollTo(1200);
    expect(pose(phone).x).toBeGreaterThan(0);
  });

  it('shows the final pose without motion when reduced motion is preferred', () => {
    const { phone, hand } = setup({ reduced: true });
    expect(hand.style.opacity).toBe('0');
    expect(phone.style.transform).toBe('translate3d(608px, 1000px, 0) rotate(-10deg)');
    scrollTo(1500);
    expect(raf.pending).toBe(0);
  });

  it('holds the phone in the hand at the top of the page', () => {
    const { phone, hand, screens } = setup();
    scrollTo(0);
    expect(pose(phone)).toEqual({ x: 0, y: 0, rotate: 0, scale: 1 });
    expect(hand.style.opacity).toBe('1');
    expect(opacities(screens)).toEqual([1, 0, 0, 0]);
  });

  it('moves right and tilts while scrolling into About, swapping to the About screen', () => {
    const { phone, hand, screens } = setup();
    scrollTo(800); // top1 = 1000 - 0.2 * 900 = 820, so nearly through the first phase
    const p = pose(phone);
    expect(p.x).toBeGreaterThan(400);
    expect(p.rotate).toBeLessThan(-9);
    expect(hand.style.opacity).toBe('0');
    expect(opacities(screens)).toEqual([0, 1, 0, 0]);
  });

  it('straightens up and shows the Metric screen through the Metric section', () => {
    const { phone, screens } = setup();
    scrollTo(1900);
    expect(pose(phone).rotate).toBe(0);
    expect(opacities(screens)).toEqual([0, 0, 1, 0]);
  });

  it('ends centred on the Features screen, docked above the feature cards', () => {
    const { phone, screens } = setup();
    scrollTo(5000);
    const p = pose(phone);
    expect(p.x).toBeCloseTo(0);
    expect(p.rotate).toBe(0);
    expect(opacities(screens)).toEqual([0, 0, 0, 1]);
    // Bottom edge of the phone stays at most DOCK_OVERHANG (14px) below the card row
    expect(300 + p.y + 540 * p.scale).toBeLessThanOrEqual(3800 + 140 + 14 + 1e-6);
  });

  it('cross-fades screens between sections', () => {
    const { screens } = setup();
    scrollTo(410); // first phase half way: hero and About both partly visible
    const [hero, about] = opacities(screens);
    expect(hero).toBeGreaterThan(0);
    expect(hero).toBeLessThan(1);
    expect(about).toBeGreaterThan(0);
    expect(hero + about).toBeCloseTo(1);
  });

  it('shrinks the phone on short viewports so it fits on screen', () => {
    setProp(window, 'innerHeight', 500);
    const { phone } = setup();
    scrollTo(1500);
    expect(pose(phone).scale).toBeCloseTo(0.7);
  });

  it.each([
    ['the hover-cue row', { dock: 'hoverCue' as const }],
    ['the phone slot', { dock: 'slot' as const }],
    ['the section top', { dock: 'none' as const }],
    ['a layout without the tech heading or obstacles', { techHeading: false, obstacles: false }],
  ])('docks against %s when the feature cards are missing', (_name, variant) => {
    const { phone, screens } = setup(variant);
    scrollTo(5000);
    const p = pose(phone);
    expect(Number.isFinite(p.x) && Number.isFinite(p.y)).toBe(true);
    expect(opacities(screens)).toEqual([0, 0, 0, 1]);
  });

  it('pauses while far off screen and resumes when it comes back', () => {
    const { phone } = setup();
    setIntersecting(false);
    setProp(window, 'scrollY', 1900);
    fireEvent.scroll(window);
    expect(raf.pending).toBe(0);
    setIntersecting(true);
    expect(raf.pending).toBe(1);
    raf.flush();
    expect(pose(phone).rotate).toBe(0);
  });

  it('skips a frame that was queued just before going off screen', () => {
    const { phone } = setup();
    const before = phone.style.transform;
    setProp(window, 'scrollY', 1900);
    fireEvent.scroll(window);
    setIntersecting(false);
    raf.flush();
    expect(phone.style.transform).toBe(before);
  });

  it('re-measures on layout changes, one frame at a time', () => {
    setup();
    triggerResize();
    fireEvent(window, new Event('resize'));
    fireEvent.scroll(window);
    expect(raf.pending).toBe(1);
  });

  it('cleans up its frame and listeners on unmount', () => {
    const { unmount } = setup();
    fireEvent.scroll(window);
    unmount();
    expect(raf.pending).toBe(0);
    expect(media!.listenerCount(MOBILE)).toBe(0);
    fireEvent.scroll(window);
    expect(raf.pending).toBe(0);
  });

  it('property: for any viewport and scroll position the pose is finite and opacities stay in [0, 1]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 480, max: 1400 }),
        fc.constantFrom(1280, 1440, 1600, 1920),
        fc.integer({ min: 0, max: 6000 }),
        fc.constantFrom<Variant['dock']>('marquee', 'hoverCue', 'slot', 'none'),
        (vh, vw, y, dock) => {
          setProp(window, 'innerHeight', vh);
          setProp(window, 'innerWidth', vw);
          setProp(window, 'scrollY', 0);
          const { phone, hand, screens, unmount } = setup({ dock });
          scrollTo(y);
          const p = pose(phone);
          for (const v of Object.values(p)) expect(Number.isFinite(v)).toBe(true);
          expect(p.rotate).toBeGreaterThanOrEqual(-10);
          expect(p.rotate).toBeLessThanOrEqual(0);
          expect(p.scale).toBeGreaterThanOrEqual(0.7);
          expect(p.scale).toBeLessThanOrEqual(1);
          expect(p.x).toBeGreaterThanOrEqual(-1e-9);
          expect(p.x).toBeLessThanOrEqual(vw / 2);
          for (const o of [...opacities(screens), Number(hand.style.opacity)]) {
            expect(o).toBeGreaterThanOrEqual(0);
            expect(o).toBeLessThanOrEqual(1);
          }
          unmount();
          media?.restore();
        },
      ),
      { numRuns: 60 },
    );
  });
});
