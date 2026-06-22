"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import BackgroundTile from "../ui/BackgroundTile";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { useIntersectionObserver } from "../ui/useIntersectionObserver";

export function About() {
  const t = useTranslations("About");
  const { ref: revealRef, isVisible } = useIntersectionObserver();

  return (
    <section className="relative flex flex-col items-center md:pt-56 overflow-hidden min-h-screen">
      {/* Top Section: Titles and Description */}
      <div className="px-4 md:px-8 xl:px-16 relative z-10 pb-16 w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-4xl font-medium tracking-tighter sm:text-5xl leading-tight text-(--foreground) text-center md:text-left">
              {t("title1")}
            </h2>
            <h2 className="text-4xl font-medium tracking-tighter sm:text-5xl leading-tight text-(--foreground) text-center md:text-left">
              {t("title2")}
            </h2>
            <p className="w-full md:max-w-3/5 text-(--foreground-muted) md:text-lg/relaxed pt-8 px-4 md:px-0 text-center md:text-left">
              {t("description")}
            </p>
      <Image
        src="/assets/mockups/phone_about.webp"
        alt={t("mockupAlt")}
        width={400}
        height={800}
        className="md:hidden flex w-2/3 lg:w-2/3 h-auto pt-8"
        priority
      />
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
          <div className="relative z-10 p-8 w-full" ref={revealRef}>
            <h3 className={`text-3xl md:text-6xl font-bold tracking-tighter leading-tight uppercase text-highlight text-center sm:text-left ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
              {t("tagline1")}
            </h3>
            <h3 className={`text-3xl md:text-6xl font-light italic tracking-tighter text-(--foreground) leading-tight uppercase text-center sm:text-left ${isVisible ? 'animate-luxury-reveal-2' : 'opacity-0'}`}>
              {t("tagline2")}
            </h3>
          <div className="flex items-center justify-center sm:justify-start mt-10 md:pt-16">
              <Button 
                variant="type2" 
                right_arrow 
                href="https://www.youtube.com/@AOSSIE-Org"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("videoButton")}
              </Button>
          </div>
          <div className="flex items-center gap-6 pt-16">
            <div>
              <p className="text-(--foreground-secondary) text-sm w-full">
              {t("availability1")}
            </p>
              <p className="text-(--foreground-secondary) text-sm w-full">
              {t("availability2")}
            </p>
            </div>
            <Link 
              href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
              target="_blank"
              rel="noopener noreferrer"
              className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
            >
              <Image
                    src="/assets/icons/playstore.svg"
                    alt={t("playStoreAlt")}
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary"
                  />
            </Link>
            <Link 
              href="https://apps.apple.com/app/resonate"
              target="_blank"
              rel="noopener noreferrer"
              className="border p-4 rounded-full active:scale-95 hover:scale-105 transition-transform smooth shrink-0"
            >
              <Image
                    src="/assets/icons/apple.svg"
                    alt={t("appStoreAlt")}
                    width={24}
                    height={24}
                    className="h-4 w-4 md:h-6 md:w-6 icon-secondary theme-icon"
                  />
            </Link>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
