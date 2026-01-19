import React from 'react';
import './DownloadApp.css';
import playStoreBtn from '../../assets/Button-1.png';
import { URLS } from '../../constants/urls';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <a href={URLS.PLAY_STORE} target="_blank" rel="noopener noreferrer" className="store-btn">
            <img src={playStoreBtn} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
