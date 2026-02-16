import React from 'react';
import './DownloadApp.css';
import playStoreBtn from '../../assets/Button-1.png';
import StoreButton from '../StoreButton/StoreButton'; // from dev branch

const DownloadApp = () => {
  const playStoreUrl ='https://play.google.com/store/apps/details?id=com.resonate.resonate';

  return (
    <section className="download-app-section">
      <div className="download-app-card">

        <div className="download-text-wrapper">
          <h2>Get the Resonate Mobile app.</h2>

          <div className="download-actions">

            {/* Dev branch feature */}
            <div className="store-buttons">
              <StoreButton store="google" url={playStoreUrl} />
            </div>

            {/* Keep lazy loading optimization from fix branch */}
            <div className="fallback-store-btn">
              <a 
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn"
              >
                <img 
                  src={playStoreBtn} 
                  alt="Get it on Google Play"
                  loading="lazy"
                />
              </a>
            </div>

            {/* QR Code feature from dev */}
            <div className="qr-code-wrapper">
              <div className="qr-glow-container">
                <img
                  src="/qr_code.png"
                  alt="Scan to download"
                  className="qr-code-img"
                  loading="lazy"
                />
              </div>
              <p className="qr-label">Scan to Download</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DownloadApp;
