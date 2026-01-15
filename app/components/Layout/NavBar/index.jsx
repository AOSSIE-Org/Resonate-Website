import "./Navbar.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Logo from "@/assets/resonate_logo_white.svg";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo.src} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>
        <div className="navbar-links">
          <a
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a
            href="https://github.com/AOSSIE-Org/Resonate-Website"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            Download Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
