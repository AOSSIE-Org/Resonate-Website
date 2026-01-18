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
            alt="AOSSIE open-source organization logo"
          />
        </div>

        <div className="about-content">
          <h2>We Innovate<br />We Educate</h2>

          <p>
            We are an Australian not-for-profit umbrella organization for open-source projects.
            We believe the open-source philosophy provides a resource-efficient channel to
            transfer knowledge and achieve innovation and education.
          </p>

          <div className="social-links">
            <a
              href="mailto:contact@aossie.org"
              aria-label="Send an email to AOSSIE"
            >
              <FaEnvelope aria-hidden="true" />
            </a>

            <a
              href="https://gitlab.com/aossie"
              aria-label="Visit AOSSIE on GitLab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGitlab aria-hidden="true" />
            </a>

            <a
              href="https://github.com/AOSSIE-Org"
              aria-label="Visit AOSSIE on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub aria-hidden="true" />
            </a>

            <a
              href="https://discord.com/invite/MMZBadkYFm"
              aria-label="Join AOSSIE on Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord aria-hidden="true" />
            </a>

            <a
              href="https://x.com/aossie_org"
              aria-label="Follow AOSSIE on Twitter (X)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
