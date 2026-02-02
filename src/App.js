import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import AboutSection from './components/AboutSection/AboutSection';
import MiddleSection from './components/MiddleSection/MiddleSection';
import BottomSection from './components/BottomSection/BottomSection';
import NewFooter from './components/NewFooter/NewFooter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Animations
    
    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-content h1', 
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power4.out' }
    )
    .fromTo('.hero-content p', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      "-=0.8"
    )
    .fromTo('.hero-image', 
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 
      "-=1"
    );

    // Middle Section Animation
    const middleTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.middle-section',
        start: 'top 80%',
      }
    });

    middleTl.fromTo('.text-content h2',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.text-content p',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo('.phone-display img',
      { x: 50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      "-=1"
    )
    .fromTo('.voices-text h3',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo('.store-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
      "-=0.4"
    );

    // Bottom Section Animation
    const bottomTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.bottom-section',
        start: 'top 80%',
      }
    });

    bottomTl.fromTo('.community-section h2',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.tech-stack-section h3',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo('.feature-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      "-=0.6"
    );

    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <AboutSection />
        <MiddleSection />
        <BottomSection />
        <NewFooter />
      </div>
    </ThemeProvider>
  );
}

export default App;