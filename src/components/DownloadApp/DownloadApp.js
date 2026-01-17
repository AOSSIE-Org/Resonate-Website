import "./DownloadApp.css";
import PlayDownloadButton from "./DownloadButton/PlayDownloadButton";
import AppleDownloadButton from "./DownloadButton/AppleDownloadButton";

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-card">
        <h2>Get the Resonate Mobile app.</h2>
        <div className="store-buttons">
          <PlayDownloadButton href="https://play.google.com/store/apps/details?id=com.resonate.resonate" />
          <AppleDownloadButton href="https://www.apple.com/app-store/" />
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
