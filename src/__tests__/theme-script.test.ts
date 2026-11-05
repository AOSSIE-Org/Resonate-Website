import { describe, it, expect, afterEach, vi } from 'vitest';
import { DEFAULT_THEME, THEME_STORAGE_KEY, themeInitScript } from '@/components/providers/theme-script';
import { mockMatchMedia } from './helpers/matchMedia';

const root = document.documentElement;

function run({ stored, systemDark = false }: { stored?: string | null; systemDark?: boolean }) {
  if (stored != null) localStorage.setItem(THEME_STORAGE_KEY, stored);
  const media = mockMatchMedia((query) => query === '(prefers-color-scheme: dark)' && systemDark);
  try {
    new Function(themeInitScript)();
  } finally {
    media.restore();
  }
}

afterEach(() => {
  localStorage.clear();
  root.className = '';
  root.removeAttribute('style');
  vi.restoreAllMocks();
});

describe('theme head script', () => {
  it('shares its storage key and default with ThemeProvider', () => {
    expect(THEME_STORAGE_KEY).toBe('theme');
    expect(DEFAULT_THEME).toBe('system');
  });

  it.each(['dark', 'light'] as const)('applies a saved %s theme and its colour scheme', (theme) => {
    root.className = 'font-inter-var light dark';
    run({ stored: theme, systemDark: theme === 'light' });
    expect(root.className).toBe(`font-inter-var ${theme}`);
    expect(root.style.colorScheme).toBe(theme);
  });

  it.each([
    [true, 'dark'],
    [false, 'light'],
  ] as const)('follows the system (prefers dark: %s) when nothing is saved', (systemDark, expected) => {
    run({ systemDark });
    expect(root.classList.contains(expected)).toBe(true);
    expect(root.style.colorScheme).toBe(expected);
  });

  it('follows the system when "system" is saved', () => {
    run({ stored: 'system', systemDark: true });
    expect(root.classList.contains('dark')).toBe(true);
  });

  it('leaves the page alone for an unknown saved value', () => {
    run({ stored: 'sepia' });
    expect(root.className).toBe('');
    expect(root.getAttribute('style')).toBeNull();
  });

  it('falls back to the default (system) theme when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => run({ systemDark: true })).not.toThrow();
    expect(root.className).toBe('dark');
    expect(root.style.colorScheme).toBe('dark');
  });
});
