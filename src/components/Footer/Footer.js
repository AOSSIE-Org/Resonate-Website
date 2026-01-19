import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {year}
        </div>
        <div className="footer-socials">
          <a href="https://github.com/AOSSIE-Org" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://x.com/aossie_org" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
          <a href="https://www.linkedin.com/company/aossie" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
