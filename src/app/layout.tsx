import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import your architecture components
import { ThemeProvider } from "./components/providers/theme-provider";
import { Navbar } from "./components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resonate - Social Voice Platform",
  description: "The Open-Source Voice of the Internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground">
        
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
      </body>
    </html>
  );
}