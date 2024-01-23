import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black flex flex-row justify-between mt-16 p-8">
        <div className="flex flex-row items-center text-base ml-20">
          <img src="/assets/copyright.png" alt="" />
        </div>

        <div className="flex flex-row justify-between items-center mr-20">
          <div className="rounded-full bg-yellow-400 p-1 ml-1">
            <img src="/assets/instagram.png" alt="" />
          </div>
          <div className="rounded-full bg-yellow-400 p-1 ml-1">
          <img src="/assets/facebook.png" alt="" />
          </div>
          <div className="rounded-full bg-yellow-400 p-1 ml-1">
          <img src="/assets/twitter.png" alt="" />
          </div>
          <div className="rounded-full bg-yellow-400 p-1 ml-1">
          <img src="/assets/linkedin.png" alt="" />
          </div>
        </div>

      </footer>
    );
}

export default Footer;
