// App.js - Navigation principale avec authentification
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import ClientNavigator from './src/navigation/ClientNavigator';
import MerchantNavigator from './src/navigation/MerchantNavigator';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { isAuthenticated, getUserData } from './src/services/api/authService';

// Composant de navigation qui dépend du contexte d'authentification
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2CB76E" />
      </View>
    );
  }

  // Si pas connecté, afficher les écrans d'authentification
  if (!user) {
    return <AuthNavigator />;
  }

  // Si connecté comme CLIENT, afficher la navigation client
  if (user.userType === 'CLIENT') {
    return <ClientNavigator />;
  }

  // Si connecté comme MERCHANT, afficher la navigation commerçant
  if (user.userType === 'MERCHANT') {
    return <MerchantNavigator />;
  }

  // Par défaut, retour à l'authentification
  return <AuthNavigator />;
};

// Composant principal
export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});