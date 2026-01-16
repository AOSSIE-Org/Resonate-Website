import React from 'react';
import './DownloadApp.css';
import StoreButton from './StoreButton';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <StoreButton 
            store="google" 
            url="https://play.google.com/store/apps/details?id=com.resonate.resonate" 
          />
          <StoreButton 
            store="apple" 
            url="#" 
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
