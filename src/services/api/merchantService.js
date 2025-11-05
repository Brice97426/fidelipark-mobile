// src/services/api/merchantService.js
import api from './authService';

/**
 * Récupérer tous les commerçants
 */
export const getMerchants = async () => {
    try {
        const response = await api.get('/merchants');
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur récupération commerçants:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de la récupération des commerçants',
        };
    }
};

/**
 * Récupérer un commerçant par ID
 */
export const getMerchantById = async (merchantId) => {
    try {
        const response = await api.get(`/merchants/${merchantId}`);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur récupération commerçant:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de la récupération du commerçant',
        };
    }
};

/**
 * Mettre à jour le profil du commerçant
 */
export const updateMerchantProfile = async (merchantId, data) => {
    try {
        const response = await api.put(`/merchants/${merchantId}`, data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Erreur mise à jour commerçant:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Erreur lors de la mise à jour',
        };
    }
};

export default {
    getMerchants,
    getMerchantById,
    updateMerchantProfile,
};