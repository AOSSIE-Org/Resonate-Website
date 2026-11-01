import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// How the share library module is exposed in each test: as the default export (bundlers),
// only as a `window.SocialShareButton` global (classic script), or not at all.
const share = vi.hoisted(() => ({
  exposeAsDefault: false,
  constructed: [] as Record<string, unknown>[],
  openModal: vi.fn(),
  updateOptions: vi.fn(),
  destroy: vi.fn(),
}));

vi.mock('@aossie-org/social-share-button', async () => {
  class ShareButton {
    constructor(options: Record<string, unknown>) {
      share.constructed.push(options);
    }
    openModal = share.openModal;
    updateOptions = share.updateOptions;
    destroy = share.destroy;
  }
  (window as unknown as { SocialShareButton?: unknown }).SocialShareButton = ShareButton;
  return {
    get default() {
      return share.exposeAsDefault ? ShareButton : undefined;
    },
  };
});

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next-themes', () => ({ useTheme: () => ({ resolvedTheme: 'light' }) }));

import { SiteShareButton } from '@/components/ui/SiteShareButton';

const globalShare = window as unknown as { SocialShareButton?: unknown };
let savedGlobal: unknown;
beforeEach(async () => {
  share.constructed.length = 0;
  share.exposeAsDefault = false;
  vi.clearAllMocks();
  // Load the mocked module once so the global exists, then remember it
  await import('@aossie-org/social-share-button');
  savedGlobal ??= globalShare.SocialShareButton;
  globalShare.SocialShareButton = savedGlobal;
});
afterEach(() => {
  globalShare.SocialShareButton = savedGlobal;
});

describe('SiteShareButton library loading', () => {
  it('uses the global the classic script sets when there is no default export', async () => {
    render(<SiteShareButton className="custom" />);
    await waitFor(() => expect(share.constructed).toHaveLength(1));
    expect(share.constructed[0]).toMatchObject({ theme: 'light', showButton: false });
    const trigger = screen.getByRole('button', { name: 'trigger' });
    expect(trigger).toHaveClass('custom');
    expect(trigger).toHaveAttribute('title', 'trigger');
    fireEvent.click(trigger);
    expect(share.openModal).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the library is unavailable, and the trigger is a no-op', async () => {
    globalShare.SocialShareButton = undefined;
    render(<SiteShareButton />);
    await act(async () => {
      await import('@aossie-org/social-share-button');
    });
    fireEvent.click(screen.getByRole('button', { name: 'trigger' }));
    expect(share.constructed).toHaveLength(0);
    expect(share.updateOptions).not.toHaveBeenCalled();
    expect(share.openModal).not.toHaveBeenCalled();
  });

  it('builds nothing if it unmounts before the library has loaded', async () => {
    share.exposeAsDefault = true;
    const { unmount } = render(<SiteShareButton />);
    unmount();
    await act(async () => {
      await import('@aossie-org/social-share-button');
    });
    expect(share.constructed).toHaveLength(0);
    expect(share.destroy).not.toHaveBeenCalled();
  });
});
