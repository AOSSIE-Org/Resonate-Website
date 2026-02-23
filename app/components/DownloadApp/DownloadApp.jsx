import './DownloadApp.css';
import StoreButton from './StoreButton';
import { useSkeletonLoading } from '../Skeleton/useSkeletonLoading';
import { SkeletonTitle, SkeletonButton, SkeletonImage, SkeletonText } from '../Skeleton';

const DownloadApp = () => {
  const isLoading = useSkeletonLoading();
  const playStoreUrl ='https://play.google.com/store/apps/details?id=com.resonate.resonate';

  if (isLoading) {
    return (
      <section className="download-app-section">
        <div className="download-app-card">
          <div className="download-text-wrapper">
            <SkeletonTitle style={{ width: "280px", marginBottom: "2rem" }} />
            <div className="download-actions">
              <div className="store-buttons">
                <SkeletonButton style={{ width: "180px", height: "60px" }} />
              </div>
              <div className="qr-code-wrapper">
                <div className="qr-glow-container">
                  <SkeletonImage aspectRatio="1/1" style={{ width: "120px", height: "120px" }} />
                </div>
                <SkeletonText lines={1} style={{ width: "120px", marginTop: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                <img
                  src="/qr_code.png"
                  alt="Scan to download"
                  className="qr-code-img"
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
