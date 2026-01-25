import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Resonate?",
    answer:
      "Resonate is an open-source social voice platform similar to Clubhouse and Twitter Spaces, maintained by AOSSIE.",
  },
  {
    question: "Is Resonate open source?",
    answer:
      "Yes, Resonate is completely open source and welcomes community contributions.",
  },
  {
    question: "How can I contribute to Resonate?",
    answer:
      "You can contribute by reporting issues, submitting pull requests, or improving documentation via GitHub.",
  },
  {
    question: "Which technologies are used to build Resonate?",
    answer:
      "Resonate uses React for the frontend, GSAP for animations, and modern web technologies.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <div className="faq-answer-wrapper">
              <div className="faq-answer">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
