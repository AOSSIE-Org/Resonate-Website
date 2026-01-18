import "./About.css";
import AossieLogo from "../../assets/aossie_logo.png";
import { SiGitlab } from "react-icons/si";
import { FaEnvelope, FaGithub, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-logo">
          <img src={AossieLogo.src} alt="AOSSIE Logo" />
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

export default About;
