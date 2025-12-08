import React from 'react';
import './DownloadApp.css';
import appStoreBtn from '../../assets/Button.png'; 
import playStoreBtn from '../../assets/Button-1.png'; 

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <a href="#" className="store-btn">
            <img src={appStoreBtn} alt="Download on App Store" />
          </a>
          <a href="#" className="store-btn">
            <img src={playStoreBtn} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
