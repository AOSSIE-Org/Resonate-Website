import React from 'react';
import './Features.css';
import featureImage from '../../assets/Group 35899.png'; 

const featuresData = [
  {
    id: 1,
    title: "Real-time Audio Communication by joining rooms and talking to people.",
    image: featureImage,
    align: "left" 
  },
  {
    id: 2,
    title: "Ability to create rooms and moderate speakers and events.",
    image: featureImage,
    align: "right" 
  },
  {
    id: 3,
    title: "Pair chatting to enable users to find random partners to talk to in the app.",
    image: featureImage,
    align: "left"
  },
  {
    id: 4,
    title: "Real-time messaging(Coming Soon)",
    image: featureImage,
    align: "right"
  }
];

const Features = () => {
  return (
    <section className="features">
      {featuresData.map((feature) => (
        <div key={feature.id} className={`feature-item ${feature.align === 'right' ? 'reverse' : ''}`}>
          <div className="feature-image">
            <img src={feature.image} alt={`Feature ${feature.id}`} />
          </div>
          <div className="feature-content">
            <h3>{feature.id}. {feature.title}</h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
