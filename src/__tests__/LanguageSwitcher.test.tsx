import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderWithIntl } from './helpers/intl';
import { navigation } from './helpers/navigation';
import { LANGUAGES } from '@/config/languages';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LanguageSwitcher as NamedLanguageSwitcher } from '@/components/LanguageSwitcher';

const trigger = () => screen.getByRole('button', { name: 'Switch language' });

describe('LanguageSwitcher Component', () => {
  it('is re-exported under both the default and the named export', () => {
    expect(NamedLanguageSwitcher).toBe(LanguageSwitcher);
  });

  it('renders language selector button with active language', () => {
    renderWithIntl(<LanguageSwitcher />, 'hi');
    expect(trigger()).toHaveTextContent('🇮🇳HI');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('lists every language with the active one selected', () => {
    renderWithIntl(<LanguageSwitcher />);
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    const options = screen.getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual(LANGUAGES.map((l) => `${l.flag}${l.label}`));
    expect(options.map((o) => o.getAttribute('aria-selected'))).toEqual(['true', 'false']);
  });

  it('replaces the route with the chosen locale', () => {
    navigation.pathname = '/en/terms';
    renderWithIntl(<LanguageSwitcher />);
    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole('option', { name: /हिंदी/ }));
    expect(navigation.router.replace.mock.calls[0][0]).toBe('/hi/terms');
  });

  it('closes on Escape and on a click outside, but not on other keys or inside clicks', () => {
    renderWithIntl(<LanguageSwitcher />);
    fireEvent.click(trigger());
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.mouseDown(screen.getByRole('listbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();

    fireEvent.click(trigger());
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('falls back to the first language for an unknown locale', () => {
    // A locale outside LANGUAGES can only come from a misconfigured provider.
    renderWithIntl(<LanguageSwitcher />, 'xx' as 'en');
    expect(trigger()).toHaveTextContent('🇬🇧EN');
  });
});
