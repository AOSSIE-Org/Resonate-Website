"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useIntersectionObserver } from "../ui/useIntersectionObserver";

export function Features() {
  const t = useTranslations("Features");
  const { ref: revealRef, isVisible } = useIntersectionObserver();
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const [hasSwiped, setHasSwiped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const features = [
    { id: 0, cardKey: "card1", titleKey: "feature1Title" },
    { id: 1, cardKey: "card2", titleKey: "feature2Title" },
    { id: 2, cardKey: "card3", titleKey: "feature3Title" },
    { id: 3, cardKey: "card4", titleKey: "feature4Title" },
    { id: 4, cardKey: "card5", titleKey: "feature5Title" },
    { id: 5, cardKey: "card6", titleKey: "feature6Title" },
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
    <section id="section-features" className="relative flex flex-col pt-16 sm:pt-24 xl:pt-24 overflow-hidden min-h-screen" ref={revealRef}>

      <div className="w-full px-4 md:px-8 xl:px-0 2xl:px-16 flex-1 flex flex-col gap-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (xl+) */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex flex-col gap-6 xl:gap-6 flex-1">
          
          {/* Top Row: Community Info (Left) and Tech Stack (Right) */}
          <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-x-8 items-start">
            
            {/* Left: Community Block */}
            <div className="flex flex-col gap-6 text-left">
              <h2 className={`text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase leading-none ${isVisible ? 'animate-luxury-reveal-1' : 'opacity-0'}`}>
                <span className="text-(--foreground)">{t("joinCommunity").split(" ").slice(0, 2).join(" ")} </span>
                <span className="text-highlight">{t("joinCommunity").split(" ").slice(2).join(" ")}</span>
              </h2>
              <p className="text-(--foreground-muted) text-base lg:text-lg max-w-md xl:max-w-lg leading-relaxed">
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
            <div id="features-phone-slot" className="w-full max-w-[280px] lg:max-w-[340px] xl:max-w-[400px] mx-auto aspect-[9/12] pointer-events-none" />

            {/* Right: Tech Stack Block */}
            <div className="flex flex-col gap-6 text-left justify-self-end w-full max-w-sm xl:max-w-md">
              <h3 className="italic font-light uppercase tracking-tight text-2xl lg:text-4xl text-(--foreground) leading-tight">
                {t("techStack")}
              </h3>
              
              {/* Tech Stack Card */}
              <div id="features-tech-card" className="rounded-2xl border border-card p-6 xl:p-8 bg-card shadow-card backdrop-blur-md">
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
          <div id="features-marquee-row" className="flex flex-col gap-8 relative z-20 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mt-6 xl:mt-8">
            {/* Embedded styles for marquee animation */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.3333%); }
              }
              .animate-marquee {
                animation: marquee 25s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}} />
            
            {/* The infinite marquee row */}
            <div className="flex w-max gap-6 px-6 animate-marquee py-4">
              {/* We repeat the 6 features 3 times to ensure a seamless scroll loop */}
              {[...features, ...features, ...features].map((feat, index) => {
                return (
                  <div
                    key={`${feat.id}-${index}`}
                    onClick={() => setActiveFeature(feat.id)}
                    onMouseEnter={() => setHoveredFeature(feat.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="flex items-center justify-center p-6 rounded-2xl border border-card text-center transition-all duration-300 cursor-pointer select-none w-64 md:w-80 h-28 md:h-40 shrink-0 bg-card shadow-card text-(--foreground) backdrop-blur-md hover:bg-(--color-brand-yellow) hover:text-black hover:border-(--color-brand-yellow) hover:scale-[1.03] hover:shadow-lg hover:shadow-(--color-brand-yellow)/15"
                  >
                    <span className="text-lg xl:text-xl font-bold tracking-wider uppercase">
                      {t(feat.cardKey)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Active Feature Text below Phone mockup */}
          <div className="text-center pt-12 pb-12 relative z-30 flex items-center justify-center gap-3 min-h-[120px]">
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
            
            <div className="rounded-xl border border-card p-5 w-full max-w-sm bg-card shadow-card backdrop-blur-md text-left">
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
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-neutral-200/50 dark:border-neutral-800 shadow-sm">
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
          <div className="flex flex-col gap-4 items-center">
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
                className="w-2/3 max-w-[280px] sm:max-w-[320px] aspect-[9/18] relative select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <Image
                  src="/assets/mockups/phone_features.webp"
                  alt={t("resonateAppInterface")}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Overlaid Card */}
                <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-10 w-[85%] aspect-[16/9] flex items-center justify-center p-4 rounded-2xl border border-card bg-card shadow-card backdrop-blur-md text-center transition-all duration-300">
                  <span className="text-sm sm:text-base font-bold tracking-wider uppercase text-highlight">
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
            <div className="text-center min-h-[80px] flex items-center justify-center px-4 mt-2">
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
