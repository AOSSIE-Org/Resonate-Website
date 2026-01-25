import React from 'react';
import './TechStack.css';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';

const TechStack = () => {
  return (
    <section className="tech-stack-container">
        <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
            <div className="tech-logo">
            <img src={flutterLogo} alt="Flutter" loading="lazy" />
            </div>
            <div className="tech-logo">
            <img src={appwriteLogo} alt="Appwrite" loading="lazy" />
            </div>
        </div>
        </div>
    </section>
  );
};

export default TechStack;
