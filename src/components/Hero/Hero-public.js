import React from 'react';
import Image from 'next/image';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>The Open-Source Voice of the Internet<br />Social Audio for everyone</h1>
          <p className="maintained-by">A Project Maintained by <a href="https://aossie.org" className="aossie-link">AOSSIE</a></p>
        </div>
        <div className="hero-image">
          <Image 
            src="/images/resonate_app.png.png" 
            alt="Resonate App on Phone" 
            width={400}
            height={600}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;