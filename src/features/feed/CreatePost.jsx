
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Send } from 'lucide-react';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSubmitting(true);
        await mockApi.createPost(content);
        setSubmitting(false);
        navigate('/');
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '15px' }} />
                <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Create Post</h1>
            </header>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <img
                        src={user?.avatar || 'https://i.pravatar.cc/150'}
                        alt="me"
                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: '#eee' }}
                    />
                    <textarea
                        autoFocus
                        placeholder="What's happening?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '18px',
                            fontFamily: 'inherit',
                            resize: 'none',
                            minHeight: '150px',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        disabled={!content.trim() || submitting}
                        style={{
                            backgroundColor: content.trim() ? 'var(--primary-blue)' : '#ccc',
                            color: 'white',
                            padding: '10px 24px',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: content.trim() ? 'pointer' : 'default'
                        }}
                    >
                        <span>Post</span>
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
