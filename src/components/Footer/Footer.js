import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer py-6 bg-[#1a1a1a] text-white">
      <div className="footer-container mx-auto flex max-w-[1200px] items-center justify-between px-5">
        <div className="copyright text-[0.9rem] text-[#ccc]">
          &copy; 2025
        </div>
        <div className="footer-socials flex gap-4">
          <a href="https://github.com/AOSSIE-Org" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#FFC107] text-[0.9rem] text-[#1a1a1a] transition-transform hover:scale-110"><FaGithub /></a>
          <a href="https://x.com/aossie_org" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#FFC107] text-[0.9rem] text-[#1a1a1a] transition-transform hover:scale-110"><BsTwitterX /></a>
          <a href="https://www.linkedin.com/company/aossie" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#FFC107] text-[0.9rem] text-[#1a1a1a] transition-transform hover:scale-110"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
