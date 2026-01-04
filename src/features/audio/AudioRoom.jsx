
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockBackend';
import { Mic, MicOff, Hand, ChevronDown } from 'lucide-react';

const AudioRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        mockApi.getRoomDetails(id).then(setRoom);
    }, [id]);

    if (!room) return <div style={{ padding: 40, textAlign: 'center' }}>Loading Room...</div>;

    return (
        <div className="container" style={{ backgroundColor: '#1A1A1A', minHeight: '100vh', color: 'white', paddingBottom: '90px' }}>
            {/* Header */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <ChevronDown color="white" size={32} />
                </div>
                <div style={{ textAlign: 'center', flex: 1, padding: '0 20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>{room.title}</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        {room.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '10px', backgroundColor: '#333', padding: '4px 8px', borderRadius: '12px', color: '#ccc' }}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div style={{ width: 32 }}></div> {/* Spacer */}
            </div>

            {/* Stage (Speakers) */}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {room.participants.map(p => (
                    <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={p.avatar}
                                alt={p.name}
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: '30px', /* Squircle */
                                    border: p.isSpeaking ? '3px solid var(--accent-yellow)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                            {/* Mute Indicator */}
                            {p.isMuted && (
                                <div style={{ position: 'absolute', bottom: -5, right: -5, backgroundColor: 'white', borderRadius: '50%', padding: 4 }}>
                                    <MicOff size={12} color="black" />
                                </div>
                            )}
                        </div>
                        <span style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                            {p.name} {p.id === 'p1' && '👑'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Audience Section */}
            <div style={{ padding: '20px', borderTop: '1px solid #333', marginTop: '20px' }}>
                <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '16px' }}>Audience</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
                            <img src={`https://i.pravatar.cc/150?u=a${i}`} alt="Audience" style={{ width: 50, height: 50, borderRadius: '20px', backgroundColor: '#333' }} />
                            <span style={{ marginTop: '6px', fontSize: '11px' }}>User {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                maxWidth: '480px',
                backgroundColor: '#222',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                borderTopRightRadius: '20px',
                borderTopLeftRadius: '20px',
                alignItems: 'center'
            }}>
                <button
                    style={{ backgroundColor: '#333', color: 'white', padding: '12px 20px', borderRadius: 'var(--radius-full)', fontSize: '14px', fontWeight: 'bold' }}
                    onClick={() => navigate('/')}
                >
                    ✌️ Leave quietly
                </button>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => setIsMuted(!isMuted)} style={{ backgroundColor: isMuted ? 'white' : '#444', padding: '12px', borderRadius: '50%' }}>
                        {isMuted ? <MicOff color="black" /> : <Mic color="white" />}
                    </button>
                    <button style={{ backgroundColor: '#333', padding: '12px', borderRadius: '50%', color: 'white' }}>
                        <Hand />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AudioRoom;
