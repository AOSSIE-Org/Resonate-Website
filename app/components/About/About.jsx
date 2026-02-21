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
            <a
              href="https://www.youtube.com/@AOSSIE-Org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
