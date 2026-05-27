import React from "react";
import Image from "next/image";
import "./TechStack.css";
import flutterLogo from "../../assets/Flutter.png";
import appwriteLogo from "../../assets/Appwrite.png";

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
          <div className="tech-logo">
            <Image src={flutterLogo} alt="Flutter" draggable={false} />
          </div>
          <div className="tech-logo">
            <Image src={appwriteLogo} alt="Appwrite" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechStack);
