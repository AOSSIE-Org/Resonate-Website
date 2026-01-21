import React from 'react';
import { HiMicrophone, HiUsers, HiLightningBolt, HiChatAlt2 } from 'react-icons/hi';
import './Features.css';
 feat/Features-section-to-improve-visual-hierarchy-and-interactivity

const featuresData = [
  {
    id: 1,
    title: "Real-time Audio Communication",
    description: "Join rooms and jump into conversations instantly with high-quality, low-latency audio.",
    Icon: HiMicrophone,
    color: "#FFD54F",

import featureImage1 from '../../assets/roomscreen.png';
import featureImage2 from '../../assets/createrooms.png';
import featureImage3 from '../../assets/pairchat.png';
import featureImage4 from '../../assets/chatscreen.png';
const featuresData = [
  {
    id: 1,
    title: "Real-time Audio Communication by joining rooms and talking to people.",
    image: featureImage1,
 main
    align: "left"
  },
  {
    id: 2,
 feat/Features-section-to-improve-visual-hierarchy-and-interactivity
    title: "Moderate Rooms & Events",
    description: "Take control of your community. Create rooms, moderate speakers, and host engaging events.",
    Icon: HiUsers,
    color: "#64B5F6",
    title: "Ability to create rooms and moderate speakers and events.",
    image: featureImage2,
 main
    align: "right"
  },
  {
    id: 3,
 feat/Features-section-to-improve-visual-hierarchy-and-interactivity
    title: "Pair Chatting",
    description: "Find random partners to talk to instantly and discover new perspectives across the app.",
    Icon: HiLightningBolt,
    color: "#81C784",

    title: "Pair chatting to enable users to find random partners to talk to in the app.",
    image: featureImage3,
 main
    align: "left"
  },
  {
    id: 4,
 feat/Features-section-to-improve-visual-hierarchy-and-interactivity
    title: "Real-time Messaging",
    description: "Keep the conversation going with instant text messaging. Perfect for sharing links and quick thoughts. (Coming Soon)",
    Icon: HiChatAlt2,
    color: "#FF8A65",

    title: "Real-time messaging",
    image: featureImage4,
 main
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
            <span className="feature-number">0{feature.id}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};


export default Features;
