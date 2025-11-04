// src/services/api/authService.js - Service d'authentification mobile
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Configuration de l'URL de l'API
const API_URL = process.env.API_URL || 'http://192.168.50.207:3000/api';

// Instance axios configurée
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Erreur récupération token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expiré ou invalide, déconnecter l'utilisateur
            await logout();
            // Rediriger vers l'écran de connexion
            // Navigation sera gérée dans le composant qui appelle l'API
        }
        return Promise.reject(error);
    }
);

// ==========================================
// FONCTIONS D'AUTHENTIFICATION
// ==========================================

/**
 * Inscription d'un client
 */
export const registerClient = async (userData) => {
    try {
        const response = await api.post('/auth/register/client', {
            nom: userData.nom,
            prenom: userData.prenom,
            email: userData.email,
            password: userData.password,
            nb_tel: userData.nb_tel,
        });

        // Sauvegarder le token et les infos utilisateur
        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('userData', JSON.stringify(response.data.user));

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur inscription client:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de l\'inscription',
            details: error.response?.data?.errors,
        };
    }
};

/**
 * Inscription d'un commerçant
 */
export const registerMerchant = async (userData) => {
    try {
        const response = await api.post('/auth/register/merchant', {
            nom_magasin: userData.nomCommerce,
            email: userData.email,
            password: userData.password,
            adresse: userData.adresseCommerce,
            nb_tel: userData.nb_tel,
        });

        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('userData', JSON.stringify(response.data.user));

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur inscription commerçant:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de l\'inscription',
            details: error.response?.data?.errors,
        };
    }
};

/**
 * Connexion
 */
export const login = async (email, password, userType = 'CLIENT') => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
            userType,
        });

        // Sauvegarder le token et les infos utilisateur
        await SecureStore.setItemAsync('userToken', response.data.token);
        await SecureStore.setItemAsync('userData', JSON.stringify(response.data.user));

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur connexion:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de la connexion',
        };
    }
};

/**
 * Déconnexion
 */
export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        console.error('Erreur déconnexion:', error);
    } finally {
        // Supprimer les données locales
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
    }
};

/**
 * Vérifier si l'utilisateur est connecté
 */
export const isAuthenticated = async () => {
    try {
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) return false;

        const response = await api.get('/auth/verify');
        return response.data.valid;
    } catch (error) {
        console.error('Erreur vérification token:', error);
        return false;
    }
};

/**
 * Récupérer les données utilisateur stockées localement
 */
export const getUserData = async () => {
    try {
        const userDataString = await SecureStore.getItemAsync('userData');
        if (userDataString) {
            return JSON.parse(userDataString);
        }
        return null;
    } catch (error) {
        console.error('Erreur récupération userData:', error);
        return null;
    }
};

/**
 * Récupérer le token JWT
 */
export const getToken = async () => {
    try {
        return await SecureStore.getItemAsync('userToken');
    } catch (error) {
        console.error('Erreur récupération token:', error);
        return null;
    }
};

// Exporter l'instance axios pour d'autres services
export default api;