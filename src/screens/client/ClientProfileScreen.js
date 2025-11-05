// src/screens/client/ClientProfileScreen.js
import React from 'react';
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
    Avatar,
    List,
    Divider,
    Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logout } from '../../services/api/authService';

const ClientProfileScreen = ({ navigation }) => {
    // TODO: Récupérer les données utilisateur depuis le contexte
    const user = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@email.com',
        points: 500,
        nb_tel: '0692123456',
    };

    const handleLogout = () => {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Déconnexion',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        // TODO: Navigation vers l'écran de connexion
                        Alert.alert('Info', 'Navigation vers connexion à implémenter');
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header avec avatar */}
            <View style={styles.header}>
                <Avatar.Text
                    size={80}
                    label={`${user.prenom[0]}${user.nom[0]}`}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                />
                <Text style={styles.userName}>
                    {user.prenom} {user.nom}
                </Text>
                <Text style={styles.userEmail}>{user.email}</Text>

                {/* Points */}
                <Surface style={styles.pointsCard} elevation={2}>
                    <MaterialCommunityIcons name="star-circle" size={40} color="#FFC107" />
                    <View style={styles.pointsInfo}>
                        <Text style={styles.pointsValue}>{user.points}</Text>
                        <Text style={styles.pointsLabel}>points fidélité</Text>
                    </View>
                </Surface>
            </View>

            {/* Sections */}
            <View style={styles.sections}>
                {/* Compte */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Mon Compte</Text>

                    <List.Item
                        title="Informations personnelles"
                        description="Nom, prénom, téléphone"
                        left={(props) => <List.Icon {...props} icon="account" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Mes véhicules"
                        description="Gérer mes plaques d'immatriculation"
                        left={(props) => <List.Icon {...props} icon="car" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Sécurité"
                        description="Mot de passe, authentification"
                        left={(props) => <List.Icon {...props} icon="shield-lock" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                </Surface>

                {/* Fidélité */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Fidélité</Text>

                    <List.Item
                        title="Historique des points"
                        description="Voir mes transactions"
                        left={(props) => <List.Icon {...props} icon="history" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Mes bons utilisés"
                        description="Historique des réductions"
                        left={(props) => <List.Icon {...props} icon="ticket-confirmation" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                </Surface>

                {/* Paramètres */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Paramètres</Text>

                    <List.Item
                        title="Notifications"
                        description="Gérer les alertes et rappels"
                        left={(props) => <List.Icon {...props} icon="bell" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Confidentialité"
                        description="Politique RGPD, données"
                        left={(props) => <List.Icon {...props} icon="shield-account" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="À propos"
                        description="Version, mentions légales"
                        left={(props) => <List.Icon {...props} icon="information" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('FidéliPark', 'Version 1.0.0\n\n© 2025 BUT RT3')}
                    />
                </Surface>

                {/* Support */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Support</Text>

                    <List.Item
                        title="Aide & FAQ"
                        description="Questions fréquentes"
                        left={(props) => <List.Icon {...props} icon="help-circle" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Nous contacter"
                        description="Support client"
                        left={(props) => <List.Icon {...props} icon="email" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Contact', 'support@fidelipark.re')}
                    />
                </Surface>

                {/* Bouton de déconnexion */}
                <Button
                    mode="contained"
                    onPress={handleLogout}
                    icon="logout"
                    style={styles.logoutButton}
                    buttonColor="#E53935"
                >
                    Se déconnecter
                </Button>

                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </ScrollView>
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
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#FFF',
        marginBottom: 15,
    },
    avatarLabel: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2CB76E',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
        marginBottom: 20,
    },
    pointsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        width: '100%',
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
    sections: {
        padding: 15,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        padding: 15,
        paddingBottom: 10,
    },
    logoutButton: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        color: '#999',
        marginBottom: 30,
    },
});

export default ClientProfileScreen;