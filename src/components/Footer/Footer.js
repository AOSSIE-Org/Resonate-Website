import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/AOSSIE-Org',
      icon: FaGithub,
      ariaLabel: 'Visit AOSSIE on GitHub'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/aossie_org',
      icon: BsTwitterX,
      ariaLabel: 'Follow AOSSIE on Twitter'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/aossie',
      icon: FaLinkedinIn,
      ariaLabel: 'Connect with AOSSIE on LinkedIn'
    }
  ];
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {new Date().getFullYear()}
        </div>
        <div className="footer-socials">
          <nav className="footer-socials" aria-label="Social media links">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={link.ariaLabel}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={link.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
