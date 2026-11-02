/** Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL to override it (e.g. for a preview deploy). */
const DEFAULT_SITE_URL = 'https://resonate.aossie.org';

/** Reads the site origin at call time, without a trailing slash, so build-time env overrides apply. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

/** Site origin without a trailing slash, e.g. `${SITE_URL}/brand/icons/aossie_logo.svg`. */
export const SITE_URL = getSiteUrl();
