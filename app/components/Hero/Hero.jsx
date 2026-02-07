import "./Hero.css";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import phoneImage from "../../assets/resonate_app.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-image">
          <Image
            src={phoneImage}
            alt="Resonate App on Phone"
            sizes="(max-width: 768px) 80vw, 40vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
        <div className="hero-content">
          <div className="yellow-gradient-bg"></div>
          <h1>
            Clubhouse,
            <br />
            but Open Source
          </h1>
          <h2>A social voice platform.</h2>
          <p className="maintained-by">
            A Project Maintained by{" "}
            <a href="https://aossie.org" className="aossie-link">
              AOSSIE
            </a>
          </p>

          <div className="hero-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Create/Join Room <FaArrowRight />
            </a>
            <a
              href="https://github.com/AOSSIE-Org/Resonate"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Contribute to the Project <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-description-container">
        <p>
          With the rising popularity of social voice platforms such as Clubhouse
          and Twitter Spaces, it is high time for an Open Source alternative. A
          platform like this would not only enhance credibility within the
          open-source community but also attract more users and foster growth.
          An engagement platform that is Open Source has the potential to drive
          significant traction and help establish a strong presence.
        </p>
      </div>
    </section>
  );
};

export default Hero;
