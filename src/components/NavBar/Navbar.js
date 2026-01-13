import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Resonate Logo" className="logo-icon" /> 
          <span className="logo-text">Resonate</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a href="https://github.com/AOSSIE/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FaGithub size={20} />
          </a>
          <button className="download-btn">Download Now</button>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      >
        <div 
          className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
          id="mobile-menu"
          onClick={(e) => e.stopPropagation()}
          role="menu"
        >
          <a 
            href="https://aossie.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-nav-link"
            onClick={closeMenu}
            role="menuitem"
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a 
            href="https://github.com/AOSSIE/Resonate" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-nav-link"
            onClick={closeMenu}
            role="menuitem"
          >
            <FaGithub size={20} /> GitHub
          </a>
          <button 
            className="mobile-download-btn"
            onClick={closeMenu}
            role="menuitem"
          >
            Download Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
