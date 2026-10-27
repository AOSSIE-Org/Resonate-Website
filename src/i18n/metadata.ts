import type { Metadata } from 'next';
import enMessages from '@/messages/en.json';
import hiMessages from '@/messages/hi.json';

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  hi: hiMessages,
};

export async function generateLocaleMetadata(
  locale: string,
  namespace: 'metadata' = 'metadata'
): Promise<Metadata> {
  const messages = messagesMap[locale] || enMessages;
  const meta = messages[namespace] || enMessages.metadata;

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resonate.aossie.org';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const localeUrl = `${siteUrl}/${locale}`;

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
        en: `${siteUrl}/en`,
        hi: `${siteUrl}/hi`,
        'x-default': `${siteUrl}/en`,
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
