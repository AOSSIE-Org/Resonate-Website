import React from 'react';

const AoBanner = () => {
    return (
        <div className="flex flex-row mt-16 mx-56 gap-24 w-236 h-96">
        <img src="/assets/aossie.png" alt="" />

        <div className="flex flex-col gap-12 mt-4">
          <h1 className="text-5xl">
            We Innovate <br /> We Educate
          </h1>
          <p>
            We are an Australian not-for-profit umbrella organization for
            open-source projects. We believe the open-source philosophy provides
            a resource-efficient channel to transfer knowledge and achieve
            innovation and education.
          </p>
          <img src="/assets/socials.png" alt="" />
        </div>
      </div>
    );
}

export default AoBanner;
