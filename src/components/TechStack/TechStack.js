import React from 'react';
import flutterLogo from '../../assets/Flutter svg.png';
import appwriteLogo from '../../assets/Appwrite svg.png';

const TechStack = () => {
  return (
    <section className="tech-stack-container px-5">
        <div className="tech-stack mx-auto mb-16 max-w-[1000px] rounded-[20px] bg-[#1a1a1a] py-16 text-center text-white dark:bg-[#1E1E1E] border dark:border-gray-800">
        <h2 className="mb-12 text-[2rem] uppercase underline underline-offset-[10px]">TECH STACK</h2>
        <div className="tech-logos flex flex-wrap justify-center gap-16">
            <div className="tech-logo flex items-center gap-4 text-[2rem] font-bold">
            <img src={flutterLogo} alt="Flutter" className="h-[50px] w-auto" />
            </div>
            <div className="tech-logo flex items-center gap-4 text-[2rem] font-bold">
            <img src={appwriteLogo} alt="Appwrite" className="h-[50px] w-auto" />
            </div>
        </div>
        </div>
    </section>
  );
};

export default TechStack;
