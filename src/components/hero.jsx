import React from 'react';

const Hero = () => {
    return (
        <div className="flex flex-col -mt-8">
        <div className="flex flex-row">
          <div>
            <img
              src="/assets/mobile-phone.png"
              alt=""
              className="object-cover ml-20 mt-16 p-6"
            />
          </div>
          <div className="flex flex-col mr-12">
            <div className="relative -mt-12">
              <img src="/assets/vector.png" alt="" className="" />
              <h1 className="absolute text-5xl rale-way text-gray-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Clubhouse, but Open Source <br />
                <br /> A social voice platform.
              </h1>
            </div>

            <div className="flex flex-col px-40">
              <h1 className="ml-28 absolute text-2xl text-gray-900 bottom-28 left-1/2 -translate-y-1/2">
                A Project Maintained by AOSSIE
              </h1>
              <button className="bg-[#FFC107] py-3 px-5 rounded-full w-100 h-20 -mt-24 flex flex-row items-center">
                <p className="ml-24 font-bold">Create/Join Room </p>
                <img src="/assets/right-arrow.png" className="ml-2" />
              </button>
              <button className="bg-[#19191B] py-3 px-5 rounded-full text-white w-100 h-20 mt-8 flex flex-row items-center">
                <p className="ml-20 font-bold">Contribute to the Project</p>
                <img src="/assets/github.png" className="ml-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-auto h-68 mx-44 px-12">
          <p className="text-2xl">
            With the rising popularity of social voice platforms such as
            Clubhouse and Twitter Spaces, it is high time for an Open Source
            alternative. A platform like this would not only enhance credibility
            within the open-source community but also attract more users and
            foster growth. An engagement platform that is Open Source has the
            potential to drive significant traction and help establish a strong
            presence.
          </p>
        </div>
      </div>
    );
}

export default Hero;
