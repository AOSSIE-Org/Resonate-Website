import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { act, fireEvent, screen } from '@testing-library/react';
import { LOCALES, messages, renderWithIntl } from './helpers/intl';
import { setIntersecting, triggerResize } from './helpers/observers';
import { installRaf, setProp } from './helpers/raf';
import { mockMatchMedia } from './helpers/matchMedia';
import { Metric } from '@/components/home/Metric';
import * as links from '@/config/links';

const DESKTOP = '(min-width: 1280px)';

describe('Metric content', () => {
  it.each(LOCALES)('shows the %s stats, AOSSIE blurb and mockup', (locale) => {
    renderWithIntl(<Metric />, locale);
    const t = messages[locale].Metric;
    for (const stat of ['4.6+', '6K+', '1K+']) expect(screen.getByText(stat)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(t.storeRatingPart1))).toHaveTextContent(`${t.storeRatingPart1}${t.storeRatingPart2}`);
    expect(screen.getByText(new RegExp(t.happyContributorsPart1))).toHaveTextContent(t.happyContributorsPart2);
    expect(screen.getByText(new RegExp(t.uniqueDownloadsPart1))).toHaveTextContent(t.uniqueDownloadsPart2);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`${t.weInnovate}${t.weEducate}`);
    expect(screen.getByText(t.aossieDescription)).toBeInTheDocument();
    expect(screen.getByAltText(t.mockupAlt)).toHaveAttribute('src', '/assets/mockups/phone_metric.webp');
  });

  it('links AOSSIE contact and community channels in new tabs', () => {
    renderWithIntl(<Metric />);
    const t = messages.en.Metric;
    const expected: [string, string][] = [
      [t.gmailAlt, 'mailto:aossie.oss@gmail.com'],
      [t.discordAlt, links.DISCORD_URL],
      [t.twitterAlt, links.TWITTER_URL],
      [t.githubAlt, links.GITHUB_ORG_URL],
      [t.gitlabAlt, links.GITLAB_URL],
    ];
    for (const [alt, href] of expected) {
      const link = screen.getByRole('link', { name: alt });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('reveals the heading once it scrolls into view', () => {
    renderWithIntl(<Metric />);
    const [innovate, educate] = screen.getByRole('heading', { level: 2 }).querySelectorAll('span');
    expect(innovate.className).toContain('opacity-0');
    setIntersecting(true);
    expect(innovate.className).toContain('animate-luxury-reveal-1');
    expect(educate.className).toContain('animate-luxury-reveal-2');
  });
});

describe('Metric background phone', () => {
  let media: ReturnType<typeof mockMatchMedia>;
  let raf: ReturnType<typeof installRaf>;

  beforeEach(() => {
    raf = installRaf();
    setProp(window, 'innerHeight', 1000);
    setProp(window, 'innerWidth', 1600);
    setProp(window, 'scrollY', 0);
  });
  afterEach(() => {
    media?.restore();
  });

  /** Renders at a desktop width with the section 2000px down the page and 1000px tall. */
  function renderDesktop(desktop = true) {
    media = mockMatchMedia((q) => q === DESKTOP && desktop);
    const { container, unmount } = renderWithIntl(<Metric />);
    const section = container.querySelector('#section-metric') as HTMLElement;
    setProp(section, 'offsetTop', 2000);
    setProp(section, 'offsetHeight', 1000);
    const phone = container.querySelector('[style*="center bottom"]') as HTMLElement;
    fireEvent(window, new Event('resize'));
    raf.flush();
    return { phone, section, unmount };
  }

  const scrollTo = (y: number) => {
    setProp(window, 'scrollY', y);
    fireEvent.scroll(window);
    raf.flush();
  };

  it('stays hidden and idle below the desktop breakpoint', () => {
    const { phone } = renderDesktop(false);
    expect(phone.style.opacity).toBe('0');
    scrollTo(2000);
    expect(raf.pending).toBe(0);
    expect(phone.style.opacity).toBe('0');
  });

  it('is fully visible while the section is centred and fades out with distance', () => {
    const { phone } = renderDesktop();
    scrollTo(2000);
    expect(Number(phone.style.opacity)).toBe(1);
    scrollTo(2500); // 500px from centre: a fifth into the 400-900px fade band
    expect(Number(phone.style.opacity)).toBeCloseTo(0.8);
    scrollTo(1000); // 1000px away
    expect(Number(phone.style.opacity)).toBe(0);
  });

  it.each([
    [1600, 168], // 2xl: min(0.28 * 1600, 800 - 192) - 280
    [1200, 56], // lg: min(336, 600 - 64) - 280
    [800, -56], // sm: min(224, 400 - 32) - 280
    [500, -140], // xs: min(140, 250 - 16) - 280
  ])('sits left of the moving phone at a %ipx-wide viewport', (width, x) => {
    setProp(window, 'innerWidth', width);
    const { phone } = renderDesktop();
    const [, tx, ty] = /^translate3d\((.+)px, (.+)px, 0\)$/.exec(phone.style.transform)!;
    expect(Number(tx)).toBeCloseTo(x);
    expect(Number(ty)).toBe(0);
  });

  it('pauses while the section is far off screen and resumes when it nears', () => {
    const { phone } = renderDesktop();
    scrollTo(2000);
    setIntersecting(false);
    setProp(window, 'scrollY', 2500);
    fireEvent.scroll(window);
    expect(raf.pending).toBe(0);
    setIntersecting(true);
    expect(raf.pending).toBe(1);
    raf.flush();
    expect(Number(phone.style.opacity)).toBeCloseTo(0.8);
  });

  it('re-measures when the page layout changes', () => {
    const { phone, section } = renderDesktop();
    scrollTo(2000);
    setProp(section, 'offsetTop', 3000);
    triggerResize();
    expect(raf.pending).toBe(1);
    raf.flush();
    expect(Number(phone.style.opacity)).toBe(0);
  });

  it('coalesces scroll and resize work into one pending frame', () => {
    renderDesktop();
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    fireEvent(window, new Event('resize'));
    triggerResize();
    expect(raf.pending).toBe(1);
  });

  it('stops animating and hides when the window shrinks below desktop', () => {
    const { phone } = renderDesktop();
    scrollTo(2000);
    expect(media.listenerCount(DESKTOP)).toBe(1);
    act(() => media.emit(DESKTOP, false));
    expect(phone.style.opacity).toBe('0');
    scrollTo(2000);
    expect(phone.style.opacity).toBe('0');
  });

  it('cancels its pending frame and listeners on unmount', () => {
    const { unmount } = renderDesktop();
    fireEvent.scroll(window);
    expect(raf.pending).toBe(1);
    unmount();
    expect(raf.pending).toBe(0);
    expect(media.listenerCount(DESKTOP)).toBe(0);
  });

  it('property: opacity stays within [0, 1], is 1 near the centre and 0 far away', () => {
    const { phone } = renderDesktop();
    fc.assert(
      fc.property(fc.integer({ min: -2000, max: 8000 }), (y) => {
        scrollTo(y);
        const opacity = Number(phone.style.opacity);
        const distance = Math.abs(2000 - y);
        expect(opacity).toBeGreaterThanOrEqual(0);
        expect(opacity).toBeLessThanOrEqual(1);
        if (distance <= 400) expect(opacity).toBe(1);
        if (distance >= 900) expect(opacity).toBe(0);
      }),
    );
  });
});
