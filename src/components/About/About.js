import React from 'react';
import './About.css';
import aossieLogo from '../../assets/aossie_logo.png';
import { FaEnvelope, FaGithub, FaDiscord } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { SiGitlab } from 'react-icons/si';

const socialLinks = [
  {
    href: 'mailto:contact@aossie.org',
    label: 'Send email to AOSSIE',
    icon: <FaEnvelope />
  },
  {
    href: 'https://gitlab.com/aossie',
    label: 'Visit AOSSIE GitLab organization',
    icon: <SiGitlab />,
    external: true
  },
  {
    href: 'https://github.com/AOSSIE-Org',
    label: 'Visit AOSSIE GitHub organization',
    icon: <FaGithub />,
    external: true
  },
  {
    href: 'https://discord.com/invite/MMZBadkYFm',
    label: 'Join AOSSIE Discord server',
    icon: <FaDiscord />,
    external: true
  },
  {
    href: 'https://x.com/aossie_org',
    label: 'Visit AOSSIE on X (Twitter)',
    icon: <BsTwitterX />,
    external: true
  }
];

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-logo">
          <img src={aossieLogo} alt="AOSSIE Logo" />
        </div>

        <div className="about-content">
          <h2>
            We Innovate<br />We Educate
          </h2>

          <p>
            We are an Australian not-for-profit umbrella organization for open-source projects.
            We believe the open-source philosophy provides a resource-efficient channel to transfer
            knowledge and achieve innovation and education.
          </p>

          <div className="social-links">
            {socialLinks.map(({ href, label, icon, external }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                {...(external && {
                  target: '_blank',
                  rel: 'noopener noreferrer'
                })}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
