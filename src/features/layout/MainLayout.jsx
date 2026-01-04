
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusSquare, User, Search, Radio } from 'lucide-react';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="container" style={{ paddingBottom: '70px' }}>
            <Outlet />

            {/* Bottom Navigation */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'var(--bg-white)',
                borderTop: '1px solid #E0E0E0',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '12px 0',
                zIndex: 100
            }}>
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer', color: isActive('/') ? 'var(--primary-blue)' : 'var(--text-secondary)' }}>
                    <Home size={28} strokeWidth={isActive('/') ? 3 : 2} />
                </div>

                <div onClick={() => navigate('/explore')} style={{ cursor: 'pointer', color: isActive('/explore') ? 'var(--primary-blue)' : 'var(--text-secondary)' }}>
                    <Search size={28} strokeWidth={isActive('/explore') ? 3 : 2} />
                </div>
                <div onClick={() => navigate('/connect')} style={{ cursor: 'pointer', color: isActive('/connect') ? 'var(--primary-blue)' : 'var(--text-secondary)' }}>
                    <Radio size={28} strokeWidth={isActive('/connect') ? 3 : 2} />
                </div>
                <div onClick={() => navigate('/create')} style={{ cursor: 'pointer', color: 'var(--accent-yellow)' }}>
                    <PlusSquare size={32} fill="var(--accent-yellow)" color="white" />
                </div>
                <div onClick={() => navigate('/profile')} style={{ cursor: 'pointer', color: isActive('/profile') ? 'var(--primary-blue)' : 'var(--text-secondary)' }}>
                    <User size={28} strokeWidth={isActive('/profile') ? 3 : 2} />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
