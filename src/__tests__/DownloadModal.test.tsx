import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { PLAY_STORE_URL } from '@/config/links';

// Mock next-intl: return the key so assertions don't depend on copy
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', resolvedTheme: 'dark' }),
}));

import { DownloadModal } from '@/components/ui/DownloadModal';

describe('DownloadModal', () => {
  it('links to Google Play on the Android tab', () => {
    render(<DownloadModal isOpen onClose={() => {}} />);
    expect(screen.getByRole('link', { name: /redirectToPlayStore/ })).toHaveAttribute('href', PLAY_STORE_URL);
  });

  it('shows a coming-soon notice and no store link on the iOS tab', () => {
    render(<DownloadModal isOpen onClose={() => {}} initialDevice="ios" />);
    expect(screen.getByRole('status')).toHaveTextContent('iosComingSoonTitle');
    expect(screen.queryByRole('link')).toBeNull();
    expect(document.querySelector('a[href*="apps.apple.com"]')).toBeNull();
  });

  it('switches between the Android and iOS tabs', () => {
    render(<DownloadModal isOpen onClose={() => {}} />);
    fireEvent.click(screen.getByAltText('appStoreAlt'));
    expect(screen.getByRole('status')).toBeInTheDocument();
    fireEvent.click(screen.getByAltText('playStoreAlt'));
    expect(screen.queryByRole('status')).toBeNull();
  });
});
