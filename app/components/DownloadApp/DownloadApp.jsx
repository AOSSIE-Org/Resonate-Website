import React from "react";
import "./DownloadApp.css";
import StoreButton from "./StoreButton";
import Image from "next/image";

const DownloadApp = () => {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.resonate.resonate";

  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <div className="download-text-wrapper">
          <h2>Get the Resonate Mobile app.</h2>

          <div className="download-actions">
            <div className="store-buttons">
              <StoreButton store="google" url={playStoreUrl} />
            </div>

            <div className="qr-code-wrapper">
              <div className="qr-glow-container">
                <Image
                  src="/qr_code.png"
                  alt="Scan to download"
                  className="qr-code-img"
                  width={180}
                  height={180}
                  quality={80}
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

export default React.memo(DownloadApp);
