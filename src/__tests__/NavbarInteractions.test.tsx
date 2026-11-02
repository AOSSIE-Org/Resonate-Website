import { describe, it, expect, vi, afterEach, beforeEach, type MockInstance } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { LOCALES, messages, renderWithIntl } from './helpers/intl';
import { navigation } from './helpers/navigation';
import { installRaf, setProp } from './helpers/raf';

vi.mock('next-themes', () => import('./helpers/theme'));

import { Navbar } from '@/components/layout/Navbar';
import { AOSSIE_URL, DISCORD_URL, GITHUB_ORG_URL, PLAY_STORE_URL } from '@/config/links';

const UA = {
  android: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36',
  nestHub: 'Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 CrKey/1.56.500000 Chrome/126 Safari/537.36',
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
  mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15',
  windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36',
};

const DEVICE_KEYS = ['userAgent', 'vendor', 'platform', 'maxTouchPoints'];

/** Shadows the navigator's device properties (jsdom has no maxTouchPoints at all). */
function setDevice(userAgent: string, platform = 'Win32', maxTouchPoints = 0, vendor = '') {
  const values = { userAgent, vendor, platform, maxTouchPoints };
  for (const key of DEVICE_KEYS) setProp(navigator, key, values[key as keyof typeof values]);
}

let open: MockInstance<typeof window.open>;
beforeEach(() => {
  open = vi.spyOn(window, 'open').mockImplementation(() => null);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  setProp(window, 'scrollY', 0);
  for (const key of DEVICE_KEYS) delete (navigator as unknown as Record<string, unknown>)[key];
});

const header = () => document.querySelector('header')!;
const island = () => screen.getByRole('navigation', { name: 'Primary navigation' });
const islandContent = () => island().children[1] as HTMLElement;
const desktopDownload = () => within(header()).getAllByRole('button', { name: 'Download Now' })[0];

