// src/navigation/AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientLoginScreen from '../screens/auth/ClientLoginScreen';
import ClientRegisterScreen from '../screens/auth/ClientRegisterScreen';
import MerchantLoginScreen from '../screens/auth/MerchantLoginScreen';
import MerchantRegisterScreen from '../screens/auth/MerchantRegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientLogin"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ClientLogin" component={ClientLoginScreen} />
      <Stack.Screen name="ClientRegister" component={ClientRegisterScreen} />
      <Stack.Screen name="MerchantLogin" component={MerchantLoginScreen} />
      <Stack.Screen name="MerchantRegister" component={MerchantRegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
