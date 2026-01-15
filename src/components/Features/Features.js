import React from 'react';
import featureImage1 from '../../assets/roomscreen.png';
import featureImage2 from '../../assets/createrooms.png';
import featureImage3 from '../../assets/pairchat.png';
import featureImage4 from '../../assets/chatscreen.png';

const featuresData = [
  {
    id: 1,
    title: "Real-time Audio Communication by joining rooms and talking to people.",
    image: featureImage1,
    align: "left"
  },
  {
    id: 2,
    title: "Ability to create rooms and moderate speakers and events.",
    image: featureImage2,
    align: "right"
  },
  {
    id: 3,
    title: "Pair chatting to enable users to find random partners to talk to in the app.",
    image: featureImage3,
    align: "left"
  },
  {
    id: 4,
    title: "Real-time messaging",
    image: featureImage4,
    align: "right"
  }
];

const Features = () => {
  return (
    <section className="features mx-auto max-w-[1000px] px-5 py-16 dark:text-white">
      {featuresData.map((feature) => (
        <div key={feature.id} className={`feature-item flex flex-col items-center justify-between gap-8 md:flex-row md:gap-16 md:mb-24 mb-16 ${feature.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
          <div className="feature-image relative flex flex-1 justify-center before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[300px] before:w-[300px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(255,241,118,0.5)_0%,rgba(255,255,255,0)_70%)] dark:before:bg-[radial-gradient(circle,rgba(255,241,118,0.2)_0%,rgba(255,255,255,0)_70%)] before:content-['']">
            <img src={feature.image} alt={`Feature ${feature.id}`} className="h-auto max-h-[400px] max-w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="feature-content flex-1">
            <h3 className="text-[1.8rem] font-semibold leading-[1.4] text-[#1a1a1a] dark:text-white"><span className="feature-number text-[0.85em] text-[#FFC107]">{feature.id}.</span> {feature.title}</h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
