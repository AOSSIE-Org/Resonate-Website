import React from 'react';

const Promo = () => {
    return (
        <div className="flex flex-col gap-9 bg-black rounded-2xl mx-56 mt-16">
        <h1 className="text-6xl text-white text-center mt-16">Get the Resonate Mobile app.</h1>
        <div className="flex flex-row gap-7 mb-12 justify-center">
          <button className="flex flex-row items-center py-3 px-6 bg-white rounded-full">
            <img src="/assets/apple.png" alt="" />
            <p className="ml-2">Download Now</p>
          </button>
          <button className="flex flex-row items-center py-3 px-6 bg-white rounded-full">
            <img src="/assets/ps.png" alt="" className="" />
            <p className="ml-2">Download Now</p>
          </button>
        </div>
      </div>
    );
}

export default Promo;
