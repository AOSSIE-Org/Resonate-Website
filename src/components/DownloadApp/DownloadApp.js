import React from 'react';
import './DownloadApp.css';
import StoreButton from './StoreButton';

const DownloadApp = () => {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.resonate.resonate";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(playStoreUrl)}`;

  return (
    <section className="download-app-section">
      <div className="download-app-card">
    
        <div className="download-text-wrapper">
          <h2>Get the Resonate Mobile app.</h2>
          <div className="store-buttons">
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" className="store-btn">
              <img src={playStoreBtn} alt="Get it on Google Play" />
            </a>
          </div>
        </div>

        <div className="qr-code-wrapper">
           <div className="qr-glow-container">
             <img src={qrCodeUrl} alt="Scan to download" className="qr-code-img" />
           </div>
           <p className="qr-label">Scan to Download</p>
        </div>

      </div>
    </section>
  );
};

export default DownloadApp;
