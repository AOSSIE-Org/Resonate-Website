import React from 'react';
import { HiMicrophone, HiUsers, HiLightningBolt, HiChatAlt2 } from 'react-icons/hi';
import './Features.css';

const featuresData = [
  {
    id: 1,
    title: "Real-time Audio Communication",
    description: "Join rooms and jump into conversations instantly with high-quality, low-latency audio.",
    Icon: HiMicrophone,
    color: "#FFD54F",
    align: "left"
  },
  {
    id: 2,
    title: "Moderate Rooms & Events",
    description: "Take control of your community. Create rooms, moderate speakers, and host engaging events.",
    Icon: HiUsers,
    color: "#64B5F6",
    align: "right"
  },
  {
    id: 3,
    title: "Pair Chatting",
    description: "Find random partners to talk to instantly and discover new perspectives across the app.",
    Icon: HiLightningBolt,
    color: "#81C784",
    align: "left"
  },
  {
    id: 4,
    title: "Real-time Messaging",
    description: "Keep the conversation going with instant text messaging. Perfect for sharing links and quick thoughts. (Coming Soon)",
    Icon: HiChatAlt2,
    color: "#FF8A65",
    align: "right"
  }
];

const Features = () => {
  return (
    <section className="features" id="features">
      {featuresData.map((feature) => (
        <div
          key={feature.id}
          className={`feature-item ${feature.align === 'reverse' ? 'reverse' : feature.align === 'right' ? 'reverse' : ''}`}
          tabIndex="0"
          role="article"
        >
          <div className="feature-visual" style={{ '--icon-color': feature.color }}>
            <div className="icon-wrapper">
              <feature.Icon className="feature-icon" aria-hidden="true" />
            </div>
            <div className="decorative-glow"></div>
          </div>
          <div className="feature-content">
            <span className="feature-number">{String(feature.id).padStart(2, '0')}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;

