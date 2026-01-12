import React from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <button
          type="button"
          className="navbar-logo"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </button>

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
            href="https://github.com/AOSSIE-Org/Resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            aria-label="GitHub Repository"
          >
            <FaGithub size={20} />
          </a>

          <button className="download-btn">Download Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
