import type { Metadata } from 'next';
import enMessages from '@/messages/en.json';
import hiMessages from '@/messages/hi.json';
import { getSiteUrl } from '@/config/site';
import { LEGAL_PAGES, type LegalPage } from '@/config/legal';
import { SUPPORT_PAGE_PATH } from '@/config/support';

/** A page with its own metadata: a legal page or the support page. */
export type MetadataPage = LegalPage | 'support';

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  hi: hiMessages,
};

/** Metadata for the home page, or for the legal or support page when `page` is given. */
export async function generateLocaleMetadata(
  locale: string,
  page?: MetadataPage
): Promise<Metadata> {
  const messages = messagesMap[locale] || enMessages;
  const meta = !page ? messages.metadata : page === 'support' ? messages.Support : messages.Legal[page];

  const siteUrl = getSiteUrl();
  const path = !page ? '' : page === 'support' ? SUPPORT_PAGE_PATH : LEGAL_PAGES[page].path;
  const localeUrl = `${siteUrl}/${locale}${path}`;

  return {
    title: meta.title,
    description: meta.description,
    icons: {
      // Small PNGs first so browsers fetch a few KB instead of the 183 KB .ico;
      // the .ico stays as the universal fallback.
      icon: [
        { url: '/brand/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/brand/icons/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/brand/icons/favicon.ico', sizes: 'any' },
      ],
      apple: '/brand/icons/favicon-192.png',
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        en: `${siteUrl}/en${path}`,
        hi: `${siteUrl}/hi${path}`,
        'x-default': `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: localeUrl,
      siteName: 'Resonate - AOSSIE',
      // Social platforms do not render SVG previews, so the share image is a 1200x630 PNG
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'hi_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}
