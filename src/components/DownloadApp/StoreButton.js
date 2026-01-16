import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import './DownloadApp.css';

const StoreButton = ({ store, url }) => {
  const isGoogle = store === 'google';
  const Icon = isGoogle ? FaGooglePlay : FaApple;
  const subtitle = isGoogle ? 'GET IT ON' : 'Download on the';
  const title = isGoogle ? 'Google Play' : 'App Store';

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="store-badge"
    >
      <Icon className="store-icon" />
      <div className="store-text">
        <span className="store-subtitle">{subtitle}</span>
        <span className="store-title">{title}</span>
      </div>
    </a>
  );
};

export default StoreButton;
