
import React, { useState } from 'react';
import { mockApi } from '../../services/mockBackend';
import { Search, Phone, User, Mic } from 'lucide-react';

const RandomChat = () => {
    const [status, setStatus] = useState('idle'); // idle, searching, found
    const [match, setMatch] = useState(null);

    // Animation states


    const handleSearch = async () => {
        setStatus('searching');

        const user = await mockApi.findMatch();
        setMatch(user);
        setStatus('found');

    };

    if (status === 'found') {
        return (
            <div style={{ padding: '20px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ padding: '4px 12px', backgroundColor: '#e0ffe0', color: 'green', borderRadius: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
                    Match Found!
                </div>
                <img src={match.avatar} alt={match.name} style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: '20px', border: '5px solid var(--primary-blue)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{match.name}</h2>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
                    {match.interests.map(i => (
                        <span key={i} style={{ fontSize: '12px', backgroundColor: '#eee', padding: '6px 12px', borderRadius: '16px' }}>{i}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button style={{ backgroundColor: '#eee', padding: '16px', borderRadius: '50%' }}>
                        <User color="black" />
                    </button>
                    <button style={{ backgroundColor: '#2AD564', color: 'white', padding: '16px 32px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                        <Phone /> Start Talk
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>Random Match</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '50px' }}>Find someone to talk to instantly.</p>

            <div style={{ position: 'relative', marginBottom: '60px' }}>
                {/* Ripple Effect base */}
                <div style={{
                    width: 150, height: 150, borderRadius: '50%', backgroundColor: 'var(--primary-blue)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    boxShadow: '0 10px 30px rgba(47, 128, 237, 0.4)',
                    cursor: status === 'searching' ? 'default' : 'pointer',
                    animation: status === 'searching' ? 'pulse 2s infinite' : 'none'
                }} onClick={status === 'idle' ? handleSearch : null}>
                    {status === 'searching' ? <Search color="white" size={60} /> : <Mic color="white" size={60} />}
                </div>
            </div>

            {status === 'searching' ? (
                <p style={{ fontSize: '18px', color: 'var(--primary-blue)', fontWeight: 'bold' }}>Looking for people...</p>
            ) : (
                <button
                    className="btn-primary"
                    onClick={handleSearch}
                    style={{ maxWidth: '200px' }}
                >
                    Tap to Find
                </button>
            )}
        </div>
    );
};

export default RandomChat;
