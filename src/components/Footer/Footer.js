import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
 
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">
          &copy; {new Date().getFullYear()}
        </div>
        <div className="footer-socials">
          <a href="https://github.com/AOSSIE-Org"><FaGithub /></a>
          <a href="https://x.com/aossie_org"><BsTwitterX /></a>
          <a href="https://www.linkedin.com/company/aossie"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
