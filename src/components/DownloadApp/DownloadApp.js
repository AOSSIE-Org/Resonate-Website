import QRCode from 'react-qr-code';
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
          <div className="qr-block" aria-label="Scan to download on mobile">
            <div className="qr-code" aria-hidden="true">
              <QRCode
                value="https://play.google.com/store/apps/details?id=com.resonate.resonate"
                size={120}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <span className="qr-text">Scan to download</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
