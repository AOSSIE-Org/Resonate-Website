import React from 'react';
import Image from 'next/image';
import './MiddleSection.css';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import phoneImage from '../../assets/resonate_app_bottom.png';

const MiddleSection = () => {
  return (
    <section className="middle-section">
      <div className="middle-container">
        {/* Top Section */}
        <div className="top-content">
          <div className="text-content">
            <h2>Conversations,<br />Go Open-Source</h2>
            <p>
              With the rising popularity of social voice platforms such as 
              Clubhouse and Twitter Spaces, it is the right time for an open-
              source alternative to emerge. Such a platform would strengthen 
              trust and credibility within the open-source community while 
              offering transparency, flexibility, and community-driven innovation.
            </p>
          </div>
          <div className="phone-placeholder">
            {/* Phone will be positioned absolutely over the purple section */}
          </div>
        </div>

        {/* Bottom Purple Section */}
        <div className="bottom-purple-section">
          <div className="purple-content">
            <div className="voices-text">
              <h3><span className="voices-highlight">VOICES WITHOUT</span><br /><span className="italic">LIMITS</span></h3>
              <button className="create-join-btn">
                Create/Join →
              </button>
            </div>
          </div>
          <div className="app-availability">
            <p className="availability-text">The Mobile app<br></br> is available now</p>
            <div className="store-icons">
              <div className="store-icon apple">
                <FaApple />
              </div>
              <div className="store-icon google">
                <FaGooglePlay />
              </div>
            </div>
          </div>
        </div>

        {/* Phone Display - Positioned to overlay the purple section */}
        <div className="phone-display">
          <Image 
            src={phoneImage} 
            alt="Resonate App Interface" 
            width={300}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default MiddleSection;