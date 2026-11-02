import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';

// The share library fails to load (offline, blocked script): the dynamic import rejects
vi.mock('@aossie-org/social-share-button', () => {
  throw new Error('offline');
});
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next-themes', () => ({ useTheme: () => ({ resolvedTheme: 'light' }) }));

import { SiteShareButton } from '@/components/ui/SiteShareButton';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('SiteShareButton when the library fails to load', () => {
  it('reports the error instead of leaving an unhandled rejection, and the button stays harmless', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<SiteShareButton />);
    await waitFor(() => expect(consoleError).toHaveBeenCalledWith('Could not load the share dialog', expect.any(Error)));
    expect(() => fireEvent.click(screen.getByRole('button', { name: 'trigger' }))).not.toThrow();
  });
});
