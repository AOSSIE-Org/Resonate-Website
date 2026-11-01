import { describe, it, expect, vi, afterEach } from 'vitest';
import React, { useState } from 'react';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { LOCALES, messages, renderWithIntl } from './helpers/intl';
import { resetTheme, setTheme } from './helpers/theme';

vi.mock('next-themes', () => import('./helpers/theme'));

import { DownloadModal, type DeviceType } from '@/components/ui/DownloadModal';
import { PLAY_STORE_URL } from '@/config/links';

afterEach(() => {
  resetTheme();
  document.body.style.overflow = '';
});

/** An opener button plus the modal, as the navbar uses it. */
function Harness({ device = 'android', onClose }: { device?: DeviceType; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <DownloadModal
        isOpen={open}
        initialDevice={device}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      />
    </>
  );
}

function openHarness(device?: DeviceType) {
  const onClose = vi.fn();
  renderWithIntl(<Harness device={device} onClose={onClose} />);
  const opener = screen.getByRole('button', { name: 'open' });
  act(() => opener.focus());
  fireEvent.click(opener);
  return { onClose, opener, dialog: screen.getByRole('dialog') };
}

describe('DownloadModal', () => {
  it('renders nothing while closed', () => {
    const { container } = renderWithIntl(<DownloadModal isOpen={false} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each(LOCALES)('is a labelled modal dialog with the %s copy', (locale) => {
    renderWithIntl(<DownloadModal isOpen onClose={() => {}} />, locale);
    const t = messages[locale].DownloadModal;
    const dialog = screen.getByRole('dialog', { name: t.title });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(within(dialog).getByText(t.scanInstruction)).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: t.redirectToPlayStore })).toHaveAttribute('href', PLAY_STORE_URL);
    expect(within(dialog).getByRole('button', { name: t.closeLabel })).toBeInTheDocument();
  });

  it('opens the Play Store link in a new tab', () => {
    renderWithIntl(<DownloadModal isOpen onClose={() => {}} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows the QR code matching the theme', () => {
    setTheme('light');
    const { unmount } = renderWithIntl(<DownloadModal isOpen onClose={() => {}} />);
    expect(screen.getByAltText('android QR Code')).toHaveAttribute('src', '/assets/images/qr_light_android.svg');
    unmount();
    setTheme('system', 'dark');
    renderWithIntl(<DownloadModal isOpen onClose={() => {}} />);
    expect(screen.getByAltText('android QR Code')).toHaveAttribute('src', '/assets/images/qr_android.svg');
  });

  it('closes with Escape, the close button and the backdrop', () => {
    const { onClose, dialog } = openHarness();
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(dialog).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    fireEvent.click(screen.getByRole('dialog').previousElementSibling!);
    expect(onClose).toHaveBeenCalledTimes(3);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('locks page scrolling while open and moves focus in, then back to the opener', async () => {
    const { opener } = openHarness();
    expect(document.body.style.overflow).toBe('hidden');
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close modal' })));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('unset');
    expect(document.activeElement).toBe(opener);
  });

  it('traps Tab and Shift+Tab inside the dialog', () => {
    const { dialog } = openHarness();
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>('button, [href]'));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    act(() => last.focus());
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);

    // Inside the list the browser's own tab order applies
    const middle = focusables[1];
    act(() => middle.focus());
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    window.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(false);
    const shiftTab = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    window.dispatchEvent(shiftTab);
    expect(shiftTab.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(middle);
  });

  it('starts on the requested tab each time it opens', () => {
    renderWithIntl(<Harness device="ios" />);
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getByRole('status')).toHaveTextContent(messages.en.DownloadModal.iosComingSoonBody);
    fireEvent.click(screen.getByAltText('Play Store'));
    expect(screen.queryByRole('status')).toBeNull();
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('highlights the active device tab', () => {
    renderWithIntl(<DownloadModal isOpen onClose={() => {}} initialDevice="ios" />);
    const android = screen.getByAltText('Play Store').closest('button')!;
    const ios = screen.getByAltText('App Store').closest('button')!;
    expect(ios.className).toContain('shadow-lg');
    expect(android.className).not.toContain('shadow-lg');
  });
});
