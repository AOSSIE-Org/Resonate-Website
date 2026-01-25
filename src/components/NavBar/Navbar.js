import React from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>
        <div className="navbar-links">
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FaGithub size={20} />
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="download-btn">Download Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
