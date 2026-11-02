import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // `redirects()` is ignored with `output: "export"`. src/app/global-not-found.tsx becomes
    // out/404.html, which GitHub Pages serves for /room/<id> and forwards to the Play Store.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
