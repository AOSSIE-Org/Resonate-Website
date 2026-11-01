import fs from 'fs';
import path from 'path';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/ui/Footer';
import { LegalDocument } from '@/lib/legal-markdown';
import { getPathname } from '@/i18n/navigation';
import { LEGAL_DOCUMENT_LOCALE, LEGAL_PAGES, type LegalPage as LegalPageName } from '@/config/legal';

// The documents are plain HTML from the Markdown renderer, so they are styled from the wrapper.
const DOCUMENT_CLASSES = [
  'text-base leading-relaxed text-primary',
  '[&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-medium [&_h1]:tracking-tighter [&_h1]:text-highlight sm:[&_h1]:text-5xl',
  '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight',
  '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-medium',
  '[&_p]:my-4 [&_p]:text-secondary',
  '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-secondary [&_li]:my-2 [&_li]:marker:text-muted',
  '[&_strong]:font-semibold [&_strong]:text-primary',
  '[&_a]:rounded-sm [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-yellow-600',
  '[&_a:focus-visible]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-brand-yellow',
  '[&_code]:rounded [&_code]:border [&_code]:border-default [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
].join(' ');

/** A legal page: the repository's Markdown document, with a note on locales it isn't translated into. */
export async function LegalPage({ locale, page }: { locale: string; page: LegalPageName }) {
  const t = await getTranslations({ locale, namespace: 'Legal' });
  const source = fs.readFileSync(path.join(process.cwd(), LEGAL_PAGES[page].file), 'utf8');
  const links = {
    privacy: getPathname({ href: LEGAL_PAGES.privacy.path, locale }),
    terms: getPathname({ href: LEGAL_PAGES.terms.path, locale }),
  };

  return (
    <div className="flex min-h-screen flex-col mx-4 sm:mx-8 lg:mx-16 2xl:mx-48">
      <article className="mx-auto w-full max-w-3xl flex-1 pt-12 sm:pt-16">
        {locale !== LEGAL_DOCUMENT_LOCALE && (
          <p className="mb-8 rounded-2xl border border-default bg-card px-4 py-3 text-sm text-muted">
            {t('englishOnly')}
          </p>
        )}
        <LegalDocument source={source} links={links} className={DOCUMENT_CLASSES} />
      </article>
      <div className="pb-4 pt-24">
        <Footer />
      </div>
    </div>
  );
}
