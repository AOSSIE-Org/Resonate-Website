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
      icon: '/brand/icons/favicon.ico',
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        en: `${siteUrl}/en`,
        hi: `${siteUrl}/hi`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: localeUrl,
      siteName: 'Resonate - AOSSIE',
      images: [
        {
          url: `${siteUrl}/brand/icons/resonate_logo.svg`,
          width: 500,
          height: 500,
          alt: 'Resonate Logo',
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'hi_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/brand/icons/resonate_logo.svg`],
    },
  };
}
