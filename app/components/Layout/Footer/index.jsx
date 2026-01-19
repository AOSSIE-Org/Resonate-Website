import React from "react";
import "./Footer.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">&copy; {currentYear}</div>
        <div className="footer-socials">
          <a
            href="https://github.com/AOSSIE-Org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/aossie_org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Twitter/X"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com/company/aossie"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
