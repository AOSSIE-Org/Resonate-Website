import React from 'react';
import './DownloadApp.css';
import playStoreBtn from '../../assets/Button-1.png';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <button
            type="button"
            className="store-btn"
            aria-label="Google Play app coming soon"
            onClick={() => {
              alert("Mobile App is coming soon! Check back after GSoC 2026.");
                }}
                >
            <img src={playStoreBtn} alt="Get it on Google Play" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
