import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './DownloadApp.css';
import StoreButton from './StoreButton';

const DownloadApp = () => {
  const downloadUrl = "https://play.google.com/store/apps/details?id=com.resonate.resonate";

  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="download-content-wrapper">
          <div className="store-buttons">
            <StoreButton 
              store="google" 
              url={downloadUrl} 
            />
          </div>
          <div className="qr-container">
            <QRCodeSVG value={downloadUrl} size={120} includeMargin={true} className="qr-code-img" />
            <p className="qr-text">Scan to download</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
