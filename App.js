import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthNavigator from './src/navigation/AuthNavigator';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Iceland: require('./assets/fonts/Iceland-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // Petit écran d'attente pendant le chargement de la police
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2CB76E" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
