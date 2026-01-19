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
            alt="AOSSIE organization logo"
          />
        </div>
        <div className="about-content">
          <h2>We Innovate<br />We Educate</h2>
          <p>
            We are an Australian not-for-profit umbrella organization for open-source projects.
            We believe the open-source philosophy provides a resource-efficient channel to transfer
            knowledge and achieve innovation and education.
          </p>
          <div className="social-links">
            <a href="mailto:contact@aossie.org" aria-label="Email AOSSIE">
              <FaEnvelope />
            </a>
            <a href="https://gitlab.com/aossie" aria-label="AOSSIE GitLab profile">
              <SiGitlab />
            </a>
            <a href="https://github.com/AOSSIE-Org" aria-label="AOSSIE GitHub profile">
              <FaGithub />
            </a>
            <a href="https://discord.com/invite/MMZBadkYFm" aria-label="AOSSIE Discord server">
              <FaDiscord />
            </a>
            <a href="https://x.com/aossie_org" aria-label="AOSSIE Twitter/X profile">
              <BsTwitterX />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
