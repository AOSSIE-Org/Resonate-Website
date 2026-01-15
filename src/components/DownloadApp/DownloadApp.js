import React from 'react';
import playStoreBtn from '../../assets/Button-1.png';

const DownloadApp = () => {
  return (
    <section className="download-app-section flex justify-center bg-white px-5 py-16 dark:bg-[#121212] transition-colors duration-300">
      <div className="download-app-card w-full max-w-[1000px] rounded-[20px] bg-[#1a1a1a] px-8 py-16 text-center text-white">
        <h2 className="mb-8 text-[2.5rem] font-normal">Get the Resonate Mobile app.</h2>
        <div className="store-buttons flex flex-wrap justify-center gap-8">
          <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="store-btn group">
            <img src={playStoreBtn} alt="Get it on Google Play" className="h-[50px] w-auto transition-transform group-hover:scale-105" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
