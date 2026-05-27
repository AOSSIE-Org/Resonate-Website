import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from "@/i18n/routing";
import "./globals.css";

// Import your architecture components
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Resonate - Social Voice Platform",
//   description: "The Open-Source Voice of the Internet",
// };


/**
 * Pre-render all locales at build time
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

/** 
 * Dynamic i18n metadata 
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return {
      title: messages.metadata?.title ?? "Resonate",
      description:
        messages.metadata?.description ??
        "The Open-Source Voice of the Internet",
    };
  } catch (error) {
    console.error("Metadata load failed for locale:", locale, error);
    return {
      title: "Resonate",
      description: "The Open-Source Voice of the Internet",
    };
  }
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
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error("Invalid locale:", error);
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages} >
          {/* Provider must come before Navbar to inject theme state */}
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