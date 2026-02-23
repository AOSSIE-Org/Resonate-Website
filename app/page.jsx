"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  DURATIONS,
  EASING,
  STAGGER,
  LENIS_CONFIG,
  createAnimationContext,
  checkPrefersReducedMotion,
} from "../src/animations/index.js";

import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import TechStack from "./components/TechStack/TechStack";
import About from "./components/About/About";
import DownloadApp from "./components/DownloadApp/DownloadApp";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis(LENIS_CONFIG);

    let rafId;
    let isActive = true;

    function raf(time) {
      if (!isActive) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const reducedMotion = checkPrefersReducedMotion();

    const ctx = createAnimationContext(() => {
      if (reducedMotion) {
        return;
      }

      const heroTl = gsap.timeline();
      heroTl
        .fromTo(
          ".hero-content h1",
          { y: 100, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: DURATIONS.slow, ease: EASING.power4 },
        )
        .fromTo(
          ".hero-content h2",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.8",
        )
        .fromTo(
          ".hero-content p",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.8",
        )
        .fromTo(
          ".hero-buttons",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.8",
        )
        .fromTo(
          ".hero-image",
          { x: 100, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: DURATIONS.slower, ease: EASING.power3 },
          "-=1",
        )
        .fromTo(
          ".hero-description-container p",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.5",
        );

      gsap.utils.toArray(".feature-item").forEach((feature) => {
        const image = feature.querySelector(".feature-image");
        const text = feature.querySelector(".feature-content h3");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          image,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
        ).fromTo(
          text,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.6",
        );
      });

      const techStackTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-stack",
          start: "top 75%",
        },
      });

      techStackTl
        .fromTo(
          ".tech-stack",
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: DURATIONS.normal, ease: EASING.power2 },
        )
        .fromTo(
          ".tech-stack h2",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
          "-=0.4",
        )
        .fromTo(
          ".tech-logo",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATIONS.normal,
            stagger: STAGGER.medium,
            ease: EASING.back,
          },
          "-=0.6",
        );

      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about",
          start: "top 70%",
        },
      });

      aboutTl
        .fromTo(
          ".about-logo",
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
        )
        .fromTo(
          ".about-content h2",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.8",
        )
        .fromTo(
          ".about-content p",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power3 },
          "-=0.8",
        )
        .fromTo(
          ".social-links a",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DURATIONS.fast,
            stagger: STAGGER.small,
            ease: EASING.back,
          },
          "-=0.6",
        );

      const downloadTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".download-app-section",
          start: "top 80%",
        },
      });

      downloadTl
        .fromTo(
          ".download-app-card",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.slow, ease: EASING.power2 },
        )
        .fromTo(
          ".download-app-card h2",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATIONS.normal, ease: EASING.power3 },
          "-=0.6",
        )
        .fromTo(
          ".store-btn",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: DURATIONS.fast,
            stagger: STAGGER.medium,
            ease: EASING.back,
          },
          "-=0.4",
        );
    }, mainRef);

    return () => {
      isActive = false;
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="App" ref={mainRef}>
      <Hero />
      <Features />
      <TechStack />
      <About />
      <DownloadApp />
    </div>
  );
}
