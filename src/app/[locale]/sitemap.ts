import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resonate.aossie.org";
  return routing.locales.flatMap((locale) => [

    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]);
}