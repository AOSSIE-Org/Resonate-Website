import { ReactNode } from "react";
import "../[locale]/globals.css";

/**
 * Root layout for the bare `/` route, which only redirects to the default
 * locale. The localized pages have their own root layout in `[locale]/`
 * so that `<html lang>` can carry the real page language.
 */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
