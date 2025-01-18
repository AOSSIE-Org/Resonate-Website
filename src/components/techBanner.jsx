import React from 'react';

const TechBanner = () => {
    return (
        <div className="flex flex-col bg-[#19191B] h-48 w-292 mt-16 mx-56 rounded-2xl">
        <h1 className="flex text-white text-5xl underline mt-8 justify-center mx-auto text-center">
          Tech Stack
        </h1>
        <div className="flex flex-row items-center justify-center text-center mx-auto mt-12 mb-4 gap-16 ">
          <img src="/assets/flutter.png" alt="" className="w-32 h-8" />
          <img src="/assets/appwrite.png" alt="" className="w-52 h-8" />
        </div>
      </div>
    );
}

export default TechBanner;
