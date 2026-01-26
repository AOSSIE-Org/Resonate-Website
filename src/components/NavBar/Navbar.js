import React from 'react';
import './Navbar.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import logo from '../../assets/resonate_logo_white.svg'; // Trying Vector.png as logo based on file list

const Navbar = () => {

  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
            if (darkMode) {
              document.body.classList.add('dark');
              document.body.classList.remove('light');
            } else {
              document.body.classList.add('light');
              document.body.classList.remove('dark');
            }
          }, [darkMode]);

    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      handleLogoClick();
    }
  };

  return (
    <nav className="navbar ">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label='Scroll to top'>
          <img src={logo} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>
        <div className="navbar-actions navbar-links">
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="nav-link">
            AOSSIE <FaExternalLinkAlt size={12}/>
          </a>
          <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label='GitHub repository'>
            <FaGithub size={20} />
          </a>

          <button className='theme-toggle' aria-label='Toggle dark mode' onClick={() => setDarkMode(prev => !prev)}>{darkMode ? <FiSun/> : <FiMoon/>}</button>

          <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="download-btn">Download Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
