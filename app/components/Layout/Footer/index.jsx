import React from "react";
import "./Footer.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SOCIAL_LINKS } from "@/constants/links";

const iconMap = {
  "GitHub": <FaGithub />,
  "Twitter/X": <BsTwitterX />,
  "LinkedIn": <FaLinkedinIn />,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <p className="copyright">&copy; {currentYear}</p>

        <div className="footer-socials">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={`Visit ${link.name}`}
            >
              {iconMap[link.name]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;