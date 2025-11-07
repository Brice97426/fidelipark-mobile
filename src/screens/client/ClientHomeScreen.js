// src/screens/client/ClientHomeScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import {
    Text,
    Surface,
    Searchbar,
    Chip,
    ActivityIndicator,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { getMerchants } from '../../services/api/merchantService';

const ClientHomeScreen = () => {
    const [viewMode, setViewMode] = useState('list');
    const [merchants, setMerchants] = useState([]);
    const [filteredMerchants, setFilteredMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: -21.3392,
        longitude: 55.4780,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    useEffect(() => {
        loadMerchants();
    }, []);

    const loadMerchants = async () => {
        setLoading(true);
        try {
            const result = await getMerchants();
            if (result.success) {
                setMerchants(result.data);
                setFilteredMerchants(result.data);
            } else {
                Alert.alert('Erreur', 'Impossible de charger les commerçants');
            }
        } catch (error) {
            console.error('Erreur chargement commerçants:', error);
            Alert.alert('Erreur', 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredMerchants(merchants);
        } else {
            const filtered = merchants.filter((merchant) =>
                merchant.nom_magasin.toLowerCase().includes(query.toLowerCase()) ||
                merchant.adresse.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMerchants(filtered);
        }
    };

    const renderMerchantCard = (merchant) => (
        <TouchableOpacity
            key={merchant.id_commercant}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Info', `Voir détails de ${merchant.nom_magasin}`)}
        >
            <Surface style={styles.merchantCard} elevation={2}>
                <View style={styles.merchantImageContainer}>
                    <Image
                        source={require('../../assets/images/Ellipse9.png')}
                        style={styles.merchantImage}
                    />
                    <TouchableOpacity style={styles.favoriteButton}>
                        <MaterialCommunityIcons name="heart-outline" size={24} color="#B72C6F" />
                    </TouchableOpacity>
                </View>

                <View style={styles.merchantInfo}>
                    <Text style={styles.merchantName}>{merchant.nom_magasin}</Text>
                    <View style={styles.merchantDetails}>
                        <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                        <Text style={styles.merchantAddress} numberOfLines={1}>
                            {merchant.adresse}
                        </Text>
                    </View>

                    <View style={styles.merchantMeta}>
                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons name="walk" size={16} color="#2CB76E" />
                            <Text style={styles.metaText}>750 m</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons name="clock-outline" size={16} color="#2CB76E" />
                            <Text style={styles.metaText}>
                                {merchant.horaires || '8h-12h, 13h-18h'}
                            </Text>
                        </View>
                    </View>

                    {merchant.has_offers && (
                        <View style={styles.badges}>
                            <Chip
                                icon="tag"
                                style={styles.offerBadge}
                                textStyle={styles.offerBadgeText}
                                compact
                            >
                                Offres disponibles
                            </Chip>
                        </View>
                    )}
                </View>
            </Surface>
        </TouchableOpacity>
    );

    const renderMapView = () => (
        <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
            showsUserLocation
            showsMyLocationButton
        >
            {filteredMerchants.map((merchant) => (
                <Marker
                    key={merchant.id_commercant}
                    coordinate={{
                        latitude: merchant.latitude || -21.3392,
                        longitude: merchant.longitude || 55.4780,
                    }}
                    title={merchant.nom_magasin}
                    description={merchant.adresse}
                    pinColor="#B72C6F"
                />
            ))}
        </MapView>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2CB76E" />
                <Text style={styles.loadingText}>Chargement des commerces...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/Ellipse9.png')}
                    style={styles.logo}
                />
                <Text style={styles.headerTitle}>FidéliPark</Text>
            </View>

            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Rechercher un commerce..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                    iconColor="#2CB76E"
                />
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialCommunityIcons name="filter-variant" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.viewToggle}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'list' && styles.toggleButtonActive,
                    ]}
                    onPress={() => setViewMode('list')}
                >
                    <MaterialCommunityIcons
                        name="format-list-bulleted"
                        size={20}
                        color={viewMode === 'list' ? '#FFF' : '#666'}
                    />
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === 'list' && styles.toggleTextActive,
                        ]}
                    >
                        Listes commerces
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'map' && styles.toggleButtonActive,
                    ]}
                    onPress={() => setViewMode('map')}
                >
                    <MaterialCommunityIcons
                        name="map"
                        size={20}
                        color={viewMode === 'map' ? '#FFF' : '#666'}
                    />
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === 'map' && styles.toggleTextActive,
                        ]}
                    >
                        Voir sur la carte
                    </Text>
                </TouchableOpacity>
            </View>

            {viewMode === 'list' ? (
                <ScrollView
                    style={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredMerchants.length > 0 ? (
                        filteredMerchants.map(renderMerchantCard)
                    ) : (
                        <View style={styles.emptyState}>
                            <MaterialCommunityIcons
                                name="store-alert-outline"
                                size={64}
                                color="#CCC"
                            />
                            <Text style={styles.emptyStateText}>Aucun commerce trouvé</Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.mapContainer}>
                    {renderMapView()}
                    {filteredMerchants.length > 0 && (
                        <View style={styles.mapCardContainer}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={320}
                                decelerationRate="fast"
                            >
                                {filteredMerchants.map((merchant) => (
                                    <Surface
                                        key={merchant.id_commercant}
                                        style={styles.mapCard}
                                        elevation={4}
                                    >
                                        <Image
                                            source={require('../../assets/images/Ellipse9.png')}
                                            style={styles.mapCardImage}
                                        />
                                        <View style={styles.mapCardInfo}>
                                            <Text style={styles.mapCardName} numberOfLines={1}>
                                                {merchant.nom_magasin}
                                            </Text>
                                            <Text style={styles.mapCardAddress} numberOfLines={1}>
                                                {merchant.adresse}
                                            </Text>
                                        </View>
                                    </Surface>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            )}
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2CB76E',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    logo: {
        width: 50,
        height: 30,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Iceland',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFF',
        gap: 10,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    filterButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#B72C6F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewToggle: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingBottom: 15,
        gap: 10,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        gap: 8,
    },
    toggleButtonActive: {
        backgroundColor: '#B72C6F',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    toggleTextActive: {
        color: '#FFF',
    },
    listContainer: {
        flex: 1,
        padding: 15,
    },
    merchantCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    merchantImageContainer: {
        position: 'relative',
        height: 150,
    },
    merchantImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    merchantInfo: {
        padding: 15,
    },
    merchantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    merchantDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    merchantAddress: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    merchantMeta: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 10,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    offerBadge: {
        backgroundColor: '#FFE5F0',
        borderColor: '#B72C6F',
    },
    offerBadgeText: {
        color: '#B72C6F',
        fontSize: 11,
        fontWeight: '600',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    mapCardContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
    },
    mapCard: {
        flexDirection: 'row',
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    mapCardImage: {
        width: 100,
        height: 100,
    },
    mapCardInfo: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    mapCardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    mapCardAddress: {
        fontSize: 12,
        color: '#666',
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
});

export default ClientHomeScreen;