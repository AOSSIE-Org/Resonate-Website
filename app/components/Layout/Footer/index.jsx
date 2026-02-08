import React from "react";
import "./Footer.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Logo from "@/assets/resonate_logo_white.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-branding">
            <img src={Logo.src} alt="Resonate Logo" className="brand-logo" />
            <div className="brand-info">
              <h2 className="brand-title">Resonate</h2>
              <div className="copyright">&copy; {currentYear}</div>
            </div>
          </div>
        </div>

        <div className="footer-center">
          <p className="footer-tagline">An open-source social voice platform</p>
          <p className="footer-maintainer">Maintained by AOSSIE</p>
        </div>

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
