import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaSun, FaMoon } from 'react-icons/fa';
import logo from '../../assets/resonate_logo_white.svg';

const Navbar = ({ theme, toggleTheme }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="sticky top-5 z-[1000] mx-auto my-5 w-[90%] max-w-[1200px] rounded-[50px] bg-[#030303dc] px-[30px] py-[15px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px] transition-all md:w-[95%] md:px-5 md:py-2.5 md:my-2.5 dark:bg-[#1E1E1E]/90">
      <div className="flex w-full items-center justify-between">
        <div className="flex cursor-pointer items-center text-[1.2rem] font-bold text-white" onClick={scrollToTop}>
          <img src={logo} alt="Resonate Logo" className="mr-[10px] h-6" />
          <span className="hidden min-[480px]:block">Resonate</span>
        </div>
        <div className="flex items-center gap-8 md:gap-5 sm:gap-[15px]">
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center rounded-full p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <FaSun size={20} className="text-[#FFC107]" /> : <FaMoon size={20} />}
          </button>
          <a href="https://aossie.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[5px] text-[0.9rem] font-medium uppercase text-white transition-colors hover:text-[#FFC107] sm:text-[0.8rem]">
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>
          <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[5px] text-[0.9rem] font-medium uppercase text-white transition-colors hover:text-[#FFC107] sm:text-[0.8rem]">
            <FaGithub size={20} />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="cursor-pointer rounded-[25px] bg-[#FFC107] px-6 py-2.5 text-[0.9rem] font-bold text-black transition-transform duration-200 hover:scale-105 hover:bg-[#ffca2c] md:px-4 md:py-2 md:text-[0.8rem]">Download Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