describe('Navbar links', () => {
  it.each(LOCALES)('labels the %s navigation and opens external links in a new tab', (locale) => {
    renderWithIntl(<Navbar />, locale);
    const t = messages[locale].Navbar;
    const nav = screen.getByRole('navigation', { name: t.primaryNav });
    for (const [label, href] of [
      [t.developers, GITHUB_ORG_URL],
      [t.community, DISCORD_URL],
      [t.aossie, AOSSIE_URL],
    ]) {
      const link = within(nav).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(within(nav).getByRole('link', { name: t.contact })).toHaveAttribute('href', '#contact');
  });

  it('scrolls to the top instead of navigating when the logo is clicked on the home page', () => {
    navigation.pathname = '/hi';
    renderWithIntl(<Navbar />, 'hi');
    const logo = screen.getByAltText('Resonate Logo').closest('a')!;
    expect(logo).toHaveAttribute('href', '/hi');
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    logo.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});

describe('Navbar island', () => {
  it('slides in shortly after mounting', async () => {
    renderWithIntl(<Navbar />);
    expect(island().className).toContain('opacity-0');
    await waitFor(() => expect(island().className).toContain('translate-y-0 opacity-100'));
  });

  it('collapses once scrolled and expands again on hover or keyboard focus', () => {
    renderWithIntl(<Navbar />);
    expect(islandContent().className).toContain('opacity-100');

    setProp(window, 'scrollY', 200);
    fireEvent.scroll(window);
    expect(islandContent().className).toContain('opacity-0');

    fireEvent.mouseEnter(header());
    expect(islandContent().className).toContain('opacity-100');
    fireEvent.mouseLeave(header());
    expect(islandContent().className).toContain('opacity-0');

    const developers = within(island()).getByRole('link', { name: 'Developers' });
    act(() => developers.focus());
    expect(islandContent().className).toContain('opacity-100');
    // Moving focus between items inside the island keeps it open
    act(() => within(island()).getByRole('link', { name: 'Community' }).focus());
    expect(islandContent().className).toContain('opacity-100');
    act(() => within(island()).getByRole('link', { name: 'Community' }).blur());
    expect(islandContent().className).toContain('opacity-0');

    setProp(window, 'scrollY', 10);
    fireEvent.scroll(window);
    expect(islandContent().className).toContain('opacity-100');
  });

  /** Reads the dash offset the navbar writes on its scroll-progress circle. */
  function progressRing(container: HTMLElement) {
    const ring = container.querySelector('circle[stroke-dasharray]') as SVGCircleElement;
    return () => Number(ring.style.strokeDashoffset);
  }

  it('fills the progress ring with the scroll position', () => {
    setProp(window, 'innerHeight', 600);
    setProp(document.documentElement, 'scrollHeight', 1600);
    const offset = progressRing(renderWithIntl(<Navbar />).container);
    fireEvent.scroll(window);
    expect(offset()).toBeCloseTo(62.83);
    setProp(window, 'scrollY', 500);
    fireEvent.scroll(window);
    expect(offset()).toBeCloseTo(62.83 / 2);
    setProp(window, 'scrollY', 1000);
    fireEvent.scroll(window);
    expect(offset()).toBeCloseTo(0);
  });

  it('shows no progress on a page too short to scroll', () => {
    setProp(window, 'innerHeight', 800);
    setProp(document.documentElement, 'scrollHeight', 800);
    const offset = progressRing(renderWithIntl(<Navbar />).container);
    setProp(window, 'scrollY', 300);
    fireEvent.scroll(window);
    expect(offset()).toBeCloseTo(62.83);
  });

  it('feeds the pointer position to the glass effect once per frame', () => {
    const raf = installRaf();
    // jsdom has no PointerEvent; a MouseEvent subclass carries clientX/clientY the same way
    vi.stubGlobal('PointerEvent', class extends MouseEvent {});
    const { unmount } = renderWithIntl(<Navbar />);
    vi.spyOn(header(), 'getBoundingClientRect').mockReturnValue({ left: 100, top: 20 } as DOMRect);
    fireEvent.pointerMove(header(), { clientX: 150, clientY: 50 });
    fireEvent.pointerMove(header(), { clientX: 999, clientY: 999 });
    expect(raf.pending).toBe(1);
    raf.flush();
    expect(header().style.getPropertyValue('--nav-mx')).toBe('50px');
    expect(header().style.getPropertyValue('--nav-my')).toBe('30px');

    fireEvent.pointerMove(header(), { clientX: 120, clientY: 25 });
    unmount();
    expect(raf.cancelAnimationFrame).toHaveBeenCalled();
    expect(raf.pending).toBe(0);
  });

  it('removes its scroll listener on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderWithIntl(<Navbar />);
    unmount();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('Navbar download button', () => {
  it('opens Google Play directly on Android', () => {
    setDevice(UA.android);
    renderWithIntl(<Navbar />);
    fireEvent.click(desktopDownload());
    expect(open).toHaveBeenCalledWith(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([
    ['an iPhone', UA.iphone, 'iPhone', 5],
    ['an iPad that reports itself as a Mac', UA.mac, 'MacIntel', 5],
  ])('shows the iOS "coming soon" tab on %s', (_name, ua, platform, touch) => {
    setDevice(ua, platform, touch);
    renderWithIntl(<Navbar />);
    fireEvent.click(desktopDownload());
    expect(within(screen.getByRole('dialog')).getByRole('status')).toHaveTextContent('iOS app coming soon');
    expect(open).not.toHaveBeenCalled();
  });

  it.each([
    ['a desktop', UA.windows, 'Win32', 0, ''],
    ['a Mac without touch', UA.mac, 'MacIntel', 0, ''],
    ['a Nest Hub (Android smart display)', UA.nestHub, 'Linux', 0, ''],
    ['a browser without a user agent', '', 'Win32', 0, ''],
    ['a browser reporting only a vendor', '', 'Win32', 0, 'Google Inc.'],
  ])('shows the QR code on %s', (_name, ua, platform, touch, vendor) => {
    setDevice(ua, platform, touch, vendor);
    renderWithIntl(<Navbar />);
    fireEvent.click(desktopDownload());
    const dialog = screen.getByRole('dialog', { name: 'Download Resonate App' });
    expect(within(dialog).getByAltText('android QR Code')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('falls back to window.opera when there is no user agent or vendor', () => {
    setDevice('', 'Linux', 0, '');
    vi.stubGlobal('opera', 'Opera/9.80 (Android; Opera Mini/7.5)');
    renderWithIntl(<Navbar />);
    fireEvent.click(desktopDownload());
    expect(open).toHaveBeenCalledWith(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
  });

  it('property: Android devices (except smart displays) go to Google Play, everyone else gets the modal', () => {
    const ua = fc.tuple(
      fc.constantFrom('Linux; Android 13', 'Windows NT 10.0', 'iPhone; CPU iPhone OS 17', 'iPad; CPU OS 17', 'X11; Linux x86_64', 'Fuchsia'),
      fc.constantFrom('', ' CrKey/1.5'),
      fc.constantFrom('Chrome/126', 'Firefox/128', 'Safari/605'),
    );
    fc.assert(
      fc.property(ua, fc.constantFrom('Win32', 'MacIntel', 'Linux armv8l'), fc.integer({ min: 0, max: 5 }), ([os, crkey, browser], platform, touch) => {
        const userAgent = `Mozilla/5.0 (${os})${crkey} ${browser}`;
        open.mockClear();
        setDevice(userAgent, platform, touch);
        renderWithIntl(<Navbar />);
        fireEvent.click(desktopDownload());
        const android = os.includes('Android') && !crkey;
        const ios = /iPad|iPhone/.test(os) || (platform === 'MacIntel' && touch > 1);
        expect(open).toHaveBeenCalledTimes(android ? 1 : 0);
        const dialog = screen.queryByRole('dialog');
        expect(dialog !== null).toBe(!android);
        if (dialog) expect(within(dialog).queryByRole('status') !== null).toBe(ios);
        cleanup();
      }),
      { numRuns: 25 },
    );
  });
});

describe('Navbar mobile menu', () => {
  function openMobileMenu() {
    renderWithIntl(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
    return screen.getByRole('navigation', { name: 'Mobile menu' });
  }

  it('toggles between the menu and close icons', () => {
    renderWithIntl(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Toggle menu' });
    expect(within(toggle).getByAltText('Menu')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(within(toggle).getByAltText('Close')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByRole('navigation', { name: 'Mobile menu' })).toBeNull();
  });

  it.each(['Developers', 'Community', 'AOSSIE'])('closes after following the external %s link', (label) => {
    const menu = openMobileMenu();
    const link = within(menu).getByRole('link', { name: label });
    expect(link).toHaveAttribute('target', '_blank');
    fireEvent.click(link);
    expect(screen.queryByRole('navigation', { name: 'Mobile menu' })).toBeNull();
  });

  it('holds the theme and language controls', () => {
    const menu = openMobileMenu();
    expect(within(menu).getByRole('button', { name: 'Toggle theme' })).toHaveTextContent('Switch Theme');
    expect(within(menu).getByRole('button', { name: /English/ })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('closes and opens the download modal from its download button', () => {
    setDevice(UA.windows);
    const menu = openMobileMenu();
    fireEvent.click(within(menu).getByRole('button', { name: 'Download Now' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile menu' })).toBeNull();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
