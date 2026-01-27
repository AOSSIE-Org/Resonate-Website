import React from 'react';
import './TechStack.css';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';

const TechStack = () => {
  return (
    <section className="tech-stack-container" aria-label="Technology stack">
      <div className="tech-stack">
        <h2>Technology Stack</h2>

        <p style={{opacity:"0.8", marginBottom:"2rem"}}>
          Resonate is built using modern, scalable open-source technologies.
        </p>

        <div className="tech-logos">
          <div className="tech-logo">
            <img src={flutterLogo} alt="Flutter framework logo" loading="lazy" />
          </div>

          <div className="tech-logo">
            <img src={appwriteLogo} alt="Appwrite backend platform logo" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default TechStack;