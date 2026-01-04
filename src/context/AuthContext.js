
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../services/mockBackend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = () => {
            const currentUser = mockApi.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const user = await mockApi.login(email, password);
        setUser(user);
    };

    const logout = async () => {
        await mockApi.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
