import React from 'react';
import { vi } from 'vitest';

/** Mutable state behind a `next-themes` mock: `vi.mock('next-themes', () => import('./helpers/theme'))`. */
export const themeState = {
  theme: 'light' as string | undefined,
  resolvedTheme: 'light' as string | undefined,
  setTheme: vi.fn(),
};

export function setTheme(theme: string | undefined, resolvedTheme = theme) {
  themeState.theme = theme;
  themeState.resolvedTheme = resolvedTheme;
}

export function resetTheme() {
  setTheme('light');
  themeState.setTheme.mockReset();
}

export const useTheme = () => themeState;
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children);
