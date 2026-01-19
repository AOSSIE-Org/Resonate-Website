import React from 'react';
import './TechStack.css';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';

const TechStack = () => {
  return (
    <section className="tech-stack-container">
        <div className="tech-stack">
        <h2 className="tech-title">
          TECH STACK
          <span className="underline"></span>
        </h2>

        <div className="tech-logos">
          <div className="tech-logo">
            <a href='https://flutter.dev/'
              title="Flutter – Google’s UI Toolkit for Building Cross-Platform Apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official Flutter website by Google">
              <img src={flutterLogo} alt="Flutter" />
            </a>
            </div>
          <div className="tech-logo">
            <a href='https://appwrite.io/'
              title="Appwrite – Open Source Backend Platform for Web and Mobile Apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official Appwrite website">
              <img src={appwriteLogo} alt="Appwrite" />
            </a>
            </div>
        </div>
        </div>
    </section>
  );
};

export default TechStack;
