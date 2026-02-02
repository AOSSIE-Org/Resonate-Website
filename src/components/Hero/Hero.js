import React from 'react';
import './Hero.css';
import phoneImage from '../../assets/resonate_app.png.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>The Open-Source Voice of the Internet<br />Social Audio for everyone</h1>
          <p className="maintained-by">A Project Maintained by <a href="https://aossie.org" className="aossie-link">AOSSIE</a></p>
        </div>
        <div className="hero-image">
          <img src={phoneImage} alt="Resonate App on Phone" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
