"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BackgroundTile from "../ui/BackgroundTile";
import { Link } from "@/i18n/navigation";
import { useIntersectionObserver } from "../ui/useIntersectionObserver";

export function Metric() {
  const t = useTranslations("Metric");
  const { ref: revealRef, isVisible } = useIntersectionObserver();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgPhoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    let isDesktop = mediaQuery.matches;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      isDesktop = e.matches;
      if (!isDesktop && bgPhoneRef.current) {
        bgPhoneRef.current.style.opacity = "0";
      }
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    if (!isDesktop) {
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }

    let rafId: number | null = null;

    const getMarginX = (viewportWidth: number): number => {
      if (viewportWidth >= 1280) return 192;
      if (viewportWidth >= 1024) return 64;
      if (viewportWidth >= 640) return 32;
      return 16;
    };

    const animate = () => {
      if (!sectionRef.current || !bgPhoneRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // 1. Calculate opacity based on proximity of the section center to viewport center
      const sectionHeight = rect.height || vh;
      const sectionCenter = rect.top + sectionHeight / 2;
      const viewportCenter = vh / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Fade range: start fading out when distanceFromCenter is > vh * 0.4,
      // and be fully transparent when distanceFromCenter is >= vh * 0.9.
      const fadeStart = vh * 0.4;
      const fadeEnd = vh * 0.9;
      let opacity = 0;

      if (distanceFromCenter <= fadeStart) {
        opacity = 1;
      } else if (distanceFromCenter < fadeEnd) {
        opacity = 1 - (distanceFromCenter - fadeStart) / (fadeEnd - fadeStart);
      } else {
        opacity = 0;
      }

      bgPhoneRef.current.style.opacity = `${opacity}`;

      // 2. Horizontal translation (matching HeroVisuals logic)
      const maxTranslateX = vw / 2 - getMarginX(vw);
      const finalTranslateX = Math.min(vw * 0.28, maxTranslateX);

      // Offset the background phone to the left of the foreground/moving phone
      // The foreground phone translates by finalTranslateX.
      // We offset the background phone by -120px to place it to the left.
      const translateX = finalTranslateX - 280;

      // Vertical offset to make it look balanced (slightly shifted up by -40px)
      const translateY = 0;

      bgPhoneRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial calculation
    animate();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-col md:pt-56 overflow-hidden md:min-h-screen">
      {/* Top Section: Titles and Description */}
      <div className="px-4 md:px-8 xl:px-16 relative z-10 w-full">
        <div className="flex flex-col py-8">
          <div className="flex flex-col gap-16 sm:flex-row md:flex-row justify-center items-center sm:justify-start">
            <div className="flex flex-col gap-6">
              <h1 className="text-6xl font-bold text-center text-highlight">
                4.6+
              </h1>
              <h1 className="text-3xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center">
                {t("storeRatingPart1")}
                <br />
                {t("storeRatingPart2")}
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-6xl font-bold text-center text-highlight">
                6K+
              </h1>
              <h1 className="text-3xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center">
                {t("happyContributorsPart1")}
                <br />
                {t("happyContributorsPart2")}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-6">
              <h1 className="text-6xl font-bold text-center text-highlight">
                1K+
              </h1>
              <h1 className="text-3xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center">
                {t("uniqueDownloadsPart1")}
                <br />
                {t("uniqueDownloadsPart2")}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
            <div className="flex w-full items-center justify-center">
            <Image
              src="/assets/mockups/phone_metric.webp"
              alt={t("mockupAlt")}
              width={400}
              height={800}
              className="md:hidden flex w-2/3 lg:w-2/3 h-auto my-12"
              priority
            />
            </div>
            <div className="flex flex-col items-center justify-center md:items-start md:justify-start sm:mt-12" ref={revealRef}>
              <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase text-highlight text-center sm:text-left ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
                {t("weEducate")}
              </h3>
              <h3 className={`text-4xl md:text-6xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center sm:text-left ${isVisible ? 'animate-luxury-reveal-2' : 'opacity-0'}`}>
                {t("weInnovate")}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: BackgroundTile with Headings on top */}
      <div className="w-full px-4 md:px-8 xl:px-16">
        <div className="relative flex w-full justify-center sm:justify-start">
          {/* Background Tile - Centered in this container, sent to back */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
            <BackgroundTile />
          </div>

          {/* Heading on top of the tile */}
          <div className="relative z-10 p-6 w-full">
            <div className="flex flex-col sm:flex-row md:flex-row items-center md:justify-start md:items-start gap-2 sm:gap-10">
              <Image
                src="/assets/icons/aossie_logo.svg"
                alt={t("playStoreAlt")}
                width={24}
                height={24}
                className="h-44 w-44 md:h-64 md:w-64 icon-secondary mt-4 sm:mt-0"
              />
              <p className="w-full md:max-w-1/3 text-(--foreground-muted) md:text-lg/relaxed pt-8 text-center md:text-left">
                {t("aossieDescription")}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 pt-8 md:pt-16">
              <div>
                <p className="text-(--foreground-secondary) text-center md:text-left text-sm w-full">
                  {t("findMore")}
                </p>
                <p className="text-(--foreground-secondary) text-sm w-full">
                  {t("aboutAossieHere")}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="mailto:aossie.oss@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/gmail.svg"
                    alt="Gmail"
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary"
                  />
                </Link>
                <Link
                  href="https://discord.gg/hjUhu33uAn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/discord.svg"
                    alt="Discord"
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary "
                  />
                </Link>
                <Link
                  href="https://twitter.com/aossie_org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/twitter.svg"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary theme-icon"
                  />
                </Link>
                <Link
                  href="https://github.com/AOSSIE-Org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/github.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary theme-icon"
                  />
                </Link>
                <Link
                  href="https://gitlab.com/aossie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/gitlab.svg"
                    alt="GitLab"
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background phone wrapper matching HeroVisuals coordinate system */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0 overflow-hidden">
        <div className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] md:max-w-[480px] mx-auto h-full">
          <div
            ref={bgPhoneRef}
            className="absolute bottom-16 left-[20%] w-[88%]"
            style={{
              transformOrigin: "center bottom",
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0) scale(1)",
              contain: "paint",
              opacity: 0,
            }}
          >
            <div className="w-[80%] hidden xl:block overflow-hidden">
              <Image
                src="/assets/mockups/phone.webp"
                alt="Background phone mockup"
                width={400}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
