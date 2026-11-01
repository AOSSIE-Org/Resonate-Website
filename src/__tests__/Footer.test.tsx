import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { screen, within } from '@testing-library/react';
import { IntlWrapper, LOCALES, messages, renderWithIntl } from './helpers/intl';
import { resetTheme, setTheme } from './helpers/theme';

vi.mock('next-themes', () => import('./helpers/theme'));
vi.mock('@aossie-org/social-share-button', () => ({ default: undefined }));

import Footer, { CONTACT_SECTION_ID } from '@/components/ui/Footer';
import * as links from '@/config/links';

afterEach(resetTheme);

const branding = () => screen.getByAltText('Resonate Branding').getAttribute('src');

describe('Footer', () => {
  it('is the focusable contact target for the navbar', () => {
    renderWithIntl(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('id', CONTACT_SECTION_ID);
    expect(footer).toHaveAttribute('tabindex', '-1');
  });

  it.each(LOCALES)('lists the %s link columns, each opening its external URL in a new tab', (locale) => {
    renderWithIntl(<Footer />, locale);
    const f = messages[locale].Footer;
    const nav = screen.getByRole('navigation', { name: f.navLabel });
    for (const title of [f.Resources.title, f.AboutUs.title, f.Social.title]) {
      expect(within(nav).getByText(title)).toBeInTheDocument();
    }
    const expected: [string, string][] = [
      [f.Resources.links.website, links.GITHUB_WEBSITE_REPO_URL],
      [f.Resources.links.app, links.GITHUB_APP_REPO_URL],
      [f.Resources.links.backend, links.GITHUB_BACKEND_REPO_URL],
      [f.AboutUs.links.aossie, links.AOSSIE_URL],
      [f.AboutUs.links.otherProjects, links.AOSSIE_PROJECTS_URL],
      [f.Social.links.discord, links.DISCORD_URL],
      [f.Social.links.youtube, links.YOUTUBE_URL],
      [f.Social.links.twitter, links.TWITTER_URL],
      [f.Social.links.linkedin, links.LINKEDIN_URL],
    ];
    for (const [label, href] of expected) {
      const link = within(nav).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it.each(LOCALES)('links the %s legal and support pages within the locale', (locale) => {
    renderWithIntl(<Footer />, locale);
    const m = messages[locale];
    expect(screen.getByRole('link', { name: m.Legal.privacy.title })).toHaveAttribute('href', `/${locale}/privacy`);
    expect(screen.getByRole('link', { name: m.Legal.terms.title })).toHaveAttribute('href', `/${locale}/terms`);
    expect(screen.getByRole('link', { name: m.Footer.supportLink })).toHaveAttribute('href', `/${locale}/support`);
    expect(screen.getByRole('button', { name: m.Share.trigger })).toBeInTheDocument();
    expect(screen.getByText(m.Footer.copyright)).toBeInTheDocument();
  });

  it('renders the "made with" line with a decorative AOSSIE logo', () => {
    const { container } = renderWithIntl(<Footer />);
    const logo = container.querySelector('img[src="/brand/icons/aossie_logo.svg"]')!;
    expect(logo).toHaveAttribute('alt', '');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
    expect(logo.parentElement).toHaveTextContent(/^AOSSIE$/);
    expect(logo.closest('div')).toHaveTextContent('Made with 🤍 by AOSSIE');
  });

  it('shows the light branding in light mode and the dark branding in dark mode', () => {
    setTheme('light');
    const { unmount } = renderWithIntl(<Footer />);
    expect(branding()).toBe('/assets/icons/resonate_branding_light.svg');
    unmount();
    setTheme('system', 'dark');
    renderWithIntl(<Footer />);
    expect(branding()).toBe('/assets/icons/resonate_branding_dark.svg');
  });

  it('treats an explicit dark theme as dark even before it resolves', () => {
    setTheme('dark', undefined);
    renderWithIntl(<Footer />);
    expect(branding()).toBe('/assets/icons/resonate_branding_dark.svg');
  });

  it('server-renders the light branding so hydration matches before the theme is known', () => {
    setTheme('dark');
    const html = renderToStaticMarkup(
      <IntlWrapper>
        <Footer />
      </IntlWrapper>,
    );
    expect(html).toContain('resonate_branding_light.svg');
    expect(html).not.toContain('resonate_branding_dark.svg');
  });
});
