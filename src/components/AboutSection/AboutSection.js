import React from 'react';
import Image from 'next/image';
import './AboutSection.css';
import { FaEnvelope, FaDiscord, FaGithub, FaGitlab } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import aossieLogo from '../../assets/2b28ae15e922c710639cd9def14b1c4f9b186878.png';
import overlayImage from '../../assets/Group 35899.png';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Statistics */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">4.6+</div>
            <div className="stat-label">STORE<br />RATING</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6K+</div>
            <div className="stat-label">HAPPY<br />CONTRIBUTORS</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1K+</div>
            <div className="stat-label">UNIQUE<br />DOWNLOADS</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="left-content">
            <div className="main-heading">
              <h2><span className="innovate-highlight">WE INNOVATE</span></h2>
              <h2 className="italic">WE EDUCATE</h2>
            </div>

            <div className="content-box">
              <div className="left-column">
                <div className="aossie-logo">
                  <a href="https://aossie.org" target="_blank" rel="noopener noreferrer">
                    <Image 
                      src={aossieLogo} 
                      alt="AOSSIE Logo" 
                      width={180}
                      height={90}
                      style={{ objectFit: 'contain' }}
                    />
                  </a>
                </div>
                
                {/* Social Section - Now under the logo */}
                <div className="social-section">
                  <p className="social-text">Find more<br />about AOSSIE here</p>
                  <div className="social-icons">
                    <a href="mailto:contact@aossie.org" className="social-icon gmail" target="_blank" rel="noopener noreferrer">
                      <FaEnvelope />
                    </a>
                    <a href="https://discord.gg/aossie" className="social-icon discord" target="_blank" rel="noopener noreferrer">
                      <FaDiscord />
                    </a>
                    <a href="https://github.com/AOSSIE-Org" className="social-icon github" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    <a href="https://gitlab.com/aossie" className="social-icon gitlab" target="_blank" rel="noopener noreferrer">
                      <FaGitlab />
                    </a>
                    <a href="https://twitter.com/aossie_org" className="social-icon x" target="_blank" rel="noopener noreferrer">
                      <FaXTwitter />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="description">
                <p>
                  We are an Australian not-for-profit<br></br>organization that supports and brings<br></br> 
                  together open-source projects. We believe<br></br> open source is a resource-efficient and<br></br>
                  collaborative way to share knowledge,<br></br> encourage innovation, and make<br></br> 
                  education more accessible through strong <br></br>community participation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Image - Positioned to overlay the content box */}
        <div className="overlay-image">
          <Image 
            src={overlayImage} 
            alt="Overlay Design" 
            width={350}
            height={350}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;