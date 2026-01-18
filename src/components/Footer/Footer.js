import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; 2025
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/AOSSIE-Org"
            aria-label="Visit AOSSIE on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
          </a>

          <a
            href="https://x.com/aossie_org"
            aria-label="Follow AOSSIE on Twitter (X)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/company/aossie"
            aria-label="Connect with AOSSIE on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
