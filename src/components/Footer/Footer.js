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
          {/* Found for LinkedIn */}
          <a
            href="https://www.linkedin.com/company/aossie/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AOSSIE on LinkedIn"
  >
          <FaLinkedinIn />
          </a>
          
          <button
            type="button"
            className="social-btn"
            aria-label="Instagram (coming soon)"
            onClick={() => alert("Instagram link coming soon")}
  >
          <FaInstagram />
          </button>

          <button
          type="button"
          className="social-btn"
          aria-label="Facebook (coming soon)"
          onClick={() => alert("Facebook link coming soon")}
        >
          <FaFacebookF />
        </button> 

        <button
          type="button"
          className="social-btn"
          aria-label="Twitter (coming soon)"
          onClick={() => alert("Twitter link coming soon")}
  >
      <FaTwitter />
  </button>

  
        </div>
      </div>
    </footer>
  );
};

export default Footer;
