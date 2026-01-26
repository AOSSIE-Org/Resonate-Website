import React, { useRef, useEffect } from 'react';
import './Hero.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import phoneImage from '../../assets/resonate_app.png';
import roomScreen from '../../assets/roomscreen.png';
import createRoomScreen from '../../assets/createrooms.png';
import pairChatScreen from '../../assets/pairchat.png';
import chatScreen from '../../assets/chatscreen.png';

const Hero = () => {
  const deviceRef = useRef(null);

  useEffect(() => {
    const device = deviceRef.current;
    if (!device) return;

    // Mouse Parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * 30;

      gsap.to(device, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial Scroll Rotation
    gsap.to(device, {
      rotateY: "+=360",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Feature Screen Transitions
    const screens = document.querySelectorAll('.screen-content');
    gsap.utils.toArray('.feature-item').forEach((feature, i) => {
      ScrollTrigger.create({
        trigger: feature,
        start: "top 80%",
        onEnter: () => {
          screens.forEach(s => s.classList.remove('active'));
          if (screens[i + 1]) screens[i + 1].classList.add('active');
        },
        onEnterBack: () => {
          screens.forEach(s => s.classList.remove('active'));
          if (screens[i + 1]) screens[i + 1].classList.add('active');
        },
        onLeaveBack: () => {
          if (i === 0) {
            screens.forEach(s => s.classList.remove('active'));
            screens[0].classList.add('active');
          }
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().filter(st => st.trigger === ".hero" || String(st.vars.trigger).includes('feature')).forEach(st => st.kill());
    };
  }, []);
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-image-3d-wrapper">
          <div className="device-container" ref={deviceRef}>
            <div className="device-body">
              <div className="device-screen">
                <div className="screen-content active" style={{ backgroundImage: `url(${phoneImage})` }}></div>
                <div className="screen-content" style={{ backgroundImage: `url(${roomScreen})` }}></div>
                <div className="screen-content" style={{ backgroundImage: `url(${createRoomScreen})` }}></div>
                <div className="screen-content" style={{ backgroundImage: `url(${pairChatScreen})` }}></div>
                <div className="screen-content" style={{ backgroundImage: `url(${chatScreen})` }}></div>
              </div>
              <div className="device-reflection"></div>
              <div className="device-bezel-highlight"></div>
            </div>
          </div>
        </div>
        <div className="hero-content">
          <div className="yellow-gradient-bg"></div>
          <h1>Clubhouse,<br />but Open Source</h1>
          <h2>A social voice platform.</h2>
          <p className="maintained-by">A Project Maintained by <a href="https://aossie.org" className="aossie-link">AOSSIE</a></p>

          <div className="hero-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.resonate.resonate" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Create/Join Room <FaArrowRight />
            </a>
            <a href="https://github.com/AOSSIE-Org/Resonate" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Contribute to the Project <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-description-container">
        <p>
          With the rising popularity of social voice platforms such as Clubhouse and Twitter Spaces, it is high time for an Open Source alternative. A platform like this would not only enhance credibility within the open-source community but also attract more users and foster growth. An engagement platform that is Open Source has the potential to drive significant traction and help establish a strong presence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
