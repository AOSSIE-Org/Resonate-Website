import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resonate.aossie.org';
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  return routing.locales.map((locale) => ({
    url: `${cleanBaseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
