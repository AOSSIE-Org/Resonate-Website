import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* 1. APPLY VARIABLE HERE on HTML */
    <html lang="en" className={inter.variable}>
      {/* 2. Keep body simple */}
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}