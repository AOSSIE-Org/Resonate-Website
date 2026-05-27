"use client";

import Link from "next/link";
import { HeroVisuals } from "./HeroVisuals";

// TEXT CONSTANTS (Preparation for i18n)
const TEXT = {
  headline: "The Open-Source Voice of the Internet",
  subHeadline: "Social Audio for everyone",
  maintainedBy: "A Project Maintained by",
  orgName: "AOSSIE",
} as const;

export function Hero() {
  return (
    // FIX 1: Replaced `min-h-screen` with `min-h-[100svh]` to prevent address bar resizing jumps
    <section className="relative flex flex-col items-center justify-center sm:justify-around min-h-[100svh] pt-8 sm:pt-14 pb-[100vw] sm:pb-0">

      {/* Text Block */}
      <div className="flex flex-col items-center gap-4 text-center px-2 sm:px-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-(--foreground) tracking-tighter">
            {TEXT.headline}
          </h1>
          {/* Hidden on mobile — subheadline only shown on sm+ */}
          <p className="hidden sm:block text-4xl lg:text-5xl xl:text-6xl font-medium text-(--foreground) tracking-tighter">
            {TEXT.subHeadline}
          </p>
        </div>

        <div className="inline-flex flex-wrap justify-center items-center gap-2 text-lg sm:text-2xl text-muted">
          <span>{TEXT.maintainedBy}</span>
          <Link
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center gap-1"
            aria-label="Visit AOSSIE website (opens in new tab)"
          >
            {TEXT.orgName}
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
          aria-label="Download Resonate on Google Play (opens in new tab)"
          className="inline-flex sm:hidden h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition-all hover:scale-105 active:scale-95 bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) border-[1.5px] hover:bg-(--button-primary-hover-bg) hover:border-(--button-primary-hover-border)"
        >
          Download Now
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