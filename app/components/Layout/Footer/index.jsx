import "./Footer.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">&copy; 2025. All rights reserved.</div>
        <div className="footer-socials">
          <a
            href="https://github.com/AOSSIE-Org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AOSSIE on LinkedIn"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/aossie_org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AOSSIE on LinkedIn"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com/company/aossie"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AOSSIE on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
