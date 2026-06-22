"use client";

import Link from "next/link";
import { HeroVisuals } from "./HeroVisuals";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    // FIX 1: Replaced `min-h-screen` with `min-h-[100svh]` to prevent address bar resizing jumps
    <section className="relative flex flex-col items-center justify-center sm:justify-around min-h-[100svh] pt-8 sm:pt-14 pb-[100vw] sm:pb-0">

      {/* Text Block */}
      <div className="flex flex-col items-center gap-4 text-center px-4 md:px-8 xl:px-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-(--foreground) tracking-tighter animate-luxury-reveal-1">
            {t("headline")}
          </h1>
          {/* Hidden on mobile — subheadline only shown on sm+ */}
          <p className="hidden sm:block text-4xl lg:text-5xl xl:text-6xl font-medium text-(--foreground) tracking-tighter animate-luxury-reveal-2">
            {t("subHeadline")}
          </p>
        </div>

        <div className="inline-flex flex-wrap justify-center items-center gap-2 text-lg sm:text-2xl text-muted animate-luxury-reveal-3">
          <span>{t("maintainedBy")}</span>
          <Link
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center gap-1"
            aria-label={t("visitAossie")}
          >
            {t("orgName")}
            {/* North-east arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>

        {/* Download button — mobile only */}
        <Link
          href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("downloadAria")}
          className="inline-flex sm:hidden h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) border-[1.5px] hover:bg-(--button-primary-hover-bg) hover:border-(--button-primary-hover-border) animate-luxury-reveal-4"
        >
          {t("download")}
        </Link>
      </div>

      {/* Visuals */}
      {/* FIX 2: Added `transform-gpu` and `will-change-transform` for hardware acceleration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center sm:relative sm:flex-1 sm:flex sm:items-end sm:w-full sm:mt-8 transform-gpu will-change-transform">
        <HeroVisuals />
      </div>

    </section>
  );
}