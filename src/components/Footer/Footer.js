import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {currentYear}
        </div>
        <div className="footer-socials">
          <a
            href="https://github.com/AOSSIE-Org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="AOSSIE GitHub profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/aossie_org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="AOSSIE Twitter/X profile"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com/company/aossie"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="AOSSIE LinkedIn page"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
