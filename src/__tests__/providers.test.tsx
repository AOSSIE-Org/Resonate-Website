import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { installRaf } from './helpers/raf';

const lenis = vi.hoisted(() => ({
  options: [] as unknown[],
  raf: vi.fn(),
  destroy: vi.fn(),
}));

vi.mock('lenis', () => ({
  default: class {
    constructor(options: unknown) {
      lenis.options.push(options);
    }
    raf = lenis.raf;
    destroy = lenis.destroy;
  },
}));

import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

afterEach(() => {
  vi.unstubAllGlobals();
  lenis.options.length = 0;
  lenis.raf.mockClear();
  lenis.destroy.mockClear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
  localStorage.clear();
});

describe('LenisProvider', () => {
  it('renders its children and drives Lenis from animation frames until unmounted', () => {
    const raf = installRaf();
    const { unmount } = render(
      <LenisProvider>
        <p>content</p>
      </LenisProvider>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(lenis.options).toEqual([{ lerp: 0.08 }]);

    raf.flush(16);
    raf.flush(32);
    expect(lenis.raf.mock.calls).toEqual([[16], [32]]);
    expect(raf.pending).toBe(1);

    unmount();
    expect(raf.pending).toBe(0);
    expect(lenis.destroy).toHaveBeenCalledTimes(1);
  });
});

describe('ThemeProvider', () => {
  function ThemeName() {
    const { theme, resolvedTheme } = useTheme();
    return <p>{`${theme}/${resolvedTheme}`}</p>;
  }

  it('passes its options to next-themes and applies the theme class', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ThemeName />
      </ThemeProvider>,
    );
    expect(screen.getByText('dark/dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('restores a theme the visitor chose earlier', () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ThemeName />
      </ThemeProvider>,
    );
    expect(screen.getByText('light/light')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('light');
  });
});
