// src/screens/merchant/MerchantStatsScreen.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    RefreshControl,
} from 'react-native';
import {
    Text,
    Surface,
    SegmentedButtons,
    Card,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MerchantStatsScreen = () => {
    const [period, setPeriod] = useState('week');
    const [refreshing, setRefreshing] = useState(false);

    // Données mockées (à remplacer par des vraies données API)
    const stats = {
        totalScans: 127,
        totalPoints: 2450,
        activeOffers: 3,
        totalClients: 89,
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // TODO: Récupérer les stats depuis l'API
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    // Données pour le graphique de scans
    const scansData = {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
            {
                data: [12, 19, 15, 25, 22, 30, 28],
                color: (opacity = 1) => `rgba(44, 183, 110, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    // Données pour le graphique des points
    const pointsData = {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
            {
                data: [200, 350, 280, 450, 380, 520, 490],
            },
        ],
    };

    // Données pour les offres populaires
    const offersData = [
        {
            name: '10% réduction',
            population: 45,
            color: '#FF6384',
            legendFontColor: '#333',
            legendFontSize: 12,
        },
        {
            name: '5€ offerts',
            population: 30,
            color: '#36A2EB',
            legendFontColor: '#333',
            legendFontSize: 12,
        },
        {
            name: '15% vêtements',
            population: 25,
            color: '#FFCE56',
            legendFontColor: '#333',
            legendFontSize: 12,
        },
    ];

    const chartConfig = {
        backgroundColor: '#FFF',
        backgroundGradientFrom: '#FFF',
        backgroundGradientTo: '#FFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(44, 183, 110, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#2CB76E',
        },
    };

    const renderStatCard = (icon, label, value, color) => (
        <Surface style={styles.statCard} elevation={2}>
            <View style={[styles.statIcon, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={28} color="#FFF" />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </Surface>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Statistiques</Text>
                <Text style={styles.headerSubtitle}>
                    Analysez vos performances
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Sélecteur de période */}
                <SegmentedButtons
                    value={period}
                    onValueChange={setPeriod}
                    buttons={[
                        { value: 'week', label: 'Semaine' },
                        { value: 'month', label: 'Mois' },
                        { value: 'year', label: 'Année' },
                    ]}
                    style={styles.periodSelector}
                />

                {/* Cartes de statistiques */}
                <View style={styles.statsGrid}>
                    {renderStatCard('qrcode-scan', 'Scans QR', stats.totalScans, '#2196F3')}
                    {renderStatCard('star-circle', 'Points attribués', stats.totalPoints, '#FFC107')}
                    {renderStatCard('tag-multiple', 'Offres actives', stats.activeOffers, '#4CAF50')}
                    {renderStatCard('account-group', 'Clients uniques', stats.totalClients, '#9C27B0')}
                </View>

                {/* Graphique des scans */}
                <Card style={styles.chartCard}>
                    <Card.Title
                        title="Scans QR par jour"
                        titleStyle={styles.chartTitle}
                        left={(props) => (
                            <MaterialCommunityIcons
                                {...props}
                                name="qrcode-scan"
                                size={24}
                                color="#2CB76E"
                            />
                        )}
                    />
                    <Card.Content>
                        <LineChart
                            data={scansData}
                            width={screenWidth - 70}
                            height={200}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </Card.Content>
                </Card>

                {/* Graphique des points */}
                <Card style={styles.chartCard}>
                    <Card.Title
                        title="Points attribués par jour"
                        titleStyle={styles.chartTitle}
                        left={(props) => (
                            <MaterialCommunityIcons
                                {...props}
                                name="star-circle"
                                size={24}
                                color="#2CB76E"
                            />
                        )}
                    />
                    <Card.Content>
                        <BarChart
                            data={pointsData}
                            width={screenWidth - 70}
                            height={200}
                            chartConfig={{
                                ...chartConfig,
                                color: (opacity = 1) => `rgba(183, 44, 111, ${opacity})`,
                            }}
                            style={styles.chart}
                            showValuesOnTopOfBars
                        />
                    </Card.Content>
                </Card>

                {/* Graphique des offres populaires */}
                <Card style={styles.chartCard}>
                    <Card.Title
                        title="Offres les plus utilisées"
                        titleStyle={styles.chartTitle}
                        left={(props) => (
                            <MaterialCommunityIcons
                                {...props}
                                name="chart-pie"
                                size={24}
                                color="#2CB76E"
                            />
                        )}
                    />
                    <Card.Content>
                        <PieChart
                            data={offersData}
                            width={screenWidth - 70}
                            height={200}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                            style={styles.chart}
                        />
                    </Card.Content>
                </Card>

                {/* Meilleures heures */}
                <Card style={styles.infoCard}>
                    <Card.Title
                        title="Heures d'affluence"
                        titleStyle={styles.chartTitle}
                        left={(props) => (
                            <MaterialCommunityIcons
                                {...props}
                                name="clock-outline"
                                size={24}
                                color="#2CB76E"
                            />
                        )}
                    />
                    <Card.Content>
                        <View style={styles.timeSlot}>
                            <Text style={styles.timeSlotLabel}>🔥 Pic d'activité</Text>
                            <Text style={styles.timeSlotValue}>14h - 16h</Text>
                        </View>
                        <View style={styles.timeSlot}>
                            <Text style={styles.timeSlotLabel}>📊 Moyenne</Text>
                            <Text style={styles.timeSlotValue}>10h - 12h & 17h - 19h</Text>
                        </View>
                        <View style={styles.timeSlot}>
                            <Text style={styles.timeSlotLabel}>💤 Calme</Text>
                            <Text style={styles.timeSlotValue}>8h - 10h</Text>
                        </View>
                    </Card.Content>
                </Card>

                {/* Tendances */}
                <Card style={styles.infoCard}>
                    <Card.Title
                        title="Tendances"
                        titleStyle={styles.chartTitle}
                        left={(props) => (
                            <MaterialCommunityIcons
                                {...props}
                                name="trending-up"
                                size={24}
                                color="#2CB76E"
                            />
                        )}
                    />
                    <Card.Content>
                        <View style={styles.trendItem}>
                            <MaterialCommunityIcons name="arrow-up" size={24} color="#4CAF50" />
                            <Text style={styles.trendText}>
                                +15% de scans cette semaine
                            </Text>
                        </View>
                        <View style={styles.trendItem}>
                            <MaterialCommunityIcons name="arrow-up" size={24} color="#4CAF50" />
                            <Text style={styles.trendText}>
                                +8% de clients uniques
                            </Text>
                        </View>
                        <View style={styles.trendItem}>
                            <MaterialCommunityIcons name="minus" size={24} color="#FF9800" />
                            <Text style={styles.trendText}>
                                Taux de conversion stable
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>
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
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 15,
    },
    periodSelector: {
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    statIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    chartCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chart: {
        borderRadius: 10,
        marginVertical: 10,
    },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 20,
    },
    timeSlot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    timeSlotLabel: {
        fontSize: 14,
        color: '#666',
    },
    timeSlotValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    trendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    trendText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
});

export default MerchantStatsScreen;