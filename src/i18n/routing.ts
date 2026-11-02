import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi'],
  defaultLocale: 'en',
  // The locale lives in the URL, so no NEXT_LOCALE cookie is needed; switching language would otherwise
  // write one, and the Privacy Policy says the site stores nothing but the theme preference.
  localeCookie: false,
});