// src/screens/merchant/MerchantHomeScreen.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    Text,
    Surface,
    FAB,
    Card,
    Button,
    Portal,
    Modal,
    TextInput,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MerchantHomeScreen = ({ navigation }) => {
    const [offers, setOffers] = useState([
        {
            id: 1,
            titre: '-20% sur tout le magasin',
            description: 'Offre valable du 1er au 15 novembre',
            points_requis: 100,
            valeur: 20,
            type: 'pourcentage',
            actif: true,
            date_expiration: '2025-11-15',
        },
        {
            id: 2,
            titre: '5€ de réduction',
            description: 'Sur un achat de 50€ minimum',
            points_requis: 50,
            valeur: 5,
            type: 'montant',
            actif: true,
            date_expiration: '2025-12-31',
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newOffer, setNewOffer] = useState({
        titre: '',
        description: '',
        points_requis: '',
        valeur: '',
        type: 'pourcentage',
    });

    // Statistiques du jour
    const todayStats = {
        scans: 12,
        pointsAttribues: 350,
        couponsValides: 5,
        revenueEstime: 245,
    };

    const handleScanQR = () => {
        Alert.alert(
            'Scanner QR Code',
            'Fonctionnalité de scan à implémenter',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Ouvrir Scanner',
                    onPress: () => console.log('Ouvrir scanner QR')
                },
            ]
        );
    };

    const handleToggleOffer = (offerId) => {
        setOffers(offers.map(offer =>
            offer.id === offerId
                ? { ...offer, actif: !offer.actif }
                : offer
        ));
        Alert.alert('Succès', 'Statut de l\'offre modifié');
    };

    const handleDeleteOffer = (offerId) => {
        Alert.alert(
            'Supprimer l\'offre',
            'Êtes-vous sûr de vouloir supprimer cette offre ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                        setOffers(offers.filter(offer => offer.id !== offerId));
                        Alert.alert('Succès', 'Offre supprimée');
                    },
                },
            ]
        );
    };

    const handleAddOffer = () => {
        if (!newOffer.titre || !newOffer.points_requis || !newOffer.valeur) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
            return;
        }

        const offer = {
            id: Date.now(),
            titre: newOffer.titre,
            description: newOffer.description,
            points_requis: parseInt(newOffer.points_requis),
            valeur: parseFloat(newOffer.valeur),
            type: newOffer.type,
            actif: true,
            date_expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };

        setOffers([...offers, offer]);
        setShowAddModal(false);
        setNewOffer({ titre: '', description: '', points_requis: '', valeur: '', type: 'pourcentage' });
        Alert.alert('Succès', 'Offre ajoutée avec succès');
    };

    const renderOfferCard = (offer) => (
        <Card key={offer.id} style={styles.offerCard}>
            <Card.Content>
                <View style={styles.offerHeader}>
                    <View style={styles.offerTitleContainer}>
                        <MaterialCommunityIcons
                            name="tag"
                            size={24}
                            color={offer.actif ? '#2CB76E' : '#999'}
                        />
                        <Text style={styles.offerTitle}>{offer.titre}</Text>
                    </View>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: offer.actif ? '#E8F5E9' : '#FFEBEE' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: offer.actif ? '#2E7D32' : '#C62828' }
                        ]}>
                            {offer.actif ? 'Actif' : 'Inactif'}
                        </Text>
                    </View>
                </View>

                <Text style={styles.offerDescription}>{offer.description}</Text>

                <View style={styles.offerDetails}>
                    <View style={styles.offerDetailItem}>
                        <MaterialCommunityIcons name="star" size={16} color="#FF9800" />
                        <Text style={styles.offerDetailText}>
                            {offer.points_requis} points
                        </Text>
                    </View>
                    <View style={styles.offerDetailItem}>
                        <MaterialCommunityIcons name="gift" size={16} color="#E91E63" />
                        <Text style={styles.offerDetailText}>
                            {offer.type === 'pourcentage' ? `${offer.valeur}%` : `${offer.valeur}€`}
                        </Text>
                    </View>
                    <View style={styles.offerDetailItem}>
                        <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                        <Text style={styles.offerDetailText}>
                            {new Date(offer.date_expiration).toLocaleDateString('fr-FR')}
                        </Text>
                    </View>
                </View>
            </Card.Content>

            <Card.Actions style={styles.offerActions}>
                <Button
                    mode="outlined"
                    onPress={() => handleToggleOffer(offer.id)}
                    icon={offer.actif ? 'pause' : 'play'}
                    style={styles.actionButton}
                >
                    {offer.actif ? 'Désactiver' : 'Activer'}
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => handleDeleteOffer(offer.id)}
                    icon="delete"
                    textColor="#E53935"
                    style={styles.actionButton}
                >
                    Supprimer
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            {/* Header avec logo et nom commerce */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <MaterialCommunityIcons name="store" size={40} color="#FFF" />
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>Ma Boutique Mode</Text>
                        <Text style={styles.headerSubtitle}>Tableau de bord</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Statistiques du jour */}
                <View style={styles.statsContainer}>
                    <Text style={styles.sectionTitle}>Aujourd'hui</Text>
                    <View style={styles.statsGrid}>
                        <Surface style={styles.statCard} elevation={2}>
                            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#2CB76E" />
                            <Text style={styles.statValue}>{todayStats.scans}</Text>
                            <Text style={styles.statLabel}>Scans QR</Text>
                        </Surface>

                        <Surface style={styles.statCard} elevation={2}>
                            <MaterialCommunityIcons name="star" size={32} color="#FF9800" />
                            <Text style={styles.statValue}>{todayStats.pointsAttribues}</Text>
                            <Text style={styles.statLabel}>Points attribués</Text>
                        </Surface>

                        <Surface style={styles.statCard} elevation={2}>
                            <MaterialCommunityIcons name="ticket-confirmation" size={32} color="#E91E63" />
                            <Text style={styles.statValue}>{todayStats.couponsValides}</Text>
                            <Text style={styles.statLabel}>Coupons validés</Text>
                        </Surface>

                        <Surface style={styles.statCard} elevation={2}>
                            <MaterialCommunityIcons name="currency-eur" size={32} color="#2196F3" />
                            <Text style={styles.statValue}>{todayStats.revenueEstime}€</Text>
                            <Text style={styles.statLabel}>CA estimé</Text>
                        </Surface>
                    </View>
                </View>

                {/* Actions rapides */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.quickActionButton}
                        onPress={handleScanQR}
                    >
                        <MaterialCommunityIcons name="qrcode-scan" size={40} color="#FFF" />
                        <Text style={styles.quickActionText}>Scanner QR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('Stats')}
                    >
                        <MaterialCommunityIcons name="chart-line" size={40} color="#FFF" />
                        <Text style={styles.quickActionText}>Statistiques</Text>
                    </TouchableOpacity>
                </View>

                {/* Liste des offres */}
                <View style={styles.offersSection}>
                    <View style={styles.offersSectionHeader}>
                        <Text style={styles.sectionTitle}>Mes Offres</Text>
                        <Button
                            mode="contained"
                            onPress={() => setShowAddModal(true)}
                            icon="plus"
                            style={styles.addButton}
                        >
                            Ajouter
                        </Button>
                    </View>

                    {offers.length > 0 ? (
                        offers.map(renderOfferCard)
                    ) : (
                        <Surface style={styles.emptyState} elevation={1}>
                            <MaterialCommunityIcons name="tag-off" size={60} color="#CCC" />
                            <Text style={styles.emptyStateText}>Aucune offre créée</Text>
                            <Button
                                mode="contained"
                                onPress={() => setShowAddModal(true)}
                                icon="plus"
                                style={styles.emptyStateButton}
                            >
                                Créer ma première offre
                            </Button>
                        </Surface>
                    )}
                </View>
            </ScrollView>

            {/* Modal d'ajout d'offre */}
            <Portal>
                <Modal
                    visible={showAddModal}
                    onDismiss={() => setShowAddModal(false)}
                    contentContainerStyle={styles.modal}
                >
                    <ScrollView>
                        <Text style={styles.modalTitle}>Nouvelle Offre</Text>

                        <TextInput
                            label="Titre de l'offre *"
                            mode="outlined"
                            value={newOffer.titre}
                            onChangeText={(text) => setNewOffer({ ...newOffer, titre: text })}
                            style={styles.modalInput}
                        />

                        <TextInput
                            label="Description"
                            mode="outlined"
                            value={newOffer.description}
                            onChangeText={(text) => setNewOffer({ ...newOffer, description: text })}
                            multiline
                            numberOfLines={3}
                            style={styles.modalInput}
                        />

                        <View style={styles.modalRow}>
                            <TextInput
                                label="Points requis *"
                                mode="outlined"
                                value={newOffer.points_requis}
                                onChangeText={(text) => setNewOffer({ ...newOffer, points_requis: text })}
                                keyboardType="numeric"
                                style={[styles.modalInput, styles.halfWidth]}
                            />

                            <TextInput
                                label="Valeur *"
                                mode="outlined"
                                value={newOffer.valeur}
                                onChangeText={(text) => setNewOffer({ ...newOffer, valeur: text })}
                                keyboardType="numeric"
                                style={[styles.modalInput, styles.halfWidth]}
                            />
                        </View>

                        <View style={styles.typeSelector}>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    newOffer.type === 'pourcentage' && styles.typeButtonActive
                                ]}
                                onPress={() => setNewOffer({ ...newOffer, type: 'pourcentage' })}
                            >
                                <MaterialCommunityIcons
                                    name="percent"
                                    size={24}
                                    color={newOffer.type === 'pourcentage' ? '#FFF' : '#666'}
                                />
                                <Text style={[
                                    styles.typeButtonText,
                                    newOffer.type === 'pourcentage' && styles.typeButtonTextActive
                                ]}>
                                    Pourcentage
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    newOffer.type === 'montant' && styles.typeButtonActive
                                ]}
                                onPress={() => setNewOffer({ ...newOffer, type: 'montant' })}
                            >
                                <MaterialCommunityIcons
                                    name="currency-eur"
                                    size={24}
                                    color={newOffer.type === 'montant' ? '#FFF' : '#666'}
                                />
                                <Text style={[
                                    styles.typeButtonText,
                                    newOffer.type === 'montant' && styles.typeButtonTextActive
                                ]}>
                                    Montant fixe
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalActions}>
                            <Button
                                mode="outlined"
                                onPress={() => setShowAddModal(false)}
                                style={styles.modalButton}
                            >
                                Annuler
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleAddOffer}
                                style={styles.modalButton}
                            >
                                Créer l'offre
                            </Button>
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>

            {/* FAB Scanner QR */}
            <FAB
                icon="qrcode-scan"
                style={styles.fab}
                onPress={handleScanQR}
                label="Scanner"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#2CB76E',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    statsContainer: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    statCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    quickActions: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    quickActionButton: {
        flex: 1,
        backgroundColor: '#B72C6F',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        gap: 10,
    },
    quickActionText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    offersSection: {
        padding: 15,
    },
    offersSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    addButton: {
        borderRadius: 20,
    },
    offerCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
    },
    offerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    offerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    offerDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    offerDetails: {
        flexDirection: 'row',
        gap: 15,
        flexWrap: 'wrap',
    },
    offerDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    offerDetailText: {
        fontSize: 12,
        color: '#666',
    },
    offerActions: {
        justifyContent: 'flex-end',
        gap: 10,
    },
    actionButton: {
        borderRadius: 20,
    },
    emptyState: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 40,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        marginTop: 15,
        marginBottom: 20,
    },
    emptyStateButton: {
        borderRadius: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#B72C6F',
    },
    modal: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 20,
        borderRadius: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    modalInput: {
        marginBottom: 15,
    },
    modalRow: {
        flexDirection: 'row',
        gap: 10,
    },
    halfWidth: {
        flex: 1,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF',
    },
    typeButtonActive: {
        backgroundColor: '#2CB76E',
        borderColor: '#2CB76E',
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    typeButtonTextActive: {
        color: '#FFF',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        borderRadius: 20,
    },
});

export default MerchantHomeScreen;