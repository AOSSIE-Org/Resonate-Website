import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from "@/i18n/routing";
import { generateLocaleMetadata } from "@/i18n/metadata";

import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Only Hindi pages render Devanagari glyphs. Declaring the face without a
// preload hint keeps it available (the browser fetches it the moment any
// Devanagari text is laid out) while English pages no longer download the
// 120 KB file up front, ahead of the hero image.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  hi: hiMessages as Record<string, unknown>,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata(locale, 'metadata');
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = messagesMap[locale] || enMessages;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages} formats={{}} timeZone="UTC" now={new Date(0)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-(--button-primary-bg) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-(--button-primary-text) focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            >
              {(messages.Navbar as Record<string, string> | undefined)?.skipToContent ?? "Skip to content"}
            </a>
            <Navbar />
            <LenisProvider>
              <main id="main-content" className="pt-20">
                {children}
              </main>
            </LenisProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
