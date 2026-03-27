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

  const animate = () => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    const target = Math.min(Math.max(1 - rect.bottom / vh, 0), 1);
    current += (target - current) * 0.1;

    const vw = window.innerWidth;
    const maxTranslateX = vw / 2 - getMarginX(vw);

    const handOpacity = Math.max(0, 1 - current * 4);
    const phoneRotate = current * -10;
    const phoneTranslateX = Math.min(current * (vw * 0.28), maxTranslateX);
    const phoneTranslateY = current * 1000;

    if (handRef.current) {
      handRef.current.style.opacity = `${handOpacity}`;
    }

    if (phoneRef.current) {
      phoneRef.current.style.transform = `translate3d(${phoneTranslateX}px, ${phoneTranslateY}px, 0) rotate(${phoneRotate}deg)`;
    }

    const isSettled = Math.abs(target - current) < EPSILON;

    // 👉 Only continue RAF if needed
    if (isIntersecting || !isSettled) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(animate);

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
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
          <div className="w-2/3 rounded-[2.5rem] overflow-hidden shadow-2xl">
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
        className="absolute top-[0.4%] left-[20%] w-[88%]"
        style={{
          transformOrigin: "center bottom",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
          contain: "paint",
        }}
      >
        <div className="w-2/3 overflow-hidden">
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