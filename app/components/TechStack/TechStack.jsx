import "./TechStack.css";
import flutterLogo from "../../assets/Flutter.png";
import appwriteLogo from "../../assets/Appwrite.png";
import { useSkeletonLoading } from "../Skeleton/useSkeletonLoading";
import { SkeletonTitle, SkeletonImage } from "../Skeleton";

const TechStack = () => {
  const isLoading = useSkeletonLoading();

  if (isLoading) {
    return (
      <section className="tech-stack-container">
        <div className="tech-stack">
          <SkeletonTitle style={{ width: "150px", margin: "0 auto 2rem" }} />
          <div className="tech-logos">
            <div className="tech-logo">
              <SkeletonImage aspectRatio="1/1" style={{ width: "80px", height: "80px" }} />
            </div>
            <div className="tech-logo">
              <SkeletonImage aspectRatio="1/1" style={{ width: "80px", height: "80px" }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

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
