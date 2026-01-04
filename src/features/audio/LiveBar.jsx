
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockBackend';
import { Radio } from 'lucide-react';

const LiveBar = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        mockApi.getLiveRooms().then(setRooms);
    }, []);

    if (rooms.length === 0) return null;

    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
                <Radio color="red" size={20} />
                <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Live Now</h2>
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'none' /* Firefox */
            }}>
                {rooms.map(room => (
                    <div
                        key={room.id}
                        onClick={() => navigate(`/room/${room.id}`)}
                        style={{
                            minWidth: '240px',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '16px',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid #eee',
                            cursor: 'pointer',
                            flexShrink: 0
                        }}
                    >
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{room.title}</h3>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', marginRight: '10px' }}>
                                {room.participants.slice(0, 3).map((p, i) => (
                                    <img
                                        key={p.id}
                                        src={p.avatar}
                                        alt={p.name}
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            border: '2px solid white',
                                            marginLeft: i > 0 ? '-10px' : 0,
                                            boxShadow: p.isSpeaking ? '0 0 0 2px var(--accent-yellow)' : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>+ {room.listeners} listening</span>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                            {room.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '10px', backgroundColor: '#F0F2F5', padding: '4px 8px', borderRadius: '12px', color: '#555' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveBar;
