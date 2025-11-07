// src/screens/client/ClientFavoritesScreen.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    Text,
    Surface,
    FAB,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ClientFavoritesScreen = () => {
    const [favorites, setFavorites] = useState([]);

    const renderFavoriteCard = (merchant) => (
        <TouchableOpacity
            key={merchant.id}
            activeOpacity={0.7}
            onPress={() => console.log('Détails:', merchant.name)}
        >
            <Surface style={styles.favoriteCard} elevation={2}>
                <Image
                    source={require('../../assets/images/Ellipse9.png')}
                    style={styles.favoriteImage}
                />

                <View style={styles.favoriteInfo}>
                    <View style={styles.favoriteHeader}>
                        <Text style={styles.favoriteName}>{merchant.name}</Text>
                        <TouchableOpacity
                            onPress={() => console.log('Retirer des favoris:', merchant.id)}
                        >
                            <MaterialCommunityIcons name="heart" size={24} color="#E91E63" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.favoriteLocation}>
                        <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                        <Text style={styles.favoriteAddress}>{merchant.address}</Text>
                    </View>

                    <View style={styles.favoriteStats}>
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="walk" size={16} color="#2CB76E" />
                            <Text style={styles.statText}>{merchant.distance}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="tag" size={16} color="#FF9800" />
                            <Text style={styles.statText}>{merchant.offers} offres</Text>
                        </View>
                    </View>
                </View>
            </Surface>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mes Favoris</Text>
                <Text style={styles.headerSubtitle}>
                    Vos commerces préférés en un clin d'œil
                </Text>
            </View>

            {favorites.length > 0 ? (
                <ScrollView
                    style={styles.favoritesList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.favoritesListContent}
                >
                    {favorites.map(renderFavoriteCard)}
                </ScrollView>
            ) : (
                <View style={styles.emptyState}>
                    <MaterialCommunityIcons
                        name="heart-outline"
                        size={80}
                        color="#CCC"
                    />
                    <Text style={styles.emptyStateTitle}>Aucun favori</Text>
                    <Text style={styles.emptyStateText}>
                        Ajoutez vos commerces préférés pour y accéder rapidement
                    </Text>
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
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
    },
    favoritesList: {
        flex: 1,
    },
    favoritesListContent: {
        padding: 15,
    },
    favoriteCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    favoriteImage: {
        width: 120,
        height: 120,
    },
    favoriteInfo: {
        flex: 1,
        padding: 12,
    },
    favoriteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    favoriteName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    favoriteLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    favoriteAddress: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    favoriteStats: {
        flexDirection: 'row',
        gap: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    statText: {
        fontSize: 12,
        color: '#666',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#999',
        marginTop: 20,
        marginBottom: 10,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#BBB',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default ClientFavoritesScreen;