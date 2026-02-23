import "./Features.css";
import featureImage1 from "../../assets/roomscreen.png";
import featureImage2 from "../../assets/createrooms.png";
import featureImage3 from "../../assets/pairchat.png";
import featureImage4 from "../../assets/chatscreen.png";
import { useSkeletonLoading } from "../Skeleton/useSkeletonLoading";
import { SkeletonImage, SkeletonText } from "../Skeleton";

const featuresData = [
  {
    id: 1,
    title:
      "Real-time Audio Communication by joining rooms and talking to people.",
    image: featureImage1,
    align: "left",
  },
  {
    id: 2,
    title: "Ability to create rooms and moderate speakers and events.",
    image: featureImage2,
    align: "right",
  },
  {
    id: 3,
    title:
      "Pair chatting to enable users to find random partners to talk to in the app.",
    image: featureImage3,
    align: "left",
  },
  {
    id: 4,
    title: "Real-time messaging",
    image: featureImage4,
    align: "right",
  },
];

const Features = () => {
  const isLoading = useSkeletonLoading();

  const featureSkeletons = [1, 2, 3, 4].map((id) => (
    <div
      key={id}
      className={`feature-item ${id % 2 === 0 ? "reverse" : ""}`}
    >
      <div className="feature-image">
        <SkeletonImage aspectRatio="4/3" />
      </div>
      <div className="feature-content">
        <SkeletonText lines={2} />
      </div>
    </div>
  ));

  if (isLoading) {
    return <section className="features">{featureSkeletons}</section>;
  }

  return (
    <section className="features">
      {featuresData.map((feature) => (
        <div
          key={feature.id}
          className={`feature-item ${
            feature.align === "right" ? "reverse" : ""
          }`}
        >
          <div className="feature-image">
            <img
              src={feature.image.src}
              alt={`Feature ${feature.id}`}
              width={400}
              height={300}
            />
          </div>
          <div className="feature-content">
            <h3>
              <span className="feature-number">{feature.id}.</span>{" "}
              {feature.title}
            </h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
