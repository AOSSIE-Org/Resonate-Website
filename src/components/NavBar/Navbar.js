import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
// import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          {/* <img src={logo} alt="Resonate Logo" className="logo-icon" /> */}
          <span className="logo-text">Resonate</span>
        </div>

        <div className="navbar-center">
          <div className={`navbar-links ${open ? 'open' : ''}`}>
            <a href="#developers" className="nav-link" onClick={handleLinkClick}>
              Developers
            </a>
            <a href="#community" className="nav-link" onClick={handleLinkClick}>
              Community
            </a>
            <a
              href="https://aossie.org"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              onClick={handleLinkClick}
            >
              Aossie
            </a>
          </div>
          <div className="navbar-icons">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            <FiSearch className="search-icon" />
          </div>
        </div>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          ☰
        </button> 

        <a
          href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
          onClick={handleLinkClick}
        >
          Download Now
        </a>

      </div>
    </nav>
  );
};

export default Navbar;
