import "./TechStack.css";
import Image from "next/image";
import flutterLogo from "../../assets/Flutter.png";
import appwriteLogo from "../../assets/Appwrite.png";

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
          <div className="tech-logo">
            <Image src={flutterLogo} alt="Flutter" width={150} height={150} loading="lazy" />
          </div>
          <div className="tech-logo">
            <Image src={appwriteLogo} alt="Appwrite" width={150} height={150} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
