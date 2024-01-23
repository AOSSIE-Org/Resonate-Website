import React from 'react';

const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center mt-12 px-4 mx-4 lg:mx-32 bg-[#19191B] custom-box-shadow h-16 w-auto rounded-r-full rounded-l-full ">
        <div className="flex flex-row items-center">
          <img src="/assets/resonate_logo.png" className="w-8 h-8 ml-4" />
          <h1 className="text-white rale-way">Resonate</h1>
        </div>

        <div className="flex flex-row items-center justify-between lg:gap-8 lg:mr-2">
          <div className="flex justify-end items-center">
            <p className=" text-white text-xs ">AOSSIE</p>
            <img src="/assets/icon-1.png" alt="" className="w-4 h-4 ml-2" />
          </div>

          <img src="/assets/github.png" alt="" className="w-6 h-6" />

          <button className="bg-[#FFC107] p-2 lg:px-5 lg:py-3 text-xs rounded-full ">
            Download Now
          </button>
        </div>
      </div>
    );
}

export default Navbar;
