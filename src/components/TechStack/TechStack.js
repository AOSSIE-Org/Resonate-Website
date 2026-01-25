import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TechStack.css';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';
import reactLogo from '../../assets/react.svg';
import gsapLogo from '../../assets/gsap.svg';
import lenisLogo from '../../assets/lenis.svg';

const techData = [
  { name: 'React', logo: reactLogo, alt: 'React logo' },
  { name: 'Flutter', logo: flutterLogo, alt: 'Flutter logo' },
  { name: 'Appwrite', logo: appwriteLogo, alt: 'Appwrite logo' },
  { name: 'GSAP', logo: gsapLogo, alt: 'GSAP logo' },
  { name: 'Lenis', logo: lenisLogo, alt: 'Lenis logo' },
];

const TechStack = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicating the list for seamless looping is handled in JSX, 
    // but GSAP will handle the movement for maximum control and smoothness.
    const totalWidth = scrollContainer.scrollWidth / 2;

    const animation = gsap.to(scrollContainer, {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: 'none',
      repeat: -1,
      onReverseComplete: () => {
        gsap.set(scrollContainer, { x: 0 });
      }
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMouseEnter = () => {
      if (!mediaQuery.matches) {
        animation.pause();
      }
    };

    const handleMouseLeave = () => {
      if (!mediaQuery.matches) {
        animation.play();
      }
    };

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        animation.pause();
      } else {
        animation.play();
      }
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Initial check
    if (mediaQuery.matches) {
      animation.pause();
    }

    return () => {
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      animation.kill();
    };
  }, []);

  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos-wrapper">
          <div className="tech-logos" ref={scrollRef}>
            {[...techData, ...techData].map((tech, index) => (
              <div className="tech-logo" key={`${tech.name}-${index}`}>
                <img src={tech.logo} alt={tech.alt} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

