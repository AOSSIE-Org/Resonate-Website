
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockBackend';
import { MapPin, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadUserPosts = async () => {
            const allPosts = await mockApi.getPosts();
            // Filter mock posts for current user (simulated)
            const myPosts = allPosts.filter(p => p.userId === user?.id || p.userId === 'current-user');
            setPosts(myPosts);
        };
        if (user) loadUserPosts();
    }, [user]);

    if (!user) return null;

    return (
        <div>
            {/* Header / Cover */}
            <div style={{ height: '150px', backgroundColor: 'var(--primary-blue)', position: 'relative' }}>
                <button
                    onClick={logout}
                    style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.2)', padding: 8, borderRadius: '50%', color: 'white' }}
                >
                    <LogOut size={20} />
                </button>
            </div>

            <div style={{ padding: '0 20px', position: 'relative', top: '-50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                    <img
                        src={user.avatar}
                        alt="profile"
                        style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid white', backgroundColor: '#fff' }}
                    />
                    <button style={{
                        border: '1px solid var(--text-secondary)',
                        backgroundColor: 'white',
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginBottom: '10px'
                    }}>
                        Edit Profile
                    </button>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{user.name}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>@{user.email.split('@')[0]}</p>

                <p style={{ marginBottom: '15px', lineHeight: '1.5' }}>
                    Digital enthusiast. creating the future of social networking. 🚀
                </p>

                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '25px' }}>
                    <span style={{ display: 'flex', items: 'center', gap: 4 }}><MapPin size={16} /> San Francisco, CA</span>
                    <span style={{ display: 'flex', items: 'center', gap: 4 }}><Calendar size={16} /> API Joined September 2025</span>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <span>542 <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>Following</span></span>
                    <span>1,204 <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>Followers</span></span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Posts</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {posts.map(post => (
                        <div key={post.id} style={{ backgroundColor: 'var(--bg-white)', padding: '16px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid #eee' }}>
                            <p style={{ fontSize: '15px', lineHeight: '1.5', color: 'var(--text-primary)', marginBottom: '12px' }}>{post.content}</p>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                    ))}
                    {posts.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No posts yet.</p>}
                </div>

            </div>
        </div>
    );
};

export default Profile;
