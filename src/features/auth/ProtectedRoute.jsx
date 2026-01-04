
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--primary-blue)' }}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;
