import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt, FaBars, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuItemsRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (isMenuOpen) toggleMenu();
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.fromTo(menuItemsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Resonate Logo" className="logo-icon" />
            <span className="logo-text">Resonate</span>
          </div>

          <div className="navbar-links desktop-only">
            <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
              AOSSIE <FaExternalLinkAlt size={12} />
            </a>
            <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label="GitHub Repository">
              <FaGithub size={20} />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="download-btn">Download Now</a>
          </div>

          <div className="hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </nav>

      <div className="sidebar" ref={sidebarRef}>
        <div className="sidebar-content">
          <a
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            ref={el => menuItemsRef.current[0] = el}
            onClick={toggleMenu}
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a
            href="https://github.com/AOSSIE-Org/Resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            ref={el => menuItemsRef.current[1] = el}
            onClick={toggleMenu}
          >
            GitHub <FaGithub size={20} />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn sidebar-download"
            ref={el => menuItemsRef.current[2] = el}
            onClick={toggleMenu}
          >
            Download Now
          </a>
        </div>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
