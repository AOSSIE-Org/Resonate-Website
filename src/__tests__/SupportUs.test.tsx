import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { GITHUB_SPONSORS_URL } from '@/config/links';
import { SUPPORT_LOGOS, SUPPORTERS } from '@/config/support';

// Return the key so assertions don't depend on copy
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { SupportUs } from '@/components/support/SupportUs';

afterEach(() => vi.restoreAllMocks());

describe('SupportUs', () => {
  it('passes props the widget accepts without validation warnings', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<SupportUs />);
    expect(warn.mock.calls.filter(([message]) => String(message).includes('[SupportUsButton]'))).toEqual([]);
  });

  it('shows the translated heading, both logos and the GitHub Sponsors call to action', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<SupportUs />);
    expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument();
    const logos = Array.from(document.querySelectorAll('img')).map((img) => img.getAttribute('src'));
    expect(logos).toEqual(expect.arrayContaining(Object.values(SUPPORT_LOGOS)));
    screen.getByRole('button', { name: 'GitHub Sponsors' }).click();
    expect(open).toHaveBeenCalledWith(GITHUB_SPONSORS_URL, expect.anything(), expect.anything());
  });

  it('lists Google Summer of Code and Stability Nexus as supporters, linking to their sites', () => {
    render(<SupportUs />);
    expect(SUPPORTERS.map((s) => s.name)).toEqual(['Google Summer of Code', 'Stability Nexus']);
    for (const { name, link } of SUPPORTERS) {
      expect(screen.getByText(name).closest('a')?.getAttribute('href')).toBe(link);
    }
  });
});
