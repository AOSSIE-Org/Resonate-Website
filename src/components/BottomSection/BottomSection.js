import React from 'react';
import './BottomSection.css';
import { FaGithub } from 'react-icons/fa';
import phoneImage from '../../assets/resonate_app_bottom.png';

const BottomSection = () => {
  return (
    <section className="bottom-section">
      {/* Join Community and Tech Stack Section */}
      <div className="community-tech-section">
        <div className="community-section">
          <h2>JOIN OUR<br /><span className="community-highlight">COMMUNITY</span></h2>
          <p>
            Become a member of our <strong>INCREDIBLE</strong><br />
            open source community by clicking<br />
            the button below, our amazing members<br />
            and maintainers will guide you<br />
            thoroughly to get your journey started.
          </p>
          <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="contribute-btn">
            <FaGithub /> Contribute to the Project
          </a>
        </div>

        <div className="phone-center">
          <img src={phoneImage} alt="Resonate App" />
          <p className="phone-caption">Real-Time Audio Communication</p>
        </div>

        <div className="tech-stack-section">
          <h3>GET FAMILIAR WITH<br />OUR TECH STACK</h3>
          <div className="tech-category">
            <h4>MOBILE DEVELOPMENT</h4>
            <div className="tech-items">
              <div className="tech-item">
                <span className="tech-icon flutter">{'<'}</span>
                <span>Flutter</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon dart">◆</span>
                <span>Dart</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon appwrite">C</span>
                <span>Appwrite</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon livekit">LK</span>
                <span>LiveKit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-grid">
        <div className="feature-card">
          <h3>FEATURE #1</h3>
        </div>
        <div className="feature-card">
          <h3>FEATURE #2</h3>
        </div>
        <div className="feature-card">
          <h3>FEATURE #3</h3>
        </div>
        <div className="feature-card">
          <h3>FEATURE #4</h3>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;