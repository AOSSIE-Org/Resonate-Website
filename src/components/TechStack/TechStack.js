import appwriteLogo from '../../assets/Appwrite svg.png';
import flutterLogo from '../../assets/Flutter svg.png';
import './TechStack.css';

const TechStack = () => {
  return (
    <section className="tech-stack-container">
        <div className="tech-stack">
        <h2>TECH STACK</h2>
        <div className="tech-logos">
            <div className="tech-logo">
            <img src={flutterLogo} alt="Flutter" loading="lazy" decoding="async" />
            </div>
            <div className="tech-logo">
            <img src={appwriteLogo} alt="Appwrite" loading="lazy" decoding="async" />
            </div>
        </div>
        </div>
    </section>
  );
};

export default TechStack;
