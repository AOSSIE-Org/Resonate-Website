

import React, { useEffect, useState } from 'react';
import { mockApi } from '../services/mockBackend';
import LiveBar from '../features/audio/LiveBar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            const data = await mockApi.getPosts();
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
    }, []);

    if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <LiveBar />

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-blue)' }}>Feed</h1>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {posts.map(post => (
                    <div key={post.id} style={{ backgroundColor: 'var(--bg-white)', padding: '16px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                            <img src={post.user.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12, backgroundColor: '#ddd' }} />
                            <div>
                                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.user.name}</h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(post.timestamp).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '15px', lineHeight: '1.5', color: 'var(--text-primary)', marginBottom: '12px' }}>{post.content}</p>
                        <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                            <span>❤️ {post.likes}</span>
                            <span>💬 Comment</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
