
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                // Mock signup just logs in for now
                await login(email, password);
            }
            navigate('/');
        } catch (err) {
            setError('Failed to login. Try any email/password.');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: 'var(--primary-blue)', fontSize: '32px', marginBottom: '10px' }}>Vconnect</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome to the social network.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                <button type="submit" className="btn-primary">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--primary-blue)', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
