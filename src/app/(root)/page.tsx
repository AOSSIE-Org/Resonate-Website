import type { Metadata } from 'next';
import { defaultLanguage } from '@/config/languages';
import { generateLocaleMetadata } from '@/i18n/metadata';

const defaultLocalePath = `/${defaultLanguage}`;

// A static export cannot send HTTP redirects, so `/` ships the default
// locale's metadata (for crawlers and link previews) and forwards in the browser.
// The inline script redirects as soon as it is parsed; a meta refresh alone only
// fires after every CSS and JS file has loaded, which showed a blank page on first
// visits. The meta refresh and the link remain for browsers without JavaScript.
export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata(defaultLanguage);
}

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(defaultLocalePath)})` }} />
      <meta httpEquiv="refresh" content={`0; url=${defaultLocalePath}`} />
      <noscript>
        <a href={defaultLocalePath}>Continue to Resonate</a>
      </noscript>
    </>
  );
}
