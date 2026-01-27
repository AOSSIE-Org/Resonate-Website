import React from 'react';
import './DownloadApp.css';
import StoreButton from './StoreButton';
import { URLS } from '../../constants/urls';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <StoreButton 
            store="google" 
            url={URLS.PLAY_STORE} 
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
