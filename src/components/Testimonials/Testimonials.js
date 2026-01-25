import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Community Manager",
    avatar: "AT",
    content: "Resonate has transformed how our community connects. The audio quality is crystal clear, and the open-source nature means we can trust the platform with our conversations.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Podcast Host",
    avatar: "SC",
    content: "Finally, a Clubhouse alternative that respects user privacy! The room moderation features are fantastic, and I love being part of an open-source community.",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Tech Enthusiast",
    avatar: "MW",
    content: "As a developer, I appreciate the transparency of Resonate. Being able to contribute to the codebase while using a polished product is the best of both worlds.",
    rating: 5
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    content: "The pair chatting feature is genius! It's helped me connect with so many like-minded creators. Resonate truly understands what community building means.",
    rating: 5
  },
  {
    id: 5,
    name: "David Park",
    role: "Startup Founder",
    avatar: "DP",
    content: "We switched our team's voice meetings to Resonate. The real-time messaging combined with audio rooms gives us the flexibility we need for remote collaboration.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const getVisibleIndices = useCallback(() => {
    const total = testimonials.length;
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return { prev, current: currentIndex, next };
  }, [currentIndex]);

  const animateToIndex = useCallback((newIndex, direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const cards = cardRefs.current;
    const { prev, current, next } = getVisibleIndices();

    // Animate out current cards
    gsap.to(cards[current], {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in'
    });

    gsap.to(cards[direction === 'next' ? next : prev], {
      x: direction === 'next' ? -150 : 150,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, getVisibleIndices]);

  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    animateToIndex(newIndex, 'next');
  }, [currentIndex, animateToIndex]);

  const goToPrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    animateToIndex(newIndex, 'prev');
  }, [currentIndex, animateToIndex]);

  const goToIndex = useCallback((index) => {
    if (index === currentIndex || isAnimating) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    animateToIndex(index, direction);
  }, [currentIndex, isAnimating, animateToIndex]);

  useEffect(() => {
    // Animate cards when currentIndex changes
    const cards = cardRefs.current;
    const { prev, current, next } = getVisibleIndices();

    // Reset and animate in
    gsap.fromTo(cards[current],
      { x: 0, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(cards[prev],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 0.5, scale: 0.85, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(cards[next],
      { x: 50, opacity: 0 },
      { x: 0, opacity: 0.5, scale: 0.85, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentIndex, getVisibleIndices]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, goToNext]);

  const { prev, current, next } = getVisibleIndices();

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Users Say</h2>
        <p className="testimonials-subtitle">
          Join thousands of users who have made Resonate their go-to voice platform
        </p>

        <div className="carousel-wrapper">
          <button
            className="carousel-btn carousel-btn-prev"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="carousel" ref={carouselRef}>
            {[prev, current, next].map((index, position) => (
              <div
                key={`${testimonials[index].id}-${position}`}
                ref={el => cardRefs.current[index] = el}
                className={`testimonial-card ${position === 1 ? 'active' : 'side'}`}
              >
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-content">{testimonials[index].content}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonials[index].avatar}</div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[index].name}</h4>
                    <p className="author-role">{testimonials[index].role}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-btn carousel-btn-next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
