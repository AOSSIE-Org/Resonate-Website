import React from 'react';
import './Hero.css';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import phoneImage from '../../assets/resonate_app.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        
        <div className="hero-image">
          <img 
  src={phoneImage}
  alt="Resonate open source social voice platform app interface"
  width="420"
  height="520"
  fetchpriority="high"
  loading="eager"
  decoding="async"
/>
        </div>

        <div className="hero-content">
          <div className="yellow-gradient-bg"></div>

          {/* Main SEO heading */}
          <h1>
            Resonate – An Open Source <br />
            <span className="highlight">Social Voice Platform</span>
          </h1>

          {/* Supporting subheading */}
          <h2>Clubhouse-style audio rooms built for the open-source community.</h2>

          <p className="maintained-by">
            A Project Maintained by <a href="https://aossie.org" className="aossie-link">AOSSIE</a>
          </p>

          <div className="hero-buttons">
            <a 
              href="https://play.google.com/store/apps/details?id=com.resonate.resonate" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Create or Join Audio Rooms <FaArrowRight />
            </a>

            <a 
              href="https://github.com/AOSSIE-Org/Resonate" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              Contribute to the Open Source Project <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-description-container">
        <p>
          Resonate is an open-source social voice platform inspired by applications like Clubhouse and Twitter Spaces. 
          It allows users to create and join live audio rooms, host community discussions, and collaborate through voice. 
          As an open-source engagement platform, Resonate aims to foster transparency, community-driven development, 
          and innovation in real-time audio communication.
        </p>
      </div>
    </section>
  );
};

export default Hero;
