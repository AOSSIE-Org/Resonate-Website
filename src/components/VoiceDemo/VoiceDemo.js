import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './VoiceDemo.css';

const avatarData = [
    { id: 1, name: 'Alex Johnson', role: 'Speaker', initial: 'AJ' },
    { id: 2, name: 'Sarah Chen', role: 'Speaker', initial: 'SC' },
    { id: 3, name: 'Marcus Bell', role: 'Listener', initial: 'MB' },
    { id: 4, name: 'Elena Rodriguez', role: 'Speaker', initial: 'ER' },
    { id: 5, name: 'Kenji Sato', role: 'Listener', initial: 'KS' },
    { id: 6, name: 'Lily White', role: 'Listener', initial: 'LW' },
];

const VoiceDemo = () => {
    const containerRef = useRef(null);
    const [activeSpeakers, setActiveSpeakers] = useState([1]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

            if (mediaQuery.matches) return;

            // Pulse animation for active speakers
            const createPulse = (element) => {
                const waves = element.querySelectorAll('.wave-circle');
                gsap.set(waves, { scale: 1, opacity: 0 });

                return gsap.to(waves, {
                    scale: 1.5,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.5,
                    repeat: -1,
                    ease: 'power2.out',
                    onStart: function () {
                        gsap.set(this.targets(), { opacity: 0.4 });
                    }
                });
            };

            let pulseAnimations = [];

            // Effect to handle speaker rotation
            const rotateSpeakers = () => {
                // Kill previous animations
                pulseAnimations.forEach(anim => anim.kill());
                pulseAnimations = [];

                // Randomly pick 1 or 2 speakers
                const speakerIndices = avatarData
                    .filter(a => a.id <= 4) // Picking from those who can speak
                    .map(a => a.id);

                const count = Math.random() > 0.5 ? 2 : 1;
                const shuffled = [...speakerIndices].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, count);

                setActiveSpeakers(selected);

                // Add pulse to new active speakers
                selected.forEach(id => {
                    const el = containerRef.current.querySelector(`.avatar-wrapper[data-id="${id}"]`);
                    if (el) {
                        pulseAnimations.push(createPulse(el));
                    }
                });
            };

            const interval = setInterval(rotateSpeakers, 3000);
            rotateSpeakers(); // Initial call

            return () => {
                clearInterval(interval);
                pulseAnimations.forEach(anim => anim.kill());
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="voice-demo-section">
            <div className="voice-demo-container" ref={containerRef}>
                <div className="room-header">
                    <h2 className="room-title">Community Voice Lounge</h2>
                    <div className="room-status">
                        <span className="status-dot"></span>
                        LIVE: {avatarData.length} Users
                    </div>
                </div>

                <div className="avatars-grid">
                    {avatarData.map((avatar) => (
                        <div
                            key={avatar.id}
                            className={`avatar-wrapper ${activeSpeakers.includes(avatar.id) ? 'speaking' : ''}`}
                            data-id={avatar.id}
                            tabIndex="0"
                            aria-label={`${avatar.name}, ${avatar.role}`}
                        >
                            <div className="avatar-circle">
                                <div className="avatar-placeholder">{avatar.initial}</div>
                                <div className="wave-circle"></div>
                                <div className="wave-circle"></div>
                            </div>
                            <div className="avatar-name">{avatar.name}</div>
                            <div className="avatar-role">{avatar.role}</div>
                            <div className="hover-info">{avatar.name} • {avatar.role}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VoiceDemo;
