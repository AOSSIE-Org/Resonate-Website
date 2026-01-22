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

    // Pause on hover for better UX
    scrollContainer.addEventListener('mouseenter', () => animation.pause());
    scrollContainer.addEventListener('mouseleave', () => animation.play());

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      animation.pause();
    }

    return () => {
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

