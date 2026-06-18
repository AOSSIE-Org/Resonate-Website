import React from "react";
import "./TechStack.css";

const TechStack = () => {
  const technologies = [
    { name: "Flutter", icon: "/flutter.svg" },
    { name: "Appwrite", icon: "/appwrite.svg" },
  ];

  return (
    <section className="tech-stack-container">
      <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
          {technologies.map((tech) => (
            <div key={tech.name} className="tech-logo">
              <img src={tech.icon} alt={tech.name} className="tech-icon" />
              <p className="tech-name">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechStack);
