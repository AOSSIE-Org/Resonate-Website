"use client";

import { useEffect, useRef, useState } from "react";
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

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1280px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      if (bgPhoneRef.current) {
        bgPhoneRef.current.style.opacity = "0";
      }
      return;
    }

    let rafId: number | null = null;

    // Cached layout measurements to prevent layout thrashing
    let sectionOffsetTop = 0;
    let sectionHeight = 0;
    let cachedVh = window.innerHeight;
    let cachedVw = window.innerWidth;

    const updateMeasurements = () => {
      if (!sectionRef.current) return;
      
      let top = 0;
      let curr: HTMLElement | null = sectionRef.current;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      sectionOffsetTop = top;
      sectionHeight = sectionRef.current.offsetHeight;
      cachedVh = window.innerHeight;
      cachedVw = window.innerWidth;
    };

    updateMeasurements();

    const getMarginX = (viewportWidth: number): number => {
      if (viewportWidth >= 1536) return 192;
      if (viewportWidth >= 1024) return 64;
      if (viewportWidth >= 640) return 32;
      return 16;
    };

    let isIntersecting = true;

    const animate = () => {
      if (!isIntersecting || !sectionRef.current || !bgPhoneRef.current) {
        rafId = null;
        return;
      }

      // 1. Calculate opacity based on proximity of the section center to viewport center
      const sHeight = sectionHeight || cachedVh;
      const sectionCenter = (sectionOffsetTop - window.scrollY) + sHeight / 2;
      const viewportCenter = cachedVh / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Fade range: start fading out when distanceFromCenter is > cachedVh * 0.4,
      // and be fully transparent when distanceFromCenter is >= cachedVh * 0.9.
      const fadeStart = cachedVh * 0.4;
      const fadeEnd = cachedVh * 0.9;
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
      const maxTranslateX = cachedVw / 2 - getMarginX(cachedVw);
      const finalTranslateX = Math.min(cachedVw * 0.28, maxTranslateX);

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
      if (!isIntersecting) return;
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
      updateMeasurements();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    // Use ResizeObserver to update measurements when page layout shifts
    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && rafId === null) {
          rafId = requestAnimationFrame(animate);
        }
      },
      {
        rootMargin: "100px 0px 100px 0px",
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial calculation
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <section id="section-metric" ref={sectionRef} className="relative flex flex-col xl:pt-56 overflow-hidden xl:min-h-screen">
      {/* Top Section: Titles and Description */}
      <div className="px-4 md:px-8 xl:px-0 2xl:px-16 relative z-10 w-full">
        <div className="flex flex-col py-8">
          <div className="flex flex-col md:flex-row gap-16 justify-center items-center xl:justify-start">
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
          <div className="flex flex-col items-center justify-center xl:items-start xl:justify-start">
            <div className="flex w-full items-center justify-center xl:justify-start">
              <div className="xl:hidden w-[226px] sm:w-[266px] aspect-[9/18] relative my-12">
                <Image
                  src="/assets/mockups/phone_metric.webp"
                  alt={t("mockupAlt")}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center xl:items-start xl:justify-start sm:mt-12" ref={revealRef}>
              <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter leading-tight uppercase text-highlight text-center xl:text-left ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
                {t("weInnovate")}
              </h3>
              <h3 className={`text-4xl md:text-6xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center xl:text-left ${isVisible ? 'animate-luxury-reveal-2' : 'opacity-0'}`}>
                {t("weEducate")}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: BackgroundTile with Headings on top */}
      <div className="w-full px-4 md:px-8 xl:px-0 2xl:px-16">
        <div className="relative flex w-full justify-center xl:justify-start">
          {/* Background Tile - Centered in this container, sent to back */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
            <BackgroundTile />
          </div>

          {/* Heading on top of the tile */}
          <div className="relative z-10 p-6 w-full flex flex-col items-center xl:items-start">
            <div className="flex flex-col xl:flex-row items-center xl:justify-start xl:items-start gap-6 xl:gap-10">
              <Image
                src="/assets/icons/aossie_logo.svg"
                alt={t("playStoreAlt")}
                width={24}
                height={24}
                className="h-44 w-44 xl:h-64 xl:w-64 icon-secondary mt-4 xl:mt-0"
              />
              <p className="w-full max-w-xl xl:max-w-[550px] text-(--foreground-muted) xl:text-lg/relaxed pt-8 text-center xl:text-left">
                {t("aossieDescription")}
              </p>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-6 pt-8 xl:pt-16">
              <div>
                <p className="text-(--foreground-secondary) text-center xl:text-left text-sm w-full">
                  {t("findMore")}
                </p>
                <p className="text-(--foreground-secondary) text-center xl:text-left text-sm w-full">
                  {t("aboutAossieHere")}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3">
                <Link
                  href="mailto:aossie.oss@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
                >
                  <Image
                    src="/assets/icons/gmail.svg"
                    alt={t("gmailAlt")}
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
                    alt={t("discordAlt")}
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
                    alt={t("twitterAlt")}
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
                    alt={t("githubAlt")}
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
                    alt={t("gitlabAlt")}
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
            {/* <div className="w-[80%] hidden xl:block overflow-hidden">
              <Image
                src="/assets/mockups/phone.webp"
                alt={t("backgroundPhoneAlt")}
                width={400}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
