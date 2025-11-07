// src/screens/client/ClientOffersScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import {
    Text,
    Surface,
    Chip,
    ActivityIndicator,
    Modal,
    Portal,
    Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { getAllAvailableOffers } from '../../services/api/offerService';

const ClientOffersScreen = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const userPoints = 500; // TODO: Récupérer depuis le contexte utilisateur

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        setLoading(true);
        try {
            const result = await getAllAvailableOffers();
            if (result.success) {
                setOffers(result.data);
            } else {
                Alert.alert('Erreur', 'Impossible de charger les offres');
            }
        } catch (error) {
            console.error('Erreur chargement offres:', error);
            Alert.alert('Erreur', 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const handleUseOffer = (offer) => {
        if (userPoints < offer.points_requis) {
            Alert.alert(
                'Points insuffisants',
                `Vous avez ${userPoints} points, il en faut ${offer.points_requis} pour cette offre.`
            );
            return;
        }

        setSelectedOffer(offer);
        setModalVisible(true);
    };

    const renderOfferCard = (offer) => {
        const canUse = userPoints >= offer.points_requis;

        return (
            <TouchableOpacity
                key={offer.id_bon}
                activeOpacity={0.7}
                onPress={() => handleUseOffer(offer)}
                disabled={!canUse}
            >
                <Surface style={[styles.offerCard, !canUse && styles.offerCardDisabled]} elevation={2}>
                    <View style={styles.merchantBadge}>
                        <Image
                            source={require('../../assets/images/store-placeholder.png')}
                            style={styles.merchantLogo}
                        />
                        <Text style={styles.merchantName} numberOfLines={1}>
                            {offer.nom_magasin}
                        </Text>
                    </View>

                    <View style={styles.offerValue}>
                        {offer.type_valeur === 'montant' ? (
                            <>
                                <Text style={styles.offerValueNumber}>{offer.valeur} €</Text>
                                <Text style={styles.offerValueLabel}>de réduction</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.offerValueNumber}>{offer.valeur} %</Text>
                                <Text style={styles.offerValueLabel}>de réduction</Text>
                            </>
                        )}
                    </View>

                    <Text style={styles.offerDescription} numberOfLines={2}>
                        {offer.description}
                    </Text>

                    <View style={styles.offerLocation}>
                        <MaterialCommunityIcons name="map-marker" size={14} color="#666" />
                        <Text style={styles.offerAddress} numberOfLines={1}>
                            {offer.adresse}
                        </Text>
                    </View>

                    <View style={styles.offerFooter}>
                        <View style={styles.pointsRequired}>
                            <MaterialCommunityIcons
                                name="star"
                                size={16}
                                color={canUse ? '#FFC107' : '#CCC'}
                            />
                            <Text style={[styles.pointsText, !canUse && styles.pointsTextDisabled]}>
                                {offer.points_requis} pts
                            </Text>
                        </View>

                        <Text style={styles.expiryText}>
                            Expire le {new Date(offer.date_expiration).toLocaleDateString()}
                        </Text>
                    </View>

                    {!canUse && (
                        <Chip
                            icon="lock"
                            style={styles.lockedChip}
                            textStyle={styles.lockedText}
                            compact
                        >
                            Points insuffisants
                        </Chip>
                    )}
                </Surface>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2CB76E" />
                <Text style={styles.loadingText}>Chargement des offres...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bons de Réduction</Text>
                <Surface style={styles.pointsCard} elevation={1}>
                    <MaterialCommunityIcons name="star-circle" size={32} color="#FFC107" />
                    <View style={styles.pointsInfo}>
                        <Text style={styles.pointsValue}>{userPoints}</Text>
                        <Text style={styles.pointsLabel}>points disponibles</Text>
                    </View>
                </Surface>
            </View>

            <ScrollView
                style={styles.offersList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.offersListContent}
            >
                {offers.length > 0 ? (
                    offers.map(renderOfferCard)
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons
                            name="ticket-percent-outline"
                            size={64}
                            color="#CCC"
                        />
                        <Text style={styles.emptyStateText}>Aucune offre disponible</Text>
                    </View>
                )}
            </ScrollView>

            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    contentContainerStyle={styles.modal}
                >
                    {selectedOffer && (
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Votre Bon de Réduction</Text>

                            <View style={styles.modalOfferInfo}>
                                <Text style={styles.modalMerchant}>{selectedOffer.nom_magasin}</Text>
                                {selectedOffer.type_valeur === 'montant' ? (
                                    <Text style={styles.modalValue}>{selectedOffer.valeur} € de réduction</Text>
                                ) : (
                                    <Text style={styles.modalValue}>{selectedOffer.valeur}% de réduction</Text>
                                )}
                                <Text style={styles.modalDescription}>{selectedOffer.description}</Text>
                            </View>

                            <View style={styles.qrContainer}>
                                <QRCode
                                    value={JSON.stringify({
                                        offerId: selectedOffer.id_bon,
                                        userId: 1, // TODO: Remplacer par l'ID utilisateur réel
                                        timestamp: Date.now(),
                                    })}
                                    size={200}
                                    backgroundColor="white"
                                    color="black"
                                />
                            </View>

                            <Text style={styles.qrInstructions}>
                                Présentez ce QR code au commerçant pour utiliser votre bon
                            </Text>

                            <Button
                                mode="contained"
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                                buttonColor="#B72C6F"
                            >
                                Fermer
                            </Button>
                        </View>
                    )}
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    header: {
        backgroundColor: '#2CB76E',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 15,
    },
    pointsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        gap: 15,
    },
    pointsInfo: {
        flex: 1,
    },
    pointsValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    pointsLabel: {
        fontSize: 14,
        color: '#666',
    },
    offersList: {
        flex: 1,
    },
    offersListContent: {
        padding: 15,
    },
    offerCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    offerCardDisabled: {
        opacity: 0.6,
    },
    merchantBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    merchantLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    merchantName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    offerValue: {
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 15,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
    },
    offerValueNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#B72C6F',
    },
    offerValueLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: -5,
    },
    offerDescription: {
        fontSize: 14,
        color: '#333',
        marginBottom: 12,
        lineHeight: 20,
    },
    offerLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 12,
    },
    offerAddress: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    offerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    pointsRequired: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    pointsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    pointsTextDisabled: {
        color: '#CCC',
    },
    expiryText: {
        fontSize: 11,
        color: '#999',
    },
    lockedChip: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#FFEBEE',
    },
    lockedText: {
        fontSize: 11,
        color: '#E53935',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
    modal: {
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 20,
        padding: 25,
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    modalOfferInfo: {
        alignItems: 'center',
        marginBottom: 25,
    },
    modalMerchant: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    modalValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#B72C6F',
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    qrContainer: {
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#F0F0F0',
    },
    qrInstructions: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        lineHeight: 18,
    },
    closeButton: {
        width: '100%',
        borderRadius: 10,
    },
});

export default ClientOffersScreen;