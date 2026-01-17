import React from "react";
import "./PlayDownloadButton.css";
import googlePlay from "../../../assets/googlePlay.svg";

const PlayDownloadButton = ({
  href,
  className = "",
  ...rest
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`play-download-btn ${className}`}
      {...rest}
    >
      <span className="play-icon">
        <img src={googlePlay} alt="Google Play logo" />
      </span>
      <span className="play-text">Download Now</span>
    </a>
  );
};

export default PlayDownloadButton;
