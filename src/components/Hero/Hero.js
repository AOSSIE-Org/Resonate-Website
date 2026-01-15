import React from 'react';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import phoneImage from '../../assets/resonate_app.png';

const Hero = () => {
  return (
    <section className="hero overflow-hidden bg-white py-16">
      <div className="hero-container relative mx-auto flex max-w-[1200px] flex-col items-center justify-between px-5 md:flex-row md:text-left text-center">
        <div className="hero-image relative z-10 mb-8 flex min-w-[300px] flex-1 justify-center md:mb-0">
          <img src={phoneImage} alt="Resonate App on Phone" className="h-auto max-h-[500px] max-w-full object-contain" />
        </div>
        <div className="hero-content relative z-10 flex-1 min-w-[300px] md:pl-8 pl-0">
          <div className="yellow-gradient-bg pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 blur-[40px]" style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 193, 7, 0.4) 0%, rgba(255, 235, 59, 0.3) 25%, rgba(255, 193, 7, 0.2) 50%, rgba(255, 193, 7, 0.1) 75%, transparent 100%)'
          }}></div>
          <h1 className="mb-2 text-[3.5rem] font-extrabold leading-[1.1] text-[#1a1a1a]">Clubhouse,<br />but Open Source</h1>
          <h2 className="mb-4 text-[2.5rem] font-normal text-[#1a1a1a]">A social voice platform.</h2>
          <p className="maintained-by mb-8 text-[1.1rem] text-[#666]">A Project Maintained by <a href="https://aossie.org" className="aossie-link text-[#666] underline">AOSSIE</a></p>

          <div className="hero-buttons flex max-w-[350px] flex-col gap-4 mx-auto md:mx-0">
            <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="btn btn-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-[30px] border-none bg-[#FFC107] px-6 py-[15px] text-base font-bold text-black transition-transform hover:scale-[1.02]">
              Create/Join Room <FaArrowRight />
            </a>
            <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="btn btn-secondary flex w-full cursor-pointer items-center justify-center gap-2 rounded-[30px] border-none bg-[#1a1a1a] px-6 py-[15px] text-base font-bold text-white transition-transform hover:scale-[1.02]">
              Contribute to the Project <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-description-container mx-auto mt-16 max-w-[900px] px-5 text-center">
        <p className="text-[1.1rem] leading-[1.8] text-[#333]">
          With the rising popularity of social voice platforms such as Clubhouse and Twitter Spaces, it is high time for an Open Source alternative. A platform like this would not only enhance credibility within the open-source community but also attract more users and foster growth. An engagement platform that is Open Source has the potential to drive significant traction and help establish a strong presence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
