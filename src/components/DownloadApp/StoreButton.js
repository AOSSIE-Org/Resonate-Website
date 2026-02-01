import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import "./DownloadApp.css";

const StoreButton = ({ store, url }) => {
  const [message, setMessage] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: "Resonate App",
      text: "Check out the Resonate app!",
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Thanks for sharing! 🚀");
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setMessage("Link copied to clipboard 📋");
        return;
      }

      setMessage(
        "Sharing not supported on this browser. Please copy the link manually."
      );
    } catch (error) {
      if (error.name === "AbortError") {
        setMessage("Sharing cancelled ❌");
      } else {
        console.error(error);
        setMessage("Unable to share the link ⚠️");
      }
    }
  };

  const isGoogle = store === "google";
  const subtitle = isGoogle ? "GET IT ON" : "Download on the";
  const title = isGoogle ? "Google Play" : "App Store";

  return (
    <div className="store-badge-container">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="store-badge"
      >
        {isGoogle ? (
          <svg
            className="store-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z"
              fill="#4285f4"
            />
            <path
              d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"
              fill="#ea4335"
            />
            <path
              d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"
              fill="#fbbc04"
            />
            <path
              d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
              fill="#34a853"
            />
          </svg>
        ) : (
          <FaApple className="store-icon" />
        )}
        <div className="store-text">
          <span className="store-subtitle">{subtitle}</span>
          <span className="store-title">{title}</span>
        </div>
      </a>

      <button type="button" className="share-btn" onClick={handleShare} aria-label="Share Resonate app link">Share App</button>

      {message && <p className="share-message">{message}</p>}
    </div>
  );
};

export default StoreButton;
