import type { Metadata } from "next";
import Link from "next/link";
import { PLAY_STORE_URL } from "@/config/links";
import "./[locale]/globals.css";

// Shared rooms are Android App Links (https://resonate.aossie.org/room/<id>): with the app
// installed they open in the app, otherwise they land on the website. A static export cannot
// send server redirects, so GitHub Pages serves this page for /room/<id> and the script below
// forwards those visitors to the Play Store.
const roomRedirectScript = `if (/^\\/room\\/[^/]+\\/?$/.test(location.pathname)) location.replace(${JSON.stringify(PLAY_STORE_URL)});`;

export const metadata: Metadata = {
  title: "Page not found | Resonate",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: roomRedirectScript }} />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <Link href="/en" className="underline">
            Go to Resonate
          </Link>
        </main>
      </body>
    </html>
  );
}
