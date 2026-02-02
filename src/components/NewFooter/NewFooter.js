import React from 'react';
import './NewFooter.css';
// import logo from '../../assets/resonate_logo_white.svg';

const NewFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-wrapper">
      <footer className="new-footer">
        <div className="footer-content">
          <div className="footer-logo-section">
            <div className="footer-logo-container">
              <div className="footer-logo">
                {/* <img src={logo} alt="Resonate Logo" /> */}
                <span>Resonate</span>
              </div>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#getting-started">Getting Started</a></li>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#other-projects">Other Projects</a></li>
                <li><a href="#changelog">Changelogs</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About Us</h4>
              <ul>
                <li><a href="#blogs">Blogs</a></li>
                <li><a href="#privacy-policy">Privacy Policy</a></li>
                <li><a href="#support">Support Us</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Social</h4>
              <ul>
                <li><a href="https://instagram.com/aossie_org" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://twitter.com/aossie_org" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://linkedin.com/company/aossie" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://discord.com/invite/MMZBadkYFm" target="_blank" rel="noopener noreferrer">Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom-outside">
        <div className="footer-bottom-content">
          <span>© {currentYear}</span>
          <span>Made with ♥ by AOSSIE Community</span>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;