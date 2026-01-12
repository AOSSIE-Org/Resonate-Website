import React from 'react';
import './Hero.css';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import phoneImage from '../../assets/resonate1 1.png'; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-image">
          <img src={phoneImage} alt="Resonate App on Phone" />
        </div>
        <div className="hero-content">
          <h1>Clubhouse,<br />but Open Source</h1>
          <h2>A social voice platform.</h2>
          <p className="maintained-by">A Project Maintained by <a href="https://aossie.org" className="aossie-link">AOSSIE</a></p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Create/Join Room <FaArrowRight />
            </button>
            <a href="https://github.com/AOSSIE-Org/Resonate">
            <button className="btn btn-secondary">
              Contribute to the Project <FaGithub />
            </button>
              </a>
          </div>
        </div>
      </div>
      
      <div className="hero-description-container">
        <p>
          With the rising popularity of social voice platforms such as Clubhouse and Twitter Spaces, it is high time for an Open Source alternative. A platform like this would not only enhance credibility within the open-source community but also attract more users and foster growth. An engagement platform that is Open Source has the potential to drive significant traction and help establish a strong presence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
