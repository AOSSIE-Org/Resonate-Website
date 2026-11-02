import { describe, it, expect, afterEach, vi } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { LOCALES, messages, renderWithIntl, type TestLocale } from './helpers/intl';
import { navigation } from './helpers/navigation';
import { installRaf } from './helpers/raf';
import { LanguageDropdown } from '@/components/ui/LanguageDropdown';

afterEach(() => {
  vi.unstubAllGlobals();
  window.location.hash = '';
});

function openMenu(locale: TestLocale = 'en', isMobile = false) {
  renderWithIntl(<LanguageDropdown isMobile={isMobile} />, locale);
  const trigger = screen.getByRole('button', { expanded: false });
  fireEvent.click(trigger);
  return { trigger, menu: screen.getByRole('menu', { name: messages[locale].Navbar.selectLanguage }) };
}

describe.each([false, true])('LanguageDropdown (mobile: %s)', (isMobile) => {
  it.each(LOCALES)('shows the current language for %s and marks it in the menu', (locale) => {
    renderWithIntl(<LanguageDropdown isMobile={isMobile} />, locale);
    const trigger = screen.getByRole('button');
    const label = { en: isMobile ? 'English' : 'EN', hi: isMobile ? 'हिन्दी' : 'HI' }[locale];
    expect(trigger).toHaveTextContent(label);
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    fireEvent.click(trigger);
    const current = screen.getAllByRole('menuitem').filter((item) => item.getAttribute('aria-current') === 'true');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent(locale === 'en' ? 'English' : 'हिन्दी');
  });

  it('opens a menu wired to its trigger and focuses the first item', () => {
    const { trigger, menu } = openMenu('en', isMobile);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(menu.id).toBe(`lang-menu-${isMobile ? 'mobile' : 'desktop'}`);
    expect(document.activeElement).toBe(screen.getAllByRole('menuitem')[0]);
    fireEvent.click(trigger);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('switches locale on the same page, keeping the query string', () => {
    navigation.pathname = '/en/support';
    navigation.searchParams = new URLSearchParams('ref=footer');
    openMenu('en', isMobile);
    fireEvent.click(screen.getByRole('menuitem', { name: 'हिन्दी' }));
    expect(navigation.router.replace).toHaveBeenCalledTimes(1);
    expect(navigation.router.replace.mock.calls[0][0]).toBe('/hi/support?ref=footer');
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('restores the #hash after switching, once the new page has rendered', () => {
    const raf = installRaf();
    navigation.pathname = '/hi';
    window.location.hash = '#contact';
    openMenu('hi', isMobile);
    fireEvent.click(screen.getByRole('menuitem', { name: 'English' }));
    expect(navigation.router.replace.mock.calls[0][0]).toMatch(/^\/en(\?|$)/);
    // The client-side navigation drops the hash; the queued frame puts it back.
    window.location.hash = '';
    raf.flush();
    expect(window.location.hash).toBe('#contact');
  });

  it('does not schedule a hash restore when there is no hash', () => {
    const raf = installRaf();
    openMenu('en', isMobile);
    fireEvent.click(screen.getByRole('menuitem', { name: 'English' }));
    expect(raf.pending).toBe(0);
  });

  it('closes on Escape and on a click outside, but not on a click inside', () => {
    const { menu } = openMenu('en', isMobile);
    fireEvent.mouseDown(menu);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.click(screen.getByRole('button', { expanded: false }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('ignores other keys', () => {
    const { menu } = openMenu('en', isMobile);
    const [first] = screen.getAllByRole('menuitem');
    fireEvent.keyDown(menu, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});

describe('LanguageDropdown edge cases', () => {
  it('falls back to English for a locale it has no entry for', () => {
    // A locale outside the list can only come from a misconfigured provider.
    renderWithIntl(<LanguageDropdown />, 'xx' as TestLocale);
    expect(screen.getByRole('button')).toHaveTextContent('EN');
  });

  it('switches locale when there are no search params (e.g. during static rendering)', () => {
    navigation.pathname = '/en/privacy';
    navigation.searchParams = null as unknown as URLSearchParams;
    openMenu('en');
    fireEvent.click(screen.getByRole('menuitem', { name: 'हिन्दी' }));
    expect(navigation.router.replace.mock.calls[0][0]).toMatch(/^\/hi\/privacy\??$/);
  });
});

describe('LanguageDropdown keyboard navigation', () => {
  it('property: ArrowDown/ArrowUp move focus cyclically through the items', () => {
    fc.assert(
      fc.property(fc.array(fc.constantFrom('ArrowDown', 'ArrowUp'), { maxLength: 12 }), fc.boolean(), (keys, isMobile) => {
        const { menu } = openMenu('en', isMobile);
        const items = screen.getAllByRole('menuitem');
        let expected = 0;
        for (const key of keys) {
          act(() => {
            fireEvent.keyDown(menu, { key });
          });
          expected = (expected + (key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
          expect(document.activeElement).toBe(items[expected]);
        }
        cleanup();
      }),
      { numRuns: 30 },
    );
  });
});
