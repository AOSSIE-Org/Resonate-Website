import React from 'react';
import './DownloadApp.css';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <a
            href="https://www.apple.com/app-store/"
            className="store-btn appstore"
            target="_blank"
            rel="noreferrer"
          >
            Download on the App Store
          </a>

          <a
            href="https://play.google.com/store"
            className="store-btn playstore"
            target="_blank"
            rel="noreferrer"
          >
            Get it on Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;

