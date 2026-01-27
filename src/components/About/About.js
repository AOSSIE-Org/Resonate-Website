import React from 'react';
import './About.css';
import aossieLogo from '../../assets/aossie_logo.png';
import { FaEnvelope, FaGithub, FaDiscord } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { SiGitlab } from 'react-icons/si';

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-logo">
          <img 
            src={aossieLogo} 
            alt="AOSSIE open source organization logo" 
          />
        </div>
        <div className="about-content">
          <h2>We Innovate<br />We Educate</h2>

          <p>
            AOSSIE is an Australian not-for-profit umbrella organization that supports and maintains open-source projects 
            like Resonate. We believe the open-source philosophy provides a resource-efficient channel to transfer knowledge, 
            empower communities, and drive innovation and education through collaborative software development.
          </p>

          <div className="social-links">
            <a href="mailto:contact@aossie.org" aria-label="Email AOSSIE"><FaEnvelope /></a>
            <a href="https://gitlab.com/aossie" aria-label="AOSSIE GitLab"><SiGitlab /></a>
            <a href="https://github.com/AOSSIE-Org" aria-label="AOSSIE GitHub"><FaGithub /></a>
            <a href="https://discord.com/invite/MMZBadkYFm" aria-label="AOSSIE Discord"><FaDiscord /></a>
            <a href="https://x.com/aossie_org" aria-label="AOSSIE Twitter/X"><BsTwitterX /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
