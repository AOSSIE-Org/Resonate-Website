import React from "react";
import "./About.css";
import AossieLogo from "../../assets/aossie_logo.png";
import { SiGitlab } from "react-icons/si";
import { FaEnvelope, FaGithub, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-logo">
          <Image
            src={AossieLogo}
            alt="AOSSIE Logo"
            draggable={false}
            width={180}
            height={180}
            quality={80}
          />
        </div>
        <div className="about-content">
          <h2>
            We Innovate
            <br />
            We Educate
          </h2>
          <p>
            We are an Australian not-for-profit umbrella organization for
            open-source projects. We believe the open-source philosophy provides
            a resource-efficient channel to transfer knowledge and achieve
            innovation and education.
          </p>
          <div className="social-links">
            <a href="mailto:contact@aossie.org">
              <FaEnvelope />
            </a>
            <a href="https://gitlab.com/aossie">
              <SiGitlab />
            </a>
            <a href="https://github.com/AOSSIE-Org">
              <FaGithub />
            </a>
            <a href="https://discord.com/invite/MMZBadkYFm">
              <FaDiscord />
            </a>
            <a href="https://x.com/aossie_org">
              <BsTwitterX />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
