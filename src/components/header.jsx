import * as React from 'react';
import logo from '../assets/image.png';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="hidden w-full text-gray-600 md:flex md:items-center">
            <img src={logo} alt="AOSSIE Logo" className="h-8 w-auto mr-3" />
            <span className="text-sm font-medium">AOSSIE</span>
          </div>
          <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
            AOSSIE
          </div>
          <div className="flex items-center justify-end w-full">
            <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;