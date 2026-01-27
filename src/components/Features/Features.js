import React from 'react';
import './Features.css';
import featureImage1 from '../../assets/roomscreen.png';
import featureImage2 from '../../assets/createrooms.png';
import featureImage3 from '../../assets/pairchat.png';
import featureImage4 from '../../assets/chatscreen.png';

const featuresData = [
  {
    id: 1,
    title: "Join live voice rooms and talk to people in real time",
    image: featureImage1,
    alt: "Live voice room interface of Resonate app",
    align: "left"
  },
  {
    id: 2,
    title: "Create rooms and manage speakers and events",
    image: featureImage2,
    alt: "Create and manage voice rooms screen",
    align: "right"
  },
  {
    id: 3,
    title: "Pair chat to connect with random users instantly",
    image: featureImage3,
    alt: "Pair chat feature of Resonate app",
    align: "left"
  },
  {
    id: 4,
    title: "Real-time messaging with community members",
    image: featureImage4,
    alt: "Real-time chat screen of Resonate app",
    align: "right"
  }
];

const Features = () => {
  return (
    <section className="features" aria-label="Resonate features">
      <h2 style={{textAlign:"center", marginBottom:"3rem"}}>Key Features</h2>

      {featuresData.map((feature) => (
        <article 
          key={feature.id} 
          className={`feature-item ${feature.align === 'right' ? 'reverse' : ''}`}
        >
          <div className="feature-image">
            <img 
              src={feature.image} 
              alt={feature.alt} 
              loading="lazy"
            />
          </div>

          <div className="feature-content">
            <h3>{feature.title}</h3>
          </div>
        </article>
      ))}
    </section>
  );
};
export default Features;