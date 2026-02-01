import React from "react";
import "./DownloadApp.css";
import StoreButton from "./StoreButton"; // ✅ import your StoreButton component

const DownloadApp = () => {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.resonate.resonate";

  return (
    <section className="download-app">
      <h2>Download Resonate</h2>
      <p>Get the Resonate app on your mobile device:</p>

      <div className="store-buttons">
        {/* Use StoreButton instead of separate <a> */}
        <StoreButton store="google" url={playStoreUrl} />
      </div>
    </section>
  );
};

export default DownloadApp;
