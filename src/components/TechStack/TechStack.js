import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './TechStack.css';

// Importing SVG assets
import flutterLogo from '../../assets/flutter.svg';
import appwriteLogo from '../../assets/appwrite.svg';
import reactLogo from '../../assets/react.svg';
import gsapLogo from '../../assets/gsap.svg';
import lenisLogo from '../../assets/lenis.svg';

const techStackData = [
  { name: 'React', logo: reactLogo },
  { name: 'Flutter', logo: flutterLogo },
  { name: 'Appwrite', logo: appwriteLogo },
  { name: 'GSAP', logo: gsapLogo },
  { name: 'Lenis', logo: lenisLogo },
];

const TechStack = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContent = scrollRef.current;
      if (!scrollContent) return;

      // Calculate total width of one set of logos (we have 3 sets)
      const totalWidth = scrollContent.scrollWidth / 3;

      // GSAP Animation: continuous horizontal scroll
      const animation = gsap.to(scrollContent, {
        x: `-=${totalWidth}`,
        duration: 20,
        ease: 'none',
        repeat: -1,
        paused: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });

      animationRef.current = animation;
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.play();
  };

  return (
    <section className="tech-stack-container">
      <div className="tech-stack-wrapper">
        <h2 className="tech-stack-title">TECH STACK</h2>
        <div
          className="tech-scroll-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="tech-scroll-content" ref={scrollRef}>
            {/* 3 sets of logos for ultra-wide screen coverage */}
            {[...techStackData, ...techStackData, ...techStackData].map((tech, index) => (
              <div className="tech-logo-item" key={`${tech.name}-${index}`}>
                <img src={tech.logo} alt={`${tech.name} logo`} />
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

