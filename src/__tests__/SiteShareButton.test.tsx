import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

const share = vi.hoisted(() => ({
  constructed: [] as Record<string, unknown>[],
  updateOptions: vi.fn(),
  openModal: vi.fn(),
  destroy: vi.fn(),
  theme: 'dark',
}));

vi.mock('@aossie-org/social-share-button', () => ({
  default: class {
    constructor(options: Record<string, unknown>) {
      share.constructed.push(options);
    }
    updateOptions = share.updateOptions;
    openModal = share.openModal;
    destroy = share.destroy;
  },
}));

// Return the key so assertions don't depend on copy
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: share.theme }),
}));

import { SiteShareButton } from '@/components/ui/SiteShareButton';

beforeEach(() => {
  share.constructed.length = 0;
  vi.clearAllMocks();
  share.theme = 'dark';
});

describe('SiteShareButton', () => {
  it('builds a hidden-button share dialog with translated labels and the site theme', async () => {
    render(<SiteShareButton />);
    await waitFor(() => expect(share.constructed).toHaveLength(1));
    expect(share.constructed[0]).toMatchObject({
      showButton: false,
      theme: 'dark',
      platforms: ['whatsapp', 'twitter', 'linkedin', 'telegram', 'email'],
      labels: { share: 'share', close: 'close', copy: 'copy', copied: 'copied', copyFailed: 'copyFailed', urlLabel: 'urlLabel' },
    });
    expect(share.constructed[0].container).toBeInstanceOf(HTMLSpanElement);
  });

  it('shares the current page when the trigger is clicked', async () => {
    document.title = 'Resonate';
    render(<SiteShareButton />);
    await waitFor(() => expect(share.constructed).toHaveLength(1));
    fireEvent.click(screen.getByRole('button', { name: 'trigger' }));
    expect(share.updateOptions).toHaveBeenCalledWith({ url: window.location.href, title: 'Resonate' });
    expect(share.openModal).toHaveBeenCalledTimes(1);
  });

  it('rebuilds the dialog when the theme changes and cleans up on unmount', async () => {
    const { rerender, unmount } = render(<SiteShareButton />);
    await waitFor(() => expect(share.constructed).toHaveLength(1));
    share.theme = 'light';
    rerender(<SiteShareButton />);
    await waitFor(() => expect(share.constructed).toHaveLength(2));
    expect(share.constructed[1]).toMatchObject({ theme: 'light' });
    expect(share.destroy).toHaveBeenCalledTimes(1);
    unmount();
    expect(share.destroy).toHaveBeenCalledTimes(2);
  });
});
