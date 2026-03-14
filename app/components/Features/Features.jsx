import "./Features.css";
import featureImage1 from "../../assets/roomscreen.png";
import featureImage2 from "../../assets/createrooms.png";
import featureImage3 from "../../assets/pairchat.png";
import featureImage4 from "../../assets/chatscreen.png";

const featuresData = [
  {
    id: 1,
    title:
      "Join rooms for real-time audio communication and connect with people.",
    image: featureImage1,
    alt: "Screenshot of room screen for audio communication",
    align: "left",
  },
  {
    id: 2,
    title: "Create rooms and moderate speakers and events.",
    image: featureImage2,
    alt: "Interface for creating rooms",
    align: "right",
  },
  {
    id: 3,
    title:
      "Use pair chatting to find random partners for conversations in the app.",
    image: featureImage3,
    alt: "Pair chatting feature interface",
    align: "left",
  },
  {
    id: 4,
    title: "Send real-time messages within conversations.",
    image: featureImage4,
    alt: "Chat screen for real-time messaging",
    align: "right",
  },
];

const Features = () => {
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
              alt={feature.alt}
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
