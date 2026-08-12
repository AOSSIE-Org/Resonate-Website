import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from "@/i18n/routing";
import { generateLocaleMetadata } from "@/i18n/metadata";
import "./globals.css";

import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/Navbar";

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  hi: hiMessages as Record<string, unknown>,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

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

export default async function RootLayout({
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
    <html lang={locale} className={`${inter.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages} formats={{}} timeZone="UTC" now={new Date(0)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <LenisProvider>
              <main className="pt-20">
                {children}
              </main>
            </LenisProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}