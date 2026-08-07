"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Align with Tailwind's xl breakpoint (1280px)
const MOBILE_BREAKPOINT = "(max-width: 1279px)";

const getMarginX = (viewportWidth: number): number => {
  if (viewportWidth >= 1536) return 192;
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

    let cachedVh = window.innerHeight;
    let cachedVw = window.innerWidth;
    let top0 = 0;
    let top1 = cachedVh * 1;
    let top2 = cachedVh * 2;
    let top3 = cachedVh * 3;
    let targetY_about = cachedVh * 0.88;
    let targetY_metric = cachedVh * 1.76;
    let targetY_features = cachedVh * 3.12;
    let lastPhoneTranslateY = 0;
    let lastPhoneScale = 1.0;

    const updateMeasurements = () => {
      cachedVh = window.innerHeight;
      cachedVw = window.innerWidth;

      const sy = window.scrollY;
      const heroEl = document.getElementById("section-hero");
      const aboutEl = document.getElementById("section-about");
      const metricEl = document.getElementById("section-metric");
      const featuresEl = document.getElementById("section-features");
      const marqueeEl = document.getElementById("features-marquee-row");
      const hoverCueEl = document.getElementById("features-hover-cue-row");
      const phoneSlotEl = document.getElementById("features-phone-slot");
      const phoneEl = phoneRef.current;

      if (heroEl && aboutEl && metricEl && featuresEl && phoneEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const metricRect = metricEl.getBoundingClientRect();
        const featuresRect = featuresEl.getBoundingClientRect();
        const phoneRect = phoneEl.getBoundingClientRect();

        top0 = heroRect.top + sy;
        top1 = aboutRect.top + sy - cachedVh * 0.2;
        // top2: End of Metric section (phone completes straight downward translation to targetY_metric on right side)
        top2 = featuresRect.top + sy - cachedVh * 0.85;
        // top3: Features section active (phone moves diagonally to center at targetY_features)
        top3 = featuresRect.top + sy - cachedVh * 0.15;

        const phoneInitialTopDoc = (phoneRect.top + sy) - lastPhoneTranslateY;
        const phoneInitialBottomDoc = (phoneRect.bottom + sy) - lastPhoneTranslateY;
        const unscaledPhoneHeight = phoneRect.height / lastPhoneScale;

        // Center phone within About section content area
        const aboutCenterDoc = (aboutRect.top + sy) + aboutRect.height * 0.45;
        targetY_about = (aboutCenterDoc - unscaledPhoneHeight / 2) - phoneInitialTopDoc;

        // Center phone within Metric section content area
        const metricCenterDoc = (metricRect.top + sy) + metricRect.height * 1.5;
        targetY_metric = (metricCenterDoc - unscaledPhoneHeight / 2) - phoneInitialTopDoc;

        if (hoverCueEl) {
          const hoverCueRect = hoverCueEl.getBoundingClientRect();
          // Position phone bottom safely 16px above the "Hover over the feature cards" title
          const hoverCueTopDoc = hoverCueRect.top + sy - 16;
          targetY_features = hoverCueTopDoc - phoneInitialBottomDoc;
        } else if (marqueeEl) {
          const marqueeRect = marqueeEl.getBoundingClientRect();
          const marqueeBottomDoc = marqueeRect.bottom + sy + 20;
          targetY_features = marqueeBottomDoc - phoneInitialBottomDoc;
        } else if (phoneSlotEl) {
          const slotRect = phoneSlotEl.getBoundingClientRect();
          targetY_features = (slotRect.top + sy) - phoneInitialTopDoc;
        } else {
          targetY_features = (featuresRect.top + sy) - top0;
        }
      }
    };

    updateMeasurements();

    let isIntersecting = true;

    const animate = () => {
      if (!isIntersecting) {
        rafId = null;
        return;
      }

      // Ensure measurements are fresh
      updateMeasurements();

      const sy = window.scrollY;

      // Compute scroll progress dynamically:
      // 0 -> 1: Hero to About (moves to right side, targetY_about, tilts -10deg)
      // 1 -> 2: About through Metric (straightens to 0deg, translates straight DOWNWARD on right side to targetY_metric)
      // 2 -> 3: Metric to Features (translates DIAGONALLY to center, targetY_features)
      let target = 0;
      if (sy <= top0) {
        target = 0;
      } else if (sy <= top1) {
        target = (sy - top0) / (top1 - top0 || 1);
      } else if (sy <= top2) {
        target = 1.0 + (sy - top1) / (top2 - top1 || 1);
      } else if (sy <= top3) {
        target = 2.0 + (sy - top2) / (top3 - top2 || 1);
      } else {
        target = 3.0;
      }

      target = Math.min(Math.max(target, 0), 3.0);
      current += (target - current) * 0.12;

      const maxTranslateX = cachedVw / 2 - getMarginX(cachedVw);

      const handOpacity = Math.max(0, 1 - current * 4);
      
      // Rotation:
      // current <= 1: rotates from 0 to -10deg (in About section)
      // 1 < current <= 1.3: straightens up from -10deg back to 0deg right after About section
      // 1.3 < current: stays straight at 0deg
      let phoneRotate = 0;
      if (current <= 1) {
        phoneRotate = current * -10;
      } else if (current <= 1.3) {
        phoneRotate = -10 * ((1.3 - current) / 0.3);
      } else {
        phoneRotate = 0;
      }

      // Horizontal Translation:
      // current <= 1: moves from center (0) to right side (finalTranslateX)
      // 1 < current <= 2: STAYS FIXED ON RIGHT SIDE (translates straight downward through Metric section)
      // 2 < current <= 3: ONLY AFTER Metric section ends, translates diagonally to center (0)
      const finalTranslateX = Math.min(cachedVw * 0.28, maxTranslateX);
      let phoneTranslateX = 0;
      if (current <= 1) {
        phoneTranslateX = current * finalTranslateX;
      } else if (current <= 2) {
        phoneTranslateX = finalTranslateX;
      } else if (current <= 3) {
        const progress = Math.min(Math.max(current - 2.0, 0), 1);
        phoneTranslateX = finalTranslateX * (1 - progress);
      } else {
        phoneTranslateX = 0;
      }

      // Compute dynamic responsive scale for mobile asset (10% smaller scaling as requested)
      const phoneEl = phoneRef.current;
      const basePhoneHeight = phoneEl ? phoneEl.getBoundingClientRect().height / lastPhoneScale : 540;
      const maxAvailableHeight = cachedVh - 130; // 75px navbar padding + 55px bottom margin
      const maxScaleByVh = Math.max(0.70, (maxAvailableHeight / (basePhoneHeight || 540)) * 0.90);
      const targetPhoneScale = Math.min(1.17, maxScaleByVh);

      let phoneScale = 1.0;
      if (current <= 1) {
        phoneScale = 1.0 + current * (targetPhoneScale - 1.0);
      } else {
        phoneScale = targetPhoneScale;
      }
      lastPhoneScale = phoneScale;

      // Vertical Translation: dynamically interpolated across real DOM target Y coordinates
      let phoneTranslateY = 0;
      if (current <= 1) {
        phoneTranslateY = current * targetY_about;
      } else if (current <= 2) {
        phoneTranslateY = targetY_about + (current - 1) * (targetY_metric - targetY_about);
      } else {
        phoneTranslateY = targetY_metric + (current - 2) * (targetY_features - targetY_metric);
      }

      // Bounds Clamping (keeps entire phone 100% visible, above hover title & footer at all times)
      if (current > 0.1 && phoneEl) {
        const phoneInitialTopDoc = (phoneEl.getBoundingClientRect().top + sy) - lastPhoneTranslateY;
        const phoneInitialBottomDoc = (phoneEl.getBoundingClientRect().bottom + sy) - lastPhoneTranslateY;
        const currentScaledHeight = basePhoneHeight * phoneScale;
        
        const minAllowedViewportTop = 75; // Below top navbar
        const maxAllowedViewportBottom = cachedVh - 28; // Above bottom taskbar / screen edge

        // 1. Viewport bottom clamping
        const currentViewportBottom = (phoneInitialTopDoc + phoneTranslateY) + currentScaledHeight - sy;
        if (currentViewportBottom > maxAllowedViewportBottom) {
          phoneTranslateY -= (currentViewportBottom - maxAllowedViewportBottom);
        }

        // 2. Viewport top clamping
        const currentViewportTop = (phoneInitialTopDoc + phoneTranslateY) - sy;
        if (currentViewportTop < minAllowedViewportTop) {
          phoneTranslateY += (minAllowedViewportTop - currentViewportTop);
        }

        // 3. Document bottom clamping relative to hover cue title (never below hover title / footer)
        const hoverCueEl = document.getElementById("features-hover-cue-row");
        if (hoverCueEl) {
          const hoverCueTopDoc = hoverCueEl.getBoundingClientRect().top + sy;
          const maxAllowedDocBottomY = (hoverCueTopDoc - 16) - phoneInitialBottomDoc;
          phoneTranslateY = Math.min(phoneTranslateY, maxAllowedDocBottomY);
        }
      }

      lastPhoneTranslateY = phoneTranslateY;

      if (handRef.current) {
        handRef.current.style.opacity = `${handOpacity}`;
      }

      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(${phoneTranslateX}px, ${phoneTranslateY}px, 0) rotate(${phoneRotate}deg) scale(${phoneScale})`;
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
        rootMargin: "500% 0px 500% 0px",
        threshold: 0,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
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
      <div className="w-[226px] sm:w-[266px] aspect-[9/18] relative mx-auto">
        <Image
          src="/assets/mockups/phone.webp"
          alt="Resonate app interface"
          fill
          className="object-contain"
          priority
        />
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
        className="absolute top-[0.4%] left-[20%] w-[88%] z-30"
        style={{
          transformOrigin: "center top",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
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