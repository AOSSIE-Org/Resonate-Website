import React from 'react';
import aossieLogo from '../../assets/aossie_logo.png';
import { FaEnvelope, FaGithub, FaDiscord } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { SiGitlab } from 'react-icons/si';

const About = () => {
  return (
    <section className="about bg-white py-16">
      <div className="about-container mx-auto flex max-w-[1000px] flex-col items-center justify-center gap-16 px-5 md:flex-row md:text-left text-center">
        <div className="about-logo flex flex-1 justify-center">
          <img src={aossieLogo} alt="AOSSIE Logo" className="h-auto max-h-[300px] max-w-full" />
        </div>
        <div className="about-content flex-1">
          <h2 className="mb-6 text-[2.5rem] font-bold leading-[1.2] text-[#1a1a1a]">We Innovate<br />We Educate</h2>
          <p className="mb-8 text-base leading-[1.6] text-[#555]">
            We are an Australian not-for-profit umbrella organization for open-source projects. We believe the open-source philosophy provides a resource-efficient channel to transfer knowledge and achieve innovation and education.
          </p>
          <div className="social-links flex gap-6 justify-center md:justify-start">
            <a href="mailto:contact@aossie.org" className="text-[1.5rem] text-[#888] transition-colors hover:text-[#1a1a1a]"><FaEnvelope /></a>
            <a href="https://gitlab.com/aossie" className="text-[1.5rem] text-[#888] transition-colors hover:text-[#1a1a1a]"><SiGitlab /></a>
            <a href="https://github.com/AOSSIE-Org" className="text-[1.5rem] text-[#888] transition-colors hover:text-[#1a1a1a]"><FaGithub /></a>
            <a href="https://discord.com/invite/MMZBadkYFm" className="text-[1.5rem] text-[#888] transition-colors hover:text-[#1a1a1a]"><FaDiscord /></a>
            <a href="https://x.com/aossie_org" className="text-[1.5rem] text-[#888] transition-colors hover:text-[#1a1a1a]"><BsTwitterX /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
