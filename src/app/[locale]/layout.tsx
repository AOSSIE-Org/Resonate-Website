import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resonate - Social Voice Platform",
  description: "The Open-Source Voice of the Internet",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    /* 1. APPLY VARIABLE HERE on HTML */
    <html lang={locale} className={inter.variable}>
      {/* 2. Keep body simple */}
      <body className="antialiased font-sans">
        <NextIntlClientProvider locale={locale} messages={messages} >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}