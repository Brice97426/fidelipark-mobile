// src/contexts/AuthContext.js - Contexte d'authentification global
import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, getUserData, logout as logoutService } from '../services/api/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérifier l'authentification au démarrage
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const isAuth = await isAuthenticated();
            if (isAuth) {
                const userData = await getUserData();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Erreur vérification auth:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await logoutService();
            setUser(null);
        } catch (error) {
            console.error('Erreur déconnexion:', error);
        }
    };

    const updateUser = (newUserData) => {
        setUser({ ...user, ...newUserData });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateUser,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export default AuthContext;