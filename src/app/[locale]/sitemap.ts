import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
<<<<<<< HEAD
  const baseUrl = "https://resonate.aossie.org";
  return routing.locales.flatMap((locale) => [

=======

  const baseUrl = "https://resonate.aossie.org";

  return routing.locales.flatMap((locale) => [
>>>>>>> 5f2594f (readme updated according to current folder structure)
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]);
<<<<<<< HEAD
=======
  
>>>>>>> 5f2594f (readme updated according to current folder structure)
}