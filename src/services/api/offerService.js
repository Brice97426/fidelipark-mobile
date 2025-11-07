// src/services/api/offerService.js
import api from './authService';

/**
 * Récupérer toutes les offres du commerçant connecté
 */
export const getOffers = async () => {
  try {
    const response = await api.get('/offers');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur récupération offres:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la récupération des offres',
    };
  }
};

/**
 * Récupérer toutes les offres disponibles (pour les clients)
 */
export const getAllAvailableOffers = async () => {
  try {
    const response = await api.get('/offers/available');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur récupération offres disponibles:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la récupération des offres',
    };
  }
};

/**
 * Créer une nouvelle offre
 */
export const createOffer = async (offerData) => {
  try {
    const response = await api.post('/offers', offerData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur création offre:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la création de l\'offre',
      details: error.response?.data?.errors,
    };
  }
};

/**
 * Mettre à jour une offre
 */
export const updateOffer = async (offerId, offerData) => {
  try {
    const response = await api.put(`/offers/${offerId}`, offerData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur mise à jour offre:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la mise à jour de l\'offre',
      details: error.response?.data?.errors,
    };
  }
};

/**
 * Supprimer une offre
 */
export const deleteOffer = async (offerId) => {
  try {
    await api.delete(`/offers/${offerId}`);
    return {
      success: true,
    };
  } catch (error) {
    console.error('Erreur suppression offre:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la suppression de l\'offre',
    };
  }
};

/**
 * Récupérer les offres d'un commerçant spécifique
 */
export const getOffersByMerchant = async (merchantId) => {
  try {
    const response = await api.get(`/offers/merchant/${merchantId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur récupération offres du commerçant:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors de la récupération des offres',
    };
  }
};

/**
 * Activer/Désactiver une offre
 */
export const toggleOffer = async (offerId) => {
  try {
    const response = await api.patch(`/offers/${offerId}/toggle`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Erreur toggle offre:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Erreur lors du changement de statut',
    };
  }
};

export default {
  getOffers,
  getAllAvailableOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getOffersByMerchant,
  toggleOffer,
};