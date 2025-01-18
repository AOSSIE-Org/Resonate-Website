import React from 'react';

const AoBanner = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start mt-16 mx-4 lg:mx-20 gap-6 lg:gap-12 w-full min-h-screen">
            <img src="/assets/aossie.png" alt="Australian Open-Source" className="w-full lg:w-auto h-auto" />
            <div className="flex flex-col gap-6 lg:gap-12 mt-4 text-center lg:text-left px-4 lg:px-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">
                    We Innovate <br /> We Educate
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 w-full mx-2 lg:mx-35 px-4 mt-4">
                    We are an Australian not-for-profit umbrella organization for
                    open-source projects. We believe the open-source philosophy provides
                    a resource-efficient channel to transfer knowledge and achieve
                    innovation and education.
                </p>
                <img src="/assets/socials.png" alt="Social Media" className="w-32 sm:w-40 lg:w-56 mx-auto lg:mx-0" />
            </div>
        </div>
    );
};

export default AoBanner;
