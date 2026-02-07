"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Components
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import TechStack from "./components/TechStack/TechStack";
import About from "./components/About/About";
import DownloadApp from "./components/DownloadApp/DownloadApp";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;
    let isActive = true;

    function raf(time) {
      if (!isActive) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // GSAP Animations

    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(
        ".hero-content h1",
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power4.out" },
      )
      .fromTo(
        ".hero-content h2",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ".hero-content p",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ".hero-buttons",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ".hero-image",
        { x: 100, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=1",
      )
      .fromTo(
        ".hero-description-container p",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5",
      );

    // Features Animation
    gsap.utils.toArray(".feature-item").forEach((feature, i) => {
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
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
      ).fromTo(
        text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6",
      );
    });

    // Tech Stack Animation
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
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      )
      .fromTo(
        ".tech-stack h2",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        ".tech-logo",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      );

    // About Animation
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
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      )
      .fromTo(
        ".about-content h2",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ".about-content p",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ".social-links a",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      );

    // Download App Animation
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
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      )
      .fromTo(
        ".download-app-card h2",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        ".store-btn",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );

    return () => {
      isActive = false;
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="App">
      <Hero />
      <Features />
      <TechStack />
      <About />
      <DownloadApp />
    </div>
  );
}
