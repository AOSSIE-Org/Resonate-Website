"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Align with Tailwind's md breakpoint (768px)
const MOBILE_BREAKPOINT = "(max-width: 767px)";

const getMarginX = (viewportWidth: number): number => {
  if (viewportWidth >= 1280) return 192;
  if (viewportWidth >= 1024) return 64;
  if (viewportWidth >= 640) return 32;
  return 16;
};

export function HeroVisuals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const metricImgRef = useRef<HTMLDivElement>(null);
  const featuresImgRef = useRef<HTMLDivElement>(null);

  // Lazy initializer avoids sync setState inside effect
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);

    // Set initial value inside effect but via the handler, not synchronously
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    // Pass mq directly to reuse the same handler for initial + change events
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);

    return () =>
      mq.removeEventListener(
        "change",
        handler as (e: MediaQueryListEvent) => void
      );
  }, []);

  // Smooth animation loop (Lenis-friendly), with RAF cleanup
useEffect(() => {
  if (isMobile !== false) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let rafId: number | null = null;
  let current = 0;
  let isIntersecting = true;

  const EPSILON = 0.001;

  // 👉 If reduced motion → set static end state and exit
  if (prefersReducedMotion) {
    if (handRef.current) {
      handRef.current.style.opacity = "0";
    }

    if (phoneRef.current) {
      const vw = window.innerWidth;
      const maxTranslateX = vw / 2 - getMarginX(vw);

      phoneRef.current.style.transform = `translate3d(${maxTranslateX}px, 1000px, 0) rotate(-10deg)`;
    }

    return;
  }



    const animate = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const target = Math.min(Math.max(1 - rect.bottom / vh, 0), 3.0);
      current += (target - current) * 0.1;

      const vw = window.innerWidth;
      const maxTranslateX = vw / 2 - getMarginX(vw);

      const handOpacity = Math.max(0, 1 - current * 4);
      
      // Rotation: goes from 0 to -10deg (current: 0 -> 1), then back to 0deg (current: 1 -> 2)
      let phoneRotate = 0;
      if (current <= 1) {
        phoneRotate = current * -10;
      } else if (current <= 2) {
        phoneRotate = -10 * (2 - current);
      } else {
        phoneRotate = 0;
      }

      // Horizontal Translation: moves from center (0) to right (finalTranslateX) for current <= 1,
      // stays right for 1 < current <= 2, and returns to center (0) for 2 < current <= 3.
      const finalTranslateX = Math.min(vw * 0.28, maxTranslateX);
      let phoneTranslateX = 0;
      if (current <= 1) {
        phoneTranslateX = current * finalTranslateX;
      } else if (current <= 2) {
        phoneTranslateX = finalTranslateX;
      } else if (current <= 3) {
        phoneTranslateX = finalTranslateX * (3 - current);
      } else {
        phoneTranslateX = 0;
      }

      // Vertical Translation: goes from 0 to 1920px (current: 0 -> 2) at 960px/section,
      // and goes from 1920px to 3080px (current: 2 -> 3) to push the phone mockup lower 
      // in Features section so that it aligns perfectly beside the feature cards.
      let phoneTranslateY = 0;
      if (current <= 2) {
        phoneTranslateY = current * 960;
      } else {
        phoneTranslateY = 1920 + (current - 2) * (3080 - 1920);
      }

      if (handRef.current) {
        handRef.current.style.opacity = `${handOpacity}`;
      }

      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(${phoneTranslateX}px, ${phoneTranslateY}px, 0) rotate(${phoneRotate}deg)`;
      }

      // Calculate piecewise opacities for the mockups
      let heroOpacity = 0;
      let aboutOpacity = 0;
      let metricOpacity = 0;
      let featuresOpacity = 0;

      if (current <= 0.3) {
        heroOpacity = 1;
      } else if (current < 0.7) {
        heroOpacity = (0.7 - current) / 0.4;
      } else {
        heroOpacity = 0;
      }

      if (current <= 0.3) {
        aboutOpacity = 0;
      } else if (current < 0.7) {
        aboutOpacity = (current - 0.3) / 0.4;
      } else if (current <= 1.3) {
        aboutOpacity = 1;
      } else if (current < 1.7) {
        aboutOpacity = (1.7 - current) / 0.4;
      } else {
        aboutOpacity = 0;
      }

      if (current <= 1.3) {
        metricOpacity = 0;
      } else if (current < 1.7) {
        metricOpacity = (current - 1.3) / 0.4;
      } else if (current <= 2.3) {
        metricOpacity = 1;
      } else if (current < 2.7) {
        metricOpacity = (2.7 - current) / 0.4;
      } else {
        metricOpacity = 0;
      }

      if (current <= 2.3) {
        featuresOpacity = 0;
      } else if (current < 2.7) {
        featuresOpacity = (current - 2.3) / 0.4;
      } else {
        featuresOpacity = 1;
      }

      if (heroImgRef.current) heroImgRef.current.style.opacity = `${heroOpacity}`;
      if (aboutImgRef.current) aboutImgRef.current.style.opacity = `${aboutOpacity}`;
      if (metricImgRef.current) metricImgRef.current.style.opacity = `${metricOpacity}`;
      if (featuresImgRef.current) featuresImgRef.current.style.opacity = `${featuresOpacity}`;

      const isSettled = Math.abs(target - current) < EPSILON;

      // 👉 Only continue RAF if needed
      if (!isSettled) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    // 👉 Intersection Observer (pause when off-screen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;

        // restart loop if comes back into view
        if (isIntersecting && rafId === null) {
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
}, [isMobile]);

  // Neutral skeleton — avoids hydration mismatch on first render
  if (isMobile === null) {
    return (
      <div className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] md:max-w-[480px] mx-auto min-h-[400px]" />
    );
  }

  // Mobile layout (no animation)
  if (isMobile) {
    return (
      <div className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] mx-auto">
        <div className="relative w-full left-[7.4%]">
          <Image
            src="/assets/mockups/hand.webp"
            alt="Hand holding phone"
            width={500}
            height={900}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute top-[0.4%] left-[20%] w-[88%]">
          <div className="w-2/3 overflow-hidden shadow-2xl">
            <Image
              src="/assets/mockups/phone.webp"
              alt="Resonate app interface"
              width={400}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout (with scroll animation)
  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] md:max-w-[480px] mx-auto"
    >
      <div
        ref={handRef}
        className="relative w-full left-[7.4%]"
        style={{ willChange: "opacity" }}
      >
        <Image
          src="/assets/mockups/hand.webp"
          alt="Hand holding phone"
          width={500}
          height={900}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div
        ref={phoneRef}
        className="absolute top-[0.4%] left-[20%] w-[88%] z-10"
        style={{
          transformOrigin: "center bottom",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
          contain: "paint",
        }}
      >
        <div className="w-2/3 overflow-hidden relative">
          {/* Hero Screen */}
          <div
            ref={heroImgRef}
            className="w-full h-auto transition-opacity duration-100 ease-in-out"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <Image
              src="/assets/mockups/phone.webp"
              alt="Resonate app interface"
              width={400}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* About Screen */}
          <div
            ref={aboutImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <Image
              src="/assets/mockups/phone_about.webp"
              alt="About Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              priority
            />
          </div>

          {/* Metric Screen */}
          <div
            ref={metricImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <Image
              src="/assets/mockups/phone_metric.webp"
              alt="Metric Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              priority
            />
          </div>

          {/* Features Screen */}
          <div
            ref={featuresImgRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-100 ease-in-out"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <Image
              src="/assets/mockups/phone_features.webp"
              alt="Features Resonate app interface"
              width={400}
              height={800}
              className="w-full h-full object-fill"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}