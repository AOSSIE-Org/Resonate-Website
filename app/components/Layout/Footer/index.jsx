import React, { useMemo } from "react";
import "./Footer.css";
import { FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">&copy; {currentYear} AOSSIE</div>
        <div className="footer-socials">
          <a
            href="mailto:aossie.oss@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
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
          <a
            href="https://www.youtube.com/@AOSSIE-Org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
