import React, { useState } from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';
import { URLS } from '../../constants/urls';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>

       <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          ☰
        </button> 

        <div className={`navbar-links ${open ? 'open' : ''}`}>
          <a
            href={URLS.WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>

          <a
            href={URLS.RESONATE_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            <FaGithub size={20} />
          </a>

          <a
            href={URLS.PLAY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
            onClick={handleLinkClick}
          >
            Download Now
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
