"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Detect mobile — null until client-side measurement runs
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth animation loop (Lenis-friendly), with RAF cleanup
  useEffect(() => {
    if (isMobile !== false) return;

    let rafId: number;
    let current = 0;

    const animate = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress based on viewport
      const target = Math.min(Math.max(1 - rect.bottom / vh, 0), 1);

      // smooth interpolation
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

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Neutral skeleton — avoids hydration mismatch on first render
  if (isMobile === null) {
    return (
      <div className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] sm:max-w-[480px] mx-auto min-h-[400px]" />
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
      className="relative w-full max-w-[300px] min-[400px]:max-w-[360px] sm:max-w-[480px] mx-auto"
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
          transform: "translate3d(0,0,0)",
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