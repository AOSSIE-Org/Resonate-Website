import React, { useEffect } from 'react';
import './App.css';
import { Helmet } from "react-helmet-async";

import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import TechStack from './components/TechStack/TechStack';
import About from './components/About/About';
import DownloadApp from './components/DownloadApp/DownloadApp';
import Footer from './components/Footer/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {

  useEffect(() => {

    /* ✅ Disable Lenis on mobile for performance */
    const isDesktop = window.innerWidth > 768;

    const lenis = isDesktop
      ? new Lenis({ smooth: true, duration: 1.1 })
      : null;

    function raf(time) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    if (isDesktop) requestAnimationFrame(raf);

    /* ✅ Delay animations to allow page to paint first */
    const startAnimations = () => {

      // HERO
      gsap.fromTo('.hero-content h1',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo('.hero-image',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // FEATURES
      gsap.utils.toArray('.feature-item').forEach((feature) => {
        const image = feature.querySelector('.feature-image');
        const text = feature.querySelector('.feature-content h3');
        if (!image || !text) return;

        gsap.timeline({
          scrollTrigger: { trigger: feature, start: 'top 80%' }
        })
          .fromTo(image, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
          .fromTo(text, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      });

      // TECH STACK
      if (document.querySelector('.tech-stack')) {
        gsap.fromTo('.tech-stack',
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            scrollTrigger: { trigger: '.tech-stack', start: 'top 75%' }
          }
        );
      }

      // ABOUT
      if (document.querySelector('.about')) {
        gsap.fromTo('.about',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: '.about', start: 'top 75%' }
          }
        );
      }

      // DOWNLOAD
      if (document.querySelector('.download-app-card')) {
        gsap.fromTo('.download-app-card',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: '.download-app-card', start: 'top 80%' }
          }
        );
      }
    };

    setTimeout(startAnimations, 300); // ⭐ improves LCP

    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, []);

  return (
    <>
      <Helmet>
        <title>Resonate – Open Source Social Voice Platform</title>
        <meta
          name="description"
          content="Resonate is an open source social voice platform where users can join rooms, pair chat, and connect through real-time conversations."
        />
        <link rel="canonical" href="https://resonate.aossie.org" />
      </Helmet>

      <div className="App">
        <Navbar />
        <Hero />
        <Features />
        <TechStack />
        <About />
        <DownloadApp />
        <Footer />
      </div>
    </>
  );
}

export default App;
