import React from "react";
import "./AppleDownloadButton.css";
import applePlay from "../../../assets/applePlay.svg";

const AppleDownloadButton = ({
  href,
  className = "",
  ...rest
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`apple-download-btn ${className}`}
      {...rest}
    >
      <span className="apple-icon">
        <img src={applePlay} alt="Apple logo" />
      </span>
      <span className="apple-text">Download Now</span>
    </a>
  );
};

export default AppleDownloadButton;
