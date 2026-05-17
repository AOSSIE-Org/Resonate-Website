import React from "react";
import "./TechStack.css";
import flutterLogo from "../../assets/Flutter.png";
import appwriteLogo from "../../assets/Appwrite.png";
import Image from "next/image";

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>

        <div className="tech-logos">
          <div className="tech-logo">
            <Image
              src={flutterLogo}
              alt="Flutter"
              draggable={false}
              width={100}
              height={100}
              quality={80}
              loading="lazy"
            />
          </div>

          <div className="tech-logo">
            <Image
              src={appwriteLogo}
              alt="Appwrite"
              draggable={false}
              width={100}
              height={100}
              quality={80}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechStack);
