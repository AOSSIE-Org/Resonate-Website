import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import sitemap from '@/app/sitemap';
import { generateLocaleMetadata } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import { defaultLanguage, languages } from '@/config/languages';
import en from '@/messages/en.json';
import hi from '@/messages/hi.json';

const SITE = 'https://resonate.aossie.org';

// Pin the production URL so a NEXT_PUBLIC_SITE_URL set in the shell or CI can't change
// the expectations; individual tests may still stub their own value on top.
beforeEach(() => vi.stubEnv('NEXT_PUBLIC_SITE_URL', SITE));
afterEach(() => vi.unstubAllEnvs());

describe('locale configuration', () => {
  it('routes every configured language, English first and default', () => {
    expect(routing.locales).toEqual(languages.map((l) => l.code));
    expect(routing.defaultLocale).toBe(defaultLanguage);
    expect(defaultLanguage).toBe('en');
  });

  it('gives every language a native label', () => {
    for (const lang of languages) {
      expect(lang.label.trim(), lang.code).not.toBe('');
    }
  });
});

describe('sitemap', () => {
  it('lists one production URL per locale', () => {
    expect(sitemap().map((e) => e.url)).toEqual(routing.locales.map((l) => `${SITE}/${l}`));
  });

  it('property: NEXT_PUBLIC_SITE_URL with or without a trailing slash yields clean locale URLs', () => {
    fc.assert(
      fc.property(fc.domain(), fc.boolean(), (domain, slash) => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', `https://${domain}${slash ? '/' : ''}`);
        for (const entry of sitemap()) {
          expect(entry.url).toMatch(new RegExp(`^https://${domain.replace(/\./g, '\\.')}/(en|hi)$`));
        }
      }),
    );
  });
});

describe('generateLocaleMetadata', () => {
  it.each([
    ['en', en],
    ['hi', hi],
  ] as const)('uses the %s catalog for title and description', async (locale, catalog) => {
    const meta = await generateLocaleMetadata(locale);
    expect(meta.title).toBe(catalog.metadata.title);
    expect(meta.description).toBe(catalog.metadata.description);
  });

  it('falls back to English for an unknown locale', async () => {
    const meta = await generateLocaleMetadata('xx');
    expect(meta.title).toBe(en.metadata.title);
  });

  it('declares canonical, hreflang alternates and x-default that match the sitemap', async () => {
    const meta = await generateLocaleMetadata('hi');
    expect(meta.alternates?.canonical).toBe(`${SITE}/hi`);
    expect(meta.alternates?.languages).toEqual({ en: `${SITE}/en`, hi: `${SITE}/hi`, 'x-default': `${SITE}/en` });
    expect(sitemap().map((e) => e.url)).toContain(meta.alternates?.canonical);
  });

  it('shares a 1200x630 raster image, because social platforms ignore SVG previews', async () => {
    const meta = await generateLocaleMetadata('en');
    const [image] = meta.openGraph?.images as { url: string; width: number; height: number }[];
    expect(image).toMatchObject({ url: `${SITE}/og-image.png`, width: 1200, height: 630 });
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', images: [`${SITE}/og-image.png`] });
    expect(meta.openGraph).toMatchObject({ locale: 'en_US' });
    expect((await generateLocaleMetadata('hi')).openGraph).toMatchObject({ locale: 'hi_IN' });
  });

  it('serves small PNG favicons before the large .ico fallback', async () => {
    const meta = await generateLocaleMetadata('en');
    const icons = (meta.icons as { icon: { url: string; type?: string }[] }).icon;
    expect(icons[0].type).toBe('image/png');
    expect(icons.at(-1)?.url).toMatch(/\.ico$/);
  });
});
