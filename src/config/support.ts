import { GSOC_URL, STABILITY_NEXUS_URL } from './links';

/** Path of the support page below the locale prefix. */
export const SUPPORT_PAGE_PATH = '/support';

/** Logos shown on the support page, served from public/brand. */
export const SUPPORT_LOGOS = {
  organization: '/brand/icons/aossie_logo.svg',
  project: '/brand/icons/resonate_logo.svg',
} as const;

/** Organisations that support the project, shown under "Supported by" (proper nouns, not translated). */
export const SUPPORTERS = [
  { name: 'Google Summer of Code', link: GSOC_URL },
  { name: 'Stability Nexus', link: STABILITY_NEXUS_URL },
];
