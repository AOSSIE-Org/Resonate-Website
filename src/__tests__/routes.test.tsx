import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { renderToStaticMarkup } from 'react-dom/server';
import { render, screen, within } from '@testing-library/react';
import { IntlWrapper, messages, type TestLocale } from './helpers/intl';

// Server-only next-intl APIs throw outside React Server Components, so they are backed by
// the real catalogs here: getTranslations is next-intl's own translator over the same messages.
const server = vi.hoisted(() => ({ setRequestLocale: vi.fn() }));
vi.mock('next-intl/server', async () => {
  const { createTranslator } = await import('next-intl');
  const { messages } = await import('./helpers/intl');
  return {
    setRequestLocale: server.setRequestLocale,
    getTranslations: async ({ locale, namespace }: { locale: TestLocale; namespace: string }) =>
      createTranslator({ locale, messages: messages[locale], namespace: namespace as never }),
    getRequestConfig: (factory: unknown) => factory,
  };
});

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'font-inter-var' }),
  Noto_Sans_Devanagari: () => ({ variable: 'font-devanagari-var' }),
}));

// The footer's share button loads this browser-only library; nothing here opens it.
vi.mock('@aossie-org/social-share-button', () => ({ default: undefined }));

import RootRedirectLayout from '@/app/(root)/layout';
import RootPage, { generateMetadata as rootMetadata } from '@/app/(root)/page';
import GlobalNotFound, { metadata as notFoundMetadata } from '@/app/global-not-found';
import LocaleLayout, { generateMetadata as localeMetadata, generateStaticParams } from '@/app/[locale]/layout';
import Home from '@/app/[locale]/page';
import PrivacyPage, { generateMetadata as privacyMetadata } from '@/app/[locale]/privacy/page';
import TermsPage, { generateMetadata as termsMetadata } from '@/app/[locale]/terms/page';
import SupportPage, { generateMetadata as supportMetadata } from '@/app/[locale]/support/page';
import getRequestConfig from '@/i18n/request';
import { generateLocaleMetadata } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import { themeInitScript } from '@/components/providers/theme-script';
import { PLAY_STORE_URL, AOSSIE_URL } from '@/config/links';

const SITE = 'https://resonate.aossie.org';
beforeEach(() => vi.stubEnv('NEXT_PUBLIC_SITE_URL', SITE));
afterEach(() => {
  vi.unstubAllEnvs();
  server.setRequestLocale.mockClear();
});

const params = (locale: string) => ({ params: Promise.resolve({ locale }) });

function withLocale(locale: TestLocale) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <IntlWrapper locale={locale}>{children}</IntlWrapper>;
  };
}

/** Runs an inline script against a fake `location`, returning where it redirected (if anywhere). */
function runInlineScript(script: string, pathname: string) {
  const replace = vi.fn();
  new Function('location', script)({ pathname, replace });
  return replace.mock.calls[0]?.[0] as string | undefined;
}

function inlineScript(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelector('script')!.textContent!;
}

describe('root redirect route (/)', () => {
  it('wraps the page in a bare English document with no stylesheet', () => {
    const html = renderToStaticMarkup(
      <RootRedirectLayout>
        <p>child</p>
      </RootRedirectLayout>,
    );
    expect(html).toMatch(/^<html lang="en">/);
    expect(html).toContain('<body><p>child</p></body>');
    expect(html).not.toMatch(/<link|<style/);
  });

  it('ships the default locale metadata', async () => {
    expect(await rootMetadata()).toEqual(await generateLocaleMetadata('en'));
  });

  it('redirects to /en with a script, a meta refresh and a no-JS link', () => {
    const html = renderToStaticMarkup(<RootPage />);
    expect(runInlineScript(inlineScript(html), '/')).toBe('/en');
    expect(html).toContain('<meta http-equiv="refresh" content="0; url=/en"/>');
    expect(html).toContain('<noscript><a href="/en">Continue to Resonate</a></noscript>');
  });
});

describe('global not-found page', () => {
  const html = renderToStaticMarkup(<GlobalNotFound />);
  const script = inlineScript(html);

  it('is a no-index English page that links back home', () => {
    expect(notFoundMetadata).toMatchObject({ title: 'Page not found | Resonate', robots: { index: false } });
    expect(html).toMatch(/^<html lang="en">/);
    expect(html).toContain('>Page not found</h1>');
    expect(html).toMatch(/<a class="underline" href="\/en">Go to Resonate<\/a>/);
  });

  it('sends shared room links to the Play Store', () => {
    expect(runInlineScript(script, '/room/abc123')).toBe(PLAY_STORE_URL);
    expect(runInlineScript(script, '/room/abc123/')).toBe(PLAY_STORE_URL);
  });

  it('leaves other missing pages alone', () => {
    for (const path of ['/', '/room', '/room/', '/room/a/b', '/en/room/a', '/rooms/a', '/missing']) {
      expect(runInlineScript(script, path), path).toBeUndefined();
    }
  });

  it('property: redirects exactly the /room/<id> paths (with an optional trailing slash)', () => {
    const segment = fc.stringMatching(/^[A-Za-z0-9._~%-]{1,24}$/);
    fc.assert(
      fc.property(segment, fc.boolean(), (id, slash) => {
        expect(runInlineScript(script, `/room/${id}${slash ? '/' : ''}`)).toBe(PLAY_STORE_URL);
      }),
    );
    fc.assert(
      fc.property(fc.array(fc.oneof(fc.constant('room'), segment), { maxLength: 4 }), (parts) => {
        const isRoom = parts.length === 2 && parts[0] === 'room';
        expect(runInlineScript(script, `/${parts.join('/')}`)).toBe(isRoom ? PLAY_STORE_URL : undefined);
      }),
    );
  });
});

