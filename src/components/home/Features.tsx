"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useIntersectionObserver } from "../ui/useIntersectionObserver";
import { FeatureIllustration, type FeatureKind } from "./FeatureIllustrations";
import { MockupImage } from "../ui/MockupImage";

export function Features() {
  const t = useTranslations("Features");
  const { ref: revealRef, isVisible } = useIntersectionObserver();
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const [hasSwiped, setHasSwiped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const features: { id: number; cardKey: string; titleKey: string; kind: FeatureKind }[] = [
    { id: 0, cardKey: "card1", titleKey: "feature1Title", kind: "live-rooms" },
    { id: 1, cardKey: "card2", titleKey: "feature2Title", kind: "scheduled-rooms" },
    { id: 2, cardKey: "card3", titleKey: "feature3Title", kind: "stories" },
    { id: 3, cardKey: "card4", titleKey: "feature4Title", kind: "friends-calls" },
    { id: 4, cardKey: "card5", titleKey: "feature5Title", kind: "audio-spaces" },
    { id: 5, cardKey: "card6", titleKey: "feature6Title", kind: "moderation" },
  ];

  const handlePrev = () => {
    setActiveFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    setHasSwiped(true);
  };

  const handleNext = () => {
    setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    setHasSwiped(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section id="section-features" className="relative flex flex-col pt-16 sm:pt-24 xl:pt-56 overflow-hidden min-h-screen" ref={revealRef}>

      <div className="w-full px-4 md:px-8 xl:px-0 2xl:px-16 flex-1 flex flex-col gap-12 relative">
        
        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (xl+) */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex flex-col gap-6 xl:gap-6 flex-1">
          
          {/* Top Row: Community Info (Left) and Tech Stack (Right) */}
          <div id="features-top-row" className="relative z-10 grid grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-x-8 items-start">

            {/* Left: Community Block */}
            <div className="flex flex-col gap-6 text-left min-w-0">
              <h2 className={`text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight uppercase leading-none text-balance ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
                <span className="text-(--foreground)">{t("joinCommunity").split(" ").slice(0, 2).join(" ")} </span>
                <span className="text-highlight">{t("joinCommunity").split(" ").slice(2).join(" ")}</span>
              </h2>
              <p className="text-(--foreground-muted) text-base lg:text-lg max-w-lg leading-relaxed text-pretty">
                {t("communityDescription")}
              </p>
              <div className="mt-2">
                <Button 
                  variant="type2"
                  href="https://github.com/AOSSIE-Org/Resonate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center gap-2">
                    {t("contributeButton")}
                    <Image
                      src="/assets/icons/github.svg"
                      alt="GitHub logo"
                      width={20}
                      height={20}
                      className="w-5 h-5 theme-icon"
                    />
                  </span>
                </Button>
              </div>
            </div>

            {/* Middle Column Spacer: Top part of the moving phone mockup */}
            <div id="features-phone-slot" className="w-full pointer-events-none self-stretch" />

            {/* Right: Tech Stack Block */}
            <div className="flex flex-col gap-6 text-left justify-self-end w-full max-w-md min-w-0">
              <h3 className="italic font-light uppercase tracking-tight text-2xl xl:text-3xl 2xl:text-4xl text-(--foreground) leading-tight text-balance">
                {t("techStack")}
              </h3>
              
              {/* Tech Stack Card */}
              <div id="features-tech-card" className="rounded-2xl border border-card p-6 xl:p-8 bg-tech-stack-card shadow-card backdrop-blur-md">
                <p className="text-xs font-semibold tracking-wider text-(--foreground-muted) uppercase mb-6">
                  {t("mobileDev")}
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    { name: t("flutter"), icon: "/assets/icons/flutter.svg" },
                    { name: t("dart"), icon: "/assets/icons/dart.svg" },
                    { name: t("appwrite"), icon: "/assets/icons/appwrite.svg" },
                    { name: t("livekit"), icon: "/assets/icons/livekit.svg" }
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-neutral-200/50 shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={tech.icon}
                          alt={`${tech.name} logo`}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="font-semibold text-base text-(--foreground)">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Row: Scrolling Feature Cards Marquee */}
          <div id="features-marquee-row" className="flex flex-col gap-8 relative z-30 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mt-2 xl:-mt-[2px]">
            {/* Embedded styles for marquee animation */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.3333%); }
              }
              .animate-marquee {
                animation: marquee 25s linear infinite;
              }
              .animate-marquee:hover,
              .animate-marquee:focus-within {
                animation-play-state: paused;
              }
            `}} />
            
            {/* The infinite marquee row */}
            <div className="flex w-max gap-6 px-6 animate-marquee py-4">
              {/* We repeat the 6 features 3 times to ensure a seamless scroll loop */}
              {[...features, ...features, ...features].map((feat, index) => {
                return (
                  <button
                    type="button"
                    key={`${feat.id}-${index}`}
                    onClick={() => setActiveFeature(feat.id)}
                    onMouseEnter={() => setHoveredFeature(feat.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onFocus={() => setHoveredFeature(feat.id)}
                    onBlur={() => setHoveredFeature(null)}
                    className="group relative flex h-36 w-80 shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-card bg-feature-card p-5 text-left font-sans shadow-card transition-[translate,border-color,box-shadow] duration-500 ease-out cursor-pointer select-none hover:-translate-y-1 hover:border-brand-yellow/60 hover:shadow-xl hover:shadow-brand-yellow/10 focus-visible:outline-none focus-visible:border-brand-yellow motion-reduce:hover:translate-y-0"
                  >
                    {/* Corner glow (cheap: gradient + opacity, no blur filter) */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,var(--color-brand-yellow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                    />
                    {/* Top sheen line */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-(--foreground)/20 to-transparent"
                    />
                    <FeatureIllustration
                      kind={feat.kind}
                      className="absolute right-4 top-4 h-16 w-16 text-(--foreground-muted) transition-[scale,color] duration-500 ease-out group-hover:scale-105 group-hover:text-(--foreground)"
                    />
                    <span className="text-[11px] font-semibold tracking-[0.22em] text-(--foreground-muted) uppercase">
                      {String(feat.id + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-balance text-lg font-bold uppercase leading-tight tracking-wider text-(--foreground) transition-colors duration-500 group-hover:text-highlight">
                      {t(feat.cardKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Centered Active Feature Text below Phone mockup */}
          <div id="features-hover-cue-row" aria-live="polite" className="text-center pt-5 pb-5 relative z-30 flex items-center justify-center gap-3 min-h-[80px]">
            {hoveredFeature !== null ? (
              <p className="text-xl lg:text-2xl xl:text-3xl font-medium text-(--foreground) transition-opacity duration-300">
                {t(features[hoveredFeature].titleKey)}
              </p>
            ) : (
              <div className="flex items-center justify-center gap-3 text-xl lg:text-2xl xl:text-3xl font-medium text-(--foreground-muted) transition-opacity duration-300">
                <Image
                  src="/assets/icons/hover_cue.svg"
                  alt="Hover Cue"
                  width={32}
                  height={32}
                  className="h-8 w-auto icon-secondary opacity-50 theme-icon"
                />
                <span>{t("hoverCueText")}</span>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (<xl) */}
        {/* ========================================================================= */}
        <div className="flex xl:hidden flex-col gap-10">
          
          {/* Top Block: Community */}
          <div className="flex flex-col gap-5 text-center items-center">
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight uppercase ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
              <span className="text-(--foreground)">{t("joinCommunity").split(" ").slice(0, 2).join(" ")} </span>
              <span className="text-highlight">{t("joinCommunity").split(" ").slice(2).join(" ")}</span>
            </h2>
            <p className="text-(--foreground-muted) text-sm sm:text-base leading-relaxed max-w-sm px-4">
              {t("communityDescription")}
            </p>
            <div className="mt-1">
              <Button 
                variant="type2"
                href="https://github.com/AOSSIE-Org/Resonate"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2">
                  {t("contributeButton")}
                  <Image
                    src="/assets/icons/github.svg"
                    alt="GitHub logo"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] theme-icon"
                  />
                </span>
              </Button>
            </div>
          </div>

          {/* Tech Stack Heading & Card */}
          <div className="flex flex-col gap-4 text-center items-center">
            <h3 className="italic font-light uppercase tracking-tight text-xl sm:text-2xl text-(--foreground)">
              {t("techStack")}
            </h3>
            
            <div className="rounded-xl border border-card p-5 w-full max-w-sm bg-tech-stack-card shadow-card backdrop-blur-md text-left">
              <p className="text-[10px] font-semibold tracking-wider text-(--foreground-muted) uppercase mb-4">
                {t("mobileDev")}
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { name: t("flutter"), icon: "/assets/icons/flutter.svg" },
                  { name: t("dart"), icon: "/assets/icons/dart.svg" },
                  { name: t("appwrite"), icon: "/assets/icons/appwrite.svg" },
                  { name: t("livekit"), icon: "/assets/icons/livekit.svg" }
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 dark:bg-neutral-800 shadow-sm">
                      <Image
                        src={tech.icon}
                        alt={`${tech.name} logo`}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="font-semibold text-sm text-(--foreground)">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Layout: Chevrons + Center Phone */}
          <div className="flex flex-col gap-4 items-center mt-6 sm:mt-10">
            <div className="flex items-center justify-between w-full max-w-[340px] sm:max-w-[400px] mx-auto gap-2">
              
              {/* Left Chevron Button */}
              <button 
                onClick={handlePrev}
                className="p-3 border border-(--border) rounded-full active:scale-90 hover:bg-(--hover-background) transition-all text-(--foreground) shrink-0"
                aria-label={t("prevFeature")}
              >
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              {/* Static Mobile Mockup with Overlaid Card */}
              <div 
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="w-[226px] sm:w-[266px] aspect-[9/18] relative select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <MockupImage
                  src="/assets/mockups/phone_features.webp"
                  alt={t("resonateAppInterface")}
                  fill
                  className="object-contain"
                  sizes="(min-width: 640px) 266px, 226px"
                placeholderMedia="(min-width: 1280px)"
                />

                {/* Overlaid Card */}
                <div className="group absolute bottom-[12%] left-1/2 -translate-x-1/2 z-10 w-[85%] flex items-center gap-3 p-4 rounded-2xl border border-card bg-feature-card shadow-card backdrop-blur-md text-left transition-all duration-300">
                  <FeatureIllustration
                    kind={features[activeFeature].kind}
                    className="h-12 w-12 shrink-0 text-(--foreground)"
                  />
                  <span className="text-sm sm:text-base font-bold tracking-wider uppercase text-highlight leading-tight">
                    {t(features[activeFeature].cardKey)}
                  </span>
                </div>
              </div>

              {/* Right Chevron Button */}
              <button 
                onClick={handleNext}
                className="p-3 border border-(--border) rounded-full active:scale-90 hover:bg-(--hover-background) transition-all text-(--foreground) shrink-0"
                aria-label={t("nextFeature")}
              >
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

            </div>

            {/* Active Feature Name or Swipe Cue */}
            <div aria-live="polite" className="text-center min-h-[80px] flex items-center justify-center px-4 mt-2">
              {hasSwiped ? (
                <p className="text-base sm:text-lg font-semibold text-(--foreground) animate-in fade-in duration-200">
                  {t(features[activeFeature].titleKey)}
                </p>
              ) : (
                <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-(--foreground-muted) animate-in fade-in duration-200">
                  <Image
                    src="/assets/icons/swipe_cue.svg"
                    alt={t("swipeCue")}
                    width={28}
                    height={28}
                    className="h-7 w-auto icon-secondary theme-icon opacity-50"
                  />
                  <span>{t("swipeCueText")}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
