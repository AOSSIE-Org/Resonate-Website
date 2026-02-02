import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "./globals.css";

// Import your architecture components
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";

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

            <main className="pt-20">
              {children}
            </main>

          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}