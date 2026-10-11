import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import { defaultLanguage } from '@/config/languages';
import { generateLocaleMetadata } from '@/i18n/metadata';
import '../[locale]/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata(defaultLanguage);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLanguage} className={`${inter.variable} ${devanagari.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
