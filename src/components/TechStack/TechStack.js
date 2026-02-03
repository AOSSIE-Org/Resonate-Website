import React from 'react';
import './TechStack.css';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';
import LazyImage from '../Shared/LazyImage';

const TechStack = () => {
  return (
    <section className="tech-stack-container">
        <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
            <div className="tech-logo">
            <LazyImage src={flutterLogo} alt="Flutter" />
            </div>
            <div className="tech-logo">
            <LazyImage src={appwriteLogo} alt="Appwrite" />
            </div>
        </div>
        </div>
    </section>
  );
};

export default TechStack;