describe('locale layout', () => {
  it('pre-renders every configured locale', () => {
    expect(generateStaticParams()).toEqual(routing.locales.map((locale) => ({ locale })));
  });

  it('uses the locale metadata', async () => {
    expect(await localeMetadata(params('hi'))).toEqual(await generateLocaleMetadata('hi'));
  });

  it.each(['en', 'hi'] as const)('renders %s pages with their language, fonts, skip link and navbar', async (locale) => {
    const element = await LocaleLayout({ children: <p id="page">page</p>, ...params(locale) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(element), 'text/html');
    const root = doc.documentElement;
    expect(root.getAttribute('lang')).toBe(locale);
    expect(root.className).toBe('font-inter-var font-devanagari-var');
    expect(doc.querySelector('a[href="#main-content"]')!.textContent).toBe(messages[locale].Navbar.skipToContent);
    expect(doc.querySelector('header nav')!.getAttribute('aria-label')).toBe(messages[locale].Navbar.primaryNav);
    expect(doc.querySelector('main#main-content #page')).not.toBeNull();
    // The theme is applied from <head>, before <body> exists, so the first paint is never the wrong theme
    expect(doc.head.querySelector('script')!.textContent).toBe(themeInitScript);
  });

  it('404s for an unknown locale', async () => {
    await expect(LocaleLayout({ children: null, ...params('fr') })).rejects.toThrow('NEXT_NOT_FOUND');
  });
});

describe('home page', () => {
  it('renders every section, the footer and the JSON-LD publisher', () => {
    const { container } = render(<Home />, { wrapper: withLocale('en') });
    for (const id of ['section-hero', 'section-about', 'section-metric', 'section-features', 'contact']) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
    const jsonLd = JSON.parse(container.querySelector('#schema-jsonld')!.textContent!);
    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      publisher: { '@type': 'Organization', name: 'AOSSIE', url: AOSSIE_URL },
    });
    expect(jsonLd.publisher.logo).toMatch(/^https:\/\/.+\/brand\/icons\/aossie_logo\.svg$/);
  });
});

describe.each([
  ['privacy', PrivacyPage, privacyMetadata, 'Privacy Policy'],
  ['terms', TermsPage, termsMetadata, 'Terms of Service'],
] as const)('%s page', (page, Page, pageMetadata, heading) => {
  it('has its own metadata', async () => {
    expect(await pageMetadata(params('hi'))).toEqual(await generateLocaleMetadata('hi', page));
  });

  async function renderPage(locale: TestLocale) {
    const element = await Page(params(locale));
    // LegalPage is an async server component: resolve it, then render its output.
    const content = await (element.type as (props: unknown) => Promise<React.ReactElement>)(element.props);
    return render(content, { wrapper: withLocale(locale) });
  }

  it('renders the repository document in English with the footer', async () => {
    await renderPage('en');
    expect(server.setRequestLocale).toHaveBeenCalledWith('en');
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    expect(article.querySelector('[lang="en"]')).not.toBeNull();
    expect(screen.queryByText(messages.en.Legal.englishOnly)).toBeNull();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('notes on Hindi pages that the document is English-only and keeps links in the locale', async () => {
    await renderPage('hi');
    expect(server.setRequestLocale).toHaveBeenCalledWith('hi');
    expect(screen.getByText(messages.hi.Legal.englishOnly)).toBeInTheDocument();
    const internal = Array.from(screen.getByRole('article').querySelectorAll('a'))
      .map((a) => a.getAttribute('href')!)
      .filter((href) => href.startsWith('/'));
    for (const href of internal) expect(href).toMatch(/^\/hi\/(privacy|terms)$/);
  });
});

describe('support page', () => {
  it('has its own metadata', async () => {
    expect(await supportMetadata(params('en'))).toEqual(await generateLocaleMetadata('en', 'support'));
  });

  it.each(['en', 'hi'] as const)('renders the %s support widget and footer', async (locale) => {
    const element = await SupportPage(params(locale));
    render(element, { wrapper: withLocale(locale) });
    expect(server.setRequestLocale).toHaveBeenCalledWith(locale);
    expect(screen.getByRole('heading', { level: 1, name: messages[locale].Support.title })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('next-intl request config', () => {
  type Config = (args: { requestLocale: Promise<string | undefined> }) => Promise<{ locale: string; messages: unknown }>;
  const resolve = (requestLocale: string | undefined) =>
    (getRequestConfig as unknown as Config)({ requestLocale: Promise.resolve(requestLocale) });

  it('serves the requested locale with its catalog', async () => {
    expect(await resolve('hi')).toEqual({ locale: 'hi', messages: messages.hi });
  });

  it('falls back to the default locale when none or an unknown one is requested', async () => {
    expect(await resolve(undefined)).toEqual({ locale: 'en', messages: messages.en });
    expect(await resolve('de')).toEqual({ locale: 'en', messages: messages.en });
  });

  it("property: always resolves to a configured locale and that locale's catalog", async () => {
    const requested = fc.option(fc.oneof(fc.constantFrom(...routing.locales), fc.string()), { nil: undefined });
    await fc.assert(
      fc.asyncProperty(requested, async (req) => {
        const { locale, messages: catalog } = await resolve(req);
        expect(routing.locales).toContain(locale);
        expect(catalog).toBe(messages[locale as TestLocale]);
        if (req && (routing.locales as readonly string[]).includes(req)) expect(locale).toBe(req);
      }),
    );
  });
});
