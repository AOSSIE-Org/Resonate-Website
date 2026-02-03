import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import TechStack from './components/TechStack/TechStack';
import About from './components/About/About';
import DownloadApp from './components/DownloadApp/DownloadApp';
import Footer from './components/Footer/Footer';
import gsap from 'gsap';

function App() {
  useEffect(() => {
    // Dynamically import and register ScrollTrigger only in browser to avoid test-time parsing problems
    (async () => {
      if (typeof window !== 'undefined') {
        try {
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          gsap.registerPlugin(ScrollTrigger);
        } catch (err) {
          // If import fails (e.g., in some test environments), continue without ScrollTrigger
          // Tests should still run and animations will be skipped
          // eslint-disable-next-line no-console
          console.warn('ScrollTrigger not available:', err && err.message ? err.message : err);
        }

        // Dynamically import Lenis (ES module) only in the browser runtime
        try {
          const LenisModule = await import('lenis');
          const Lenis = LenisModule && LenisModule.default ? LenisModule.default : LenisModule;

          // Initialize Lenis for smooth scrolling
          let lenis;
          let rafId;

          function raf(time) {
            if (lenis) lenis.raf(time);
            rafId = requestAnimationFrame(raf);
          }

          lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
          });

          rafId = requestAnimationFrame(raf);

          // Cleanup helper for lenis and raf
          // We'll attach it to window so outer cleanup can access it (alternatively keep in closure)
          window.__resonate_lenis_cleanup = () => {
            if (lenis && lenis.destroy) lenis.destroy();
            if (rafId) cancelAnimationFrame(rafId);
          };
        } catch (err) {
          // Lenis import failed (e.g., test environment). Skip smooth scrolling.
          // eslint-disable-next-line no-console
          console.warn('Lenis not available:', err && err.message ? err.message : err);
        }
      }
    })();

    // GSAP Animations
    
    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-content h1', 
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power4.out' }
    )
    .fromTo('.hero-content h2', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      "-=0.8"
    )
    .fromTo('.hero-content p', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      "-=0.8"
    )
    .fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      "-=0.8"
    )
    .fromTo('.hero-image', 
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 
      "-=1"
    )
    .fromTo('.hero-description-container p',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.5"
    );

    // Features Animation
    gsap.utils.toArray('.feature-item').forEach((feature, i) => {
      const image = feature.querySelector('.feature-image');
      const text = feature.querySelector('.feature-content h3');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(image,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.6"
      );
    });

    // Tech Stack Animation
    const techStackTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.tech-stack',
        start: 'top 75%',
      }
    });
    
    techStackTl.fromTo('.tech-stack',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo('.tech-stack h2',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    )
    .fromTo('.tech-logo',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
      "-=0.6"
    );

    // About Animation
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
      }
    });

    aboutTl.fromTo('.about-logo',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.about-content h2',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo('.about-content p',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo('.social-links a',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
      "-=0.6"
    );

    // Download App Animation
    const downloadTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.download-app-section',
        start: 'top 80%',
      }
    });

    downloadTl.fromTo('.download-app-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.download-app-card h2',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo('.store-btn',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
      "-=0.4"
    );

    // Cleanup function
    return () => {
      // Cleanup Lenis if it was initialized via the dynamic import
      if (window && typeof window.__resonate_lenis_cleanup === 'function') {
        try {
          window.__resonate_lenis_cleanup();
          delete window.__resonate_lenis_cleanup;
        } catch (e) {
          // ignore
        }
      }

      // If ScrollTrigger is available, kill active triggers
      try {
        if (gsap && gsap.core && gsap.core.globals && gsap.core.globals.ScrollTrigger) {
          const ST = gsap.core.globals.ScrollTrigger;
          ST.getAll().forEach((t) => t.kill());
        }
      } catch (e) {
        // Ignore if ScrollTrigger isn't present (e.g., in test env)
      }
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <About />
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;
