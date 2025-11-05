// src/navigation/ClientNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import ClientFavoritesScreen from '../screens/client/ClientFavoritesScreen';
import ClientOffersScreen from '../screens/client/ClientOffersScreen';
import ClientProfileScreen from '../screens/client/ClientProfileScreen';

const Tab = createBottomTabNavigator();

const ClientNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favoris') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Bons') {
                        iconName = focused ? 'ticket-percent' : 'ticket-percent-outline';
                    } else if (route.name === 'Profil') {
                        iconName = focused ? 'account' : 'account-outline';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#B72C6F',
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
                component={ClientHomeScreen}
                options={{ title: 'Accueil' }}
            />
            <Tab.Screen
                name="Favoris"
                component={ClientFavoritesScreen}
                options={{ title: 'Favoris' }}
            />
            <Tab.Screen
                name="Bons"
                component={ClientOffersScreen}
                options={{ title: 'Bons de réduction' }}
            />
            <Tab.Screen
                name="Profil"
                component={ClientProfileScreen}
                options={{ title: 'Profil' }}
            />
        </Tab.Navigator>
    );
};

export default ClientNavigator;