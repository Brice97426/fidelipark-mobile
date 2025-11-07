// src/screens/merchant/MerchantProfileScreen.js
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
    Avatar,
    List,
    Divider,
    Button,
    Portal,
    Modal,
    TextInput,
    HelperText,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { logout } from '../../services/api/authService';

// Schéma de validation
const profileSchema = Yup.object().shape({
    nom_magasin: Yup.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .required('Nom du commerce requis'),
    adresse: Yup.string()
        .min(5, 'Adresse invalide')
        .required('Adresse requise'),
    nb_tel: Yup.string()
        .matches(/^[0-9]{10}$/, 'Numéro de téléphone invalide (10 chiffres)')
        .nullable(),
    horaires: Yup.string().nullable(),
});

const MerchantProfileScreen = ({ navigation }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);

    // TODO: Récupérer les données commerçant depuis le contexte
    const merchant = {
        id: 1,
        nom_magasin: 'Boutique Mode & Style',
        email: 'contact@boutique-mode.re',
        adresse: '15 Rue du Commerce, Saint-Pierre',
        nb_tel: '0262123456',
        horaires: 'Lun-Sam: 9h-19h',
        totalScans: 127,
        totalClients: 89,
        totalOffres: 3,
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
                        await logout(); // ✅ Déconnexion via le contexte
                        // La redirection vers login sera automatique via App.js
                    },
                },
            ]
        );
    };

    const handleSaveProfile = (values) => {
        console.log('Mise à jour profil:', values);
        // TODO: Envoyer à l'API
        Alert.alert('Succès', 'Profil mis à jour');
        setEditModalVisible(false);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header avec avatar */}
            <View style={styles.header}>
                <Avatar.Text
                    size={80}
                    label={merchant.nom_magasin.substring(0, 2).toUpperCase()}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                />
                <Text style={styles.merchantName}>{merchant.nom_magasin}</Text>
                <Text style={styles.merchantEmail}>{merchant.email}</Text>

                {/* Statistiques rapides */}
                <View style={styles.statsRow}>
                    <Surface style={styles.miniStatCard} elevation={2}>
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#2196F3" />
                        <Text style={styles.miniStatValue}>{merchant.totalScans}</Text>
                        <Text style={styles.miniStatLabel}>Scans</Text>
                    </Surface>

                    <Surface style={styles.miniStatCard} elevation={2}>
                        <MaterialCommunityIcons name="account-group" size={24} color="#9C27B0" />
                        <Text style={styles.miniStatValue}>{merchant.totalClients}</Text>
                        <Text style={styles.miniStatLabel}>Clients</Text>
                    </Surface>

                    <Surface style={styles.miniStatCard} elevation={2}>
                        <MaterialCommunityIcons name="tag-multiple" size={24} color="#4CAF50" />
                        <Text style={styles.miniStatValue}>{merchant.totalOffres}</Text>
                        <Text style={styles.miniStatLabel}>Offres</Text>
                    </Surface>
                </View>
            </View>

            {/* Informations du commerce */}
            <View style={styles.sections}>
                <Surface style={styles.section} elevation={1}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Informations du commerce</Text>
                        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                            <MaterialCommunityIcons name="pencil" size={24} color="#2CB76E" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="store" size={20} color="#666" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Nom du commerce</Text>
                            <Text style={styles.infoValue}>{merchant.nom_magasin}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Adresse</Text>
                            <Text style={styles.infoValue}>{merchant.adresse}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="phone" size={20} color="#666" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Téléphone</Text>
                            <Text style={styles.infoValue}>{merchant.nb_tel}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Horaires</Text>
                            <Text style={styles.infoValue}>{merchant.horaires}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="email" size={20} color="#666" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{merchant.email}</Text>
                        </View>
                    </View>
                </Surface>

                {/* Gestion */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Gestion</Text>

                    <List.Item
                        title="Mes offres"
                        description="Gérer mes bons de réduction"
                        left={(props) => <List.Icon {...props} icon="tag-multiple" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Retour à l\'écran Offres')}
                    />
                    <Divider />

                    <List.Item
                        title="Historique des scans"
                        description="Voir toutes les transactions"
                        left={(props) => <List.Icon {...props} icon="history" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Mes clients"
                        description="Liste des clients fidèles"
                        left={(props) => <List.Icon {...props} icon="account-group" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                </Surface>

                {/* Paramètres */}
                <Surface style={styles.section} elevation={1}>
                    <Text style={styles.sectionTitle}>Paramètres</Text>

                    <List.Item
                        title="Sécurité"
                        description="Mot de passe, authentification"
                        left={(props) => <List.Icon {...props} icon="shield-lock" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Info', 'Page à implémenter')}
                    />
                    <Divider />

                    <List.Item
                        title="Notifications"
                        description="Gérer les alertes"
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
                        description="Support commerçants"
                        left={(props) => <List.Icon {...props} icon="email" />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Contact', 'support-merchants@fidelipark.re')}
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

            {/* Modal d'édition */}
            <Portal>
                <Modal
                    visible={editModalVisible}
                    onDismiss={() => setEditModalVisible(false)}
                    contentContainerStyle={styles.modal}
                >
                    <ScrollView>
                        <Text style={styles.modalTitle}>Modifier les informations</Text>

                        <Formik
                            initialValues={{
                                nom_magasin: merchant.nom_magasin,
                                adresse: merchant.adresse,
                                nb_tel: merchant.nb_tel,
                                horaires: merchant.horaires,
                            }}
                            validationSchema={profileSchema}
                            onSubmit={handleSaveProfile}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                            }) => (
                                <View>
                                    <TextInput
                                        label="Nom du commerce *"
                                        mode="outlined"
                                        value={values.nom_magasin}
                                        onChangeText={handleChange('nom_magasin')}
                                        onBlur={handleBlur('nom_magasin')}
                                        error={touched.nom_magasin && errors.nom_magasin}
                                        style={styles.input}
                                        left={<TextInput.Icon icon="store" />}
                                    />
                                    {touched.nom_magasin && errors.nom_magasin && (
                                        <HelperText type="error" visible={true}>
                                            {errors.nom_magasin}
                                        </HelperText>
                                    )}

                                    <TextInput
                                        label="Adresse *"
                                        mode="outlined"
                                        value={values.adresse}
                                        onChangeText={handleChange('adresse')}
                                        onBlur={handleBlur('adresse')}
                                        error={touched.adresse && errors.adresse}
                                        style={styles.input}
                                        left={<TextInput.Icon icon="map-marker" />}
                                    />
                                    {touched.adresse && errors.adresse && (
                                        <HelperText type="error" visible={true}>
                                            {errors.adresse}
                                        </HelperText>
                                    )}

                                    <TextInput
                                        label="Téléphone"
                                        mode="outlined"
                                        value={values.nb_tel}
                                        onChangeText={handleChange('nb_tel')}
                                        onBlur={handleBlur('nb_tel')}
                                        error={touched.nb_tel && errors.nb_tel}
                                        style={styles.input}
                                        left={<TextInput.Icon icon="phone" />}
                                        keyboardType="phone-pad"
                                    />
                                    {touched.nb_tel && errors.nb_tel && (
                                        <HelperText type="error" visible={true}>
                                            {errors.nb_tel}
                                        </HelperText>
                                    )}

                                    <TextInput
                                        label="Horaires"
                                        mode="outlined"
                                        value={values.horaires}
                                        onChangeText={handleChange('horaires')}
                                        onBlur={handleBlur('horaires')}
                                        style={styles.input}
                                        left={<TextInput.Icon icon="clock-outline" />}
                                        placeholder="Lun-Sam: 9h-19h"
                                    />

                                    <View style={styles.modalActions}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => setEditModalVisible(false)}
                                            style={styles.modalButton}
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            mode="contained"
                                            onPress={handleSubmit}
                                            style={styles.modalButton}
                                        >
                                            Enregistrer
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>
                </Modal>
            </Portal>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2CB76E',
    },
    merchantName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
        textAlign: 'center',
    },
    merchantEmail: {
        fontSize: 14,
        color: '#FFF',
        opacity: 0.9,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        gap: 10,
    },
    miniStatCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
    },
    miniStatValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    miniStatLabel: {
        fontSize: 11,
        color: '#666',
        marginTop: 4,
    },
    sections: {
        padding: 15,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        gap: 15,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
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
    modal: {
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    modalButton: {
        flex: 1,
    },
});

export default MerchantProfileScreen;