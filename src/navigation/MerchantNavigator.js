// src/navigation/MerchantNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MerchantHomeScreen from '../screens/merchant/MerchantHomeScreen';
import MerchantScanScreen from '../screens/merchant/MerchantScanScreen';
import MerchantStatsScreen from '../screens/merchant/MerchantStatsScreen';
import MerchantProfileScreen from '../screens/merchant/MerchantProfileScreen';

const Tab = createBottomTabNavigator();

const MerchantNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Scan') {
                        iconName = focused ? 'qrcode-scan' : 'qrcode';
                    } else if (route.name === 'Stats') {
                        iconName = focused ? 'chart-line' : 'chart-line-variant';
                    } else if (route.name === 'Profil') {
                        iconName = focused ? 'account' : 'account-outline';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2CB76E',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#E0E0E0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={MerchantHomeScreen}
                options={{ title: 'Accueil' }}
            />
            <Tab.Screen
                name="Scan"
                component={MerchantScanScreen}
                options={{ title: 'Scanner' }}
            />
            <Tab.Screen
                name="Stats"
                component={MerchantStatsScreen}
                options={{ title: 'Statistiques' }}
            />
            <Tab.Screen
                name="Profil"
                component={MerchantProfileScreen}
                options={{ title: 'Profil' }}
            />
        </Tab.Navigator>
    );
};

export default MerchantNavigator;