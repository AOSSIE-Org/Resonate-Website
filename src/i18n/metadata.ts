import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateLocaleMetadata(
  locale: string,
  namespace: string = 'metadata'
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resonate.aossie.org';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const localeUrl = `${siteUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
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
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}/brand/icons/resonate_logo.svg`],
    },
  };
}
