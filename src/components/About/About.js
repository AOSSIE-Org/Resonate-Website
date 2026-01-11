import React from 'react';
import './About.css';
import aossieLogo from '../../assets/aossie_logo.png'; 
import { FaEnvelope, FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import { SiGitlab } from 'react-icons/si'; 

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-logo">
          <img src={aossieLogo} alt="AOSSIE Logo" />
        </div>
        <div className="about-content">
          <h2>We Innovate<br />We Educate</h2>
          <p>
            We are an Australian not-for-profit umbrella organization for open-source projects. We believe the open-source philosophy provides a resource-efficient channel to transfer knowledge and achieve innovation and education.
          </p>
          <div className="social-links">
            <a href="mailto:contact@aossie.org"><FaEnvelope /></a>
            <a href="https://gitlab.com/aossie"><SiGitlab /></a> 
            <a href="https://github.com/AOSSIE"><FaGithub /></a>
            <a href="https://discord.gg/yourlink"><FaDiscord /></a>
            <a href="https://twitter.com/aossie_org"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
