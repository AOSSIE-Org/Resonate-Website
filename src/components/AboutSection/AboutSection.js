import React from 'react';
import './AboutSection.css';
import { FaEnvelope, FaDiscord, FaGithub, FaGitlab } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// import aossieLogo from '../../assets/aossie_logo.png';
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
              <div className="aossie-logo">
                {/* <img src={aossieLogo} alt="AOSSIE Logo" /> */}
                <div style={{width: '120px', height: '60px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666'}}>AOSSIE Logo</div>
              </div>
              <div className="description">
                <p>
                  We are an Australian not-for-profit<br></br>organization that supports and brings<br></br> 
                  together open-source projects. We believe<br></br> open source is a resource-efficient and<br></br>
                  collaborative way to share knowledge,<br></br> encourage innovation, and make<br></br> 
                  education more accessible through strong <br></br>community participation.
                </p>
                <div className="social-section">
                  <p className="social-text">Find more<br />about AOSSIE here</p>
                  <div className="social-icons">
                    <div className="social-icon gmail">
                      <FaEnvelope />
                    </div>
                    <div className="social-icon discord">
                      <FaDiscord />
                    </div>
                    <div className="social-icon github">
                      <FaGithub />
                    </div>
                    <div className="social-icon gitlab">
                      <FaGitlab />
                    </div>
                    <div className="social-icon x">
                      <FaXTwitter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Image - Positioned to overlay the content box */}
        <div className="overlay-image">
          <img src={overlayImage} alt="Overlay Design" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;