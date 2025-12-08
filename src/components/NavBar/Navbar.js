import React from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg'; // Trying Vector.png as logo based on file list

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
           <img src={logo} alt="Resonate Logo" className="logo-icon" /> 
          <span className="logo-text">Resonate</span>
        </div>
        <div className="navbar-links">
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a href="https://github.com/AOSSIE/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FaGithub size={20} />
          </a>
          <button className="download-btn">Download Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
