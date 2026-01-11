import "./DownloadApp.css";
import AppStoreBtn from "../../assets/AppleStore.png";
import PlayStoreBtn from "../../assets/PlayStore.png";

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <a href="#" className="store-btn">
            <img src={AppStoreBtn.src} alt="Download on App Store" />
          </a>
          <a href="#" className="store-btn">
            <img src={PlayStoreBtn.src} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
