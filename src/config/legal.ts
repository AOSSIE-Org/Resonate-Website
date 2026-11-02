import type { Locale } from './languages';

/**
 * The legal pages: their path below the locale prefix and the repository file
 * (read from the project root at build time) that each one renders.
 */
export const LEGAL_PAGES = {
  privacy: { path: '/privacy', file: 'PRIVACY.md' },
  terms: { path: '/terms', file: 'TERMS.md' },
} as const;

export type LegalPage = keyof typeof LEGAL_PAGES;

/** Language the legal documents are written in; other locales show a note above them. */
export const LEGAL_DOCUMENT_LOCALE: Locale = 'en';
