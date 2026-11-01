import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { fireEvent, screen } from '@testing-library/react';
import { IntlWrapper, LOCALES, messages, renderWithIntl } from './helpers/intl';
import { resetTheme, setTheme, themeState } from './helpers/theme';

vi.mock('next-themes', () => import('./helpers/theme'));

import { ThemeToggle } from '@/components/ui/theme-toggle';

afterEach(resetTheme);

describe('ThemeToggle', () => {
  it.each([false, true])('switches dark to light and light to dark (mobile: %s)', (isMobile) => {
    setTheme('dark');
    const { unmount } = renderWithIntl(<ThemeToggle isMobile={isMobile} />);
    expect(screen.getByAltText('Light Mode')).toHaveAttribute('src', '/assets/icons/sun.svg');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(themeState.setTheme).toHaveBeenLastCalledWith('light');
    unmount();

    setTheme('light');
    renderWithIntl(<ThemeToggle isMobile={isMobile} />);
    expect(screen.getByAltText('Dark Mode')).toHaveAttribute('src', '/assets/icons/moon.svg');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(themeState.setTheme).toHaveBeenLastCalledWith('dark');
  });

  it('treats the system theme as light and offers dark mode', () => {
    setTheme('system', 'dark');
    renderWithIntl(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(themeState.setTheme).toHaveBeenCalledWith('dark');
  });

  it.each(LOCALES)('labels the mobile row in %s', (locale) => {
    renderWithIntl(<ThemeToggle isMobile />, locale);
    const t = messages[locale].ThemeToggle;
    expect(screen.getByRole('button', { name: t.toggleTheme })).toHaveTextContent(t.switchTheme);
  });

  it('server-renders an inert placeholder until mounted, so no icon mismatches on hydration', () => {
    const desktop = renderToStaticMarkup(
      <IntlWrapper>
        <ThemeToggle />
      </IntlWrapper>,
    );
    expect(desktop).toContain('aria-label="Toggle theme"');
    expect(desktop).toContain('<span class="sr-only">Loading theme toggle</span>');
    expect(desktop).not.toContain('<img');

    const mobile = renderToStaticMarkup(
      <IntlWrapper>
        <ThemeToggle isMobile />
      </IntlWrapper>,
    );
    expect(mobile).toMatch(/^<div class="[^"]*animate-pulse[^"]*"><\/div>$/);
  });
});
