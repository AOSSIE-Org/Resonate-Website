import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Testimonials.css';

const testimonialsData = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'Product Designer',
        quote: "Resonate has completely transformed how I organize my workflow. The interface is intuitive, and the features are exactly what I needed.",
    },
    {
        id: 2,
        name: 'David Chen',
        role: 'Software Engineer',
        quote: "The best productivity tool I've used in years. Performance is top-notch, and the seamless syncing across devices is a lifesaver.",
    },
    {
        id: 3,
        name: 'Emily Davis',
        role: 'Creative Director',
        quote: "A game-changer for our remote team. It keeps everyone aligned and makes collaboration effortless. Highly recommended!",
    },
    {
        id: 4,
        name: 'Michael Ross',
        role: 'Startup Founder',
        quote: "I can't imagine running my business without it. Simple, elegant, and powerful. It just works.",
    },
    {
        id: 5,
        name: 'Jessica Lee',
        role: 'Freelance Writer',
        quote: "Finally, a tool that doesn't get in the way of my writing. The distraction-free mode is pure gold.",
    },
];

const Testimonials = () => {
    const wrapperRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // Duplicate content for seamless loop
        const content = wrapper.innerHTML;
        wrapper.innerHTML = content + content;

        const cards = wrapper.querySelectorAll('.testimonial-card');
        const totalWidth = wrapper.scrollWidth / 2; // Width of original set

        gsap.set(wrapper, { x: 0 });

        const tween = gsap.to(wrapper, {
            x: -totalWidth,
            duration: 30, // Adjust speed here
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) // Use modulo for seamless loop
            }
        });

        const handleMouseEnter = () => tween.pause();
        const handleMouseLeave = () => tween.resume();

        wrapper.addEventListener('mouseenter', handleMouseEnter);
        wrapper.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            wrapper.removeEventListener('mouseenter', handleMouseEnter);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
            tween.kill();
        };
    }, []);

    return (
        <section className="testimonials-section">
            <div className="testimonials-header">
                <h2>Loved by Thousands</h2>
                <p>See what our users are saying about us.</p>
            </div>
            <div className="testimonials-container">
                <div className="testimonials-wrapper" ref={wrapperRef}>
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="testimonial-card"
                        >
                            <div className="quote-icon">“</div>
                            <p className="testimonial-quote">{testimonial.quote}</p>
                            <div className="testimonial-author">
                                <h4>{testimonial.name}</h4>
                                <span>{testimonial.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
