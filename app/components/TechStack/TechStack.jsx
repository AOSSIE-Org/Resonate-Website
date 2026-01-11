import "./TechStack.css";
import flutterLogo from "../../assets/logos/Flutter.png";
import appwriteLogo from "../../assets/logos/Appwrite.png";

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
          <div className="tech-logo">
            <img src={flutterLogo.src} alt="Flutter" />
          </div>
          <div className="tech-logo">
            <img src={appwriteLogo.src} alt="Appwrite" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
