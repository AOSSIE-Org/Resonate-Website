import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initialize scroll position on mount
    lastScrollY.current = window.scrollY;

    const SCROLL_THRESHOLD = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top
      if (currentScrollY <= 50) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Prevent flicker on very small scroll movements
      if (Math.abs(currentScrollY - lastScrollY.current) < SCROLL_THRESHOLD) {
        return;
      }

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className={`navbar ${!isVisible ? 'navbar-hidden' : ''}`}>
      <div className="navbar-container">
        <div
          className="navbar-logo"
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
        >
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
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
            href="https://github.com/AOSSIE-Org/Resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            aria-label="Resonate GitHub"
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

export default Navbar;
