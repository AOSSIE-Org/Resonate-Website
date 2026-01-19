import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { URLS } from '../../constants/urls';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {currentYear}
        </div>
        <div className="footer-socials">
          <a href={URLS.GITHUB} rel="noopener noreferrer" target="_blank" aria-label="GitHub"><FaGithub /></a>
          <a href={URLS.X_TWITTER} rel="noopener noreferrer" target="_blank" aria-label="Twitter/X"><BsTwitterX /></a>
          <a href={URLS.LINKEDIN} rel="noopener noreferrer" target="_blank" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
