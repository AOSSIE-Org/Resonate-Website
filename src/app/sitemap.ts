import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/config/site';
import { LEGAL_PAGES } from '@/config/legal';
import { SUPPORT_PAGE_PATH } from '@/config/support';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const cleanBaseUrl = getSiteUrl();

  return routing.locales.flatMap((locale): MetadataRoute.Sitemap => [
    {
      url: `${cleanBaseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...[...Object.values(LEGAL_PAGES).map((page) => page.path), SUPPORT_PAGE_PATH].map((path) => ({
      url: `${cleanBaseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]);
}
