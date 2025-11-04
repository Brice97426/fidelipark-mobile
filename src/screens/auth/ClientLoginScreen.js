// src/screens/auth/ClientLoginScreen.js
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { commonStyles, colors } from './styles';
import { login } from '../../services/api/authService';

// Schéma de validation
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse mail invalide')
    .required('Adresse mail requise'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
});

const ClientLoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log('🔄 Tentative de connexion CLIENT...', values.email);

      const result = await login(values.email, values.password, 'CLIENT');

      if (result.success) {
        console.log('✅ Connexion réussie!', result.data.user);

        showMessage(`Bienvenue ${result.data.user.prenom} ${result.data.user.nom} !`);

        // Navigation vers l'écran principal client après 1 seconde
        setTimeout(() => {
          // TODO: Décommenter quand l'écran ClientHome sera créé
          // navigation.navigate('ClientHome');
          console.log('Navigation vers ClientHome (à implémenter)');
          Alert.alert(
            '✅ Connexion réussie !',
            `Bienvenue ${result.data.user.prenom} ${result.data.user.nom}\n\nPoints: ${result.data.user.points}\n\n(Navigation vers accueil à implémenter)`,
            [{ text: 'OK' }]
          );
        }, 1000);

      } else {
        console.log('❌ Erreur de connexion:', result.error);
        Alert.alert(
          '❌ Erreur de connexion',
          result.error || 'Email ou mot de passe incorrect.\n\nComptes de test:\n• jean.dupont@email.com\n• password123'
        );
      }
    } catch (error) {
      console.error('❌ Erreur inattendue:', error);
      Alert.alert(
        '❌ Erreur',
        'Impossible de se connecter au serveur.\n\nVérifiez que:\n1. Le backend est démarré (npm run dev)\n2. L\'URL API est correcte dans .env'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[commonStyles.container, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={commonStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={commonStyles.logoContainer}>
          <Image
            source={require('../../assets/icons/icon.png')}
            style={commonStyles.logoImage}
          />
          <Text style={commonStyles.welcomeText}>Bienvenue</Text>
          <Text style={commonStyles.subtitle}>Connexion Client</Text>
        </View>

        {/* Formulaire */}
        <Surface style={commonStyles.formContainer} elevation={2}>
          <Formik
            initialValues={{
              email: __DEV__ ? 'jean.dupont@email.com' : '',
              password: __DEV__ ? 'password123' : ''
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                {/* Email */}
                <TextInput
                  label="Adresse Mail"
                  mode="outlined"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                  style={commonStyles.input}
                  left={<TextInput.Icon icon="email" />}
                  disabled={loading}
                />
                {touched.email && errors.email && (
                  <HelperText type="error" visible>
                    {errors.email}
                  </HelperText>
                )}

                {/* Mot de passe */}
                <TextInput
                  label="Mot de passe"
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={secureText}
                  error={touched.password && errors.password}
                  style={commonStyles.input}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={secureText ? 'eye' : 'eye-off'}
                      onPress={() => setSecureText(!secureText)}
                    />
                  }
                  disabled={loading}
                />
                {touched.password && errors.password && (
                  <HelperText type="error" visible>
                    {errors.password}
                  </HelperText>
                )}

                {/* Info compte test (mode dev uniquement) */}
                {__DEV__ && (
                  <Text style={styles.devInfo}>
                    💡 Compte de test pré-rempli
                  </Text>
                )}

                {/* Bouton Connexion */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={commonStyles.button}
                  contentStyle={commonStyles.buttonContent}
                  icon="login"
                >
                  {loading ? 'Connexion en cours...' : 'Connexion'}
                </Button>

                {/* Lien vers commerçant */}
                <Button
                  mode="text"
                  onPress={() => !loading && navigation.navigate('MerchantLogin')}
                  style={commonStyles.switchButton}
                  labelStyle={commonStyles.switchButtonLabel}
                  disabled={loading}
                >
                  Vous êtes commerçant ?
                </Button>

                {/* Mot de passe oublié */}
                <View style={commonStyles.footer}>
                  <Text style={commonStyles.footerText}>Mot de passe oublié ?</Text>
                  <Text
                    style={[commonStyles.footerLink, loading && styles.linkDisabled]}
                    onPress={() => !loading && Alert.alert('Info', 'Fonctionnalité à venir')}
                  >
                    Réinitialiser
                  </Text>
                </View>

                {/* Lien inscription */}
                <View style={commonStyles.footer}>
                  <Text style={commonStyles.footerText}>
                    Vous n'avez pas de compte ?
                  </Text>
                  <Text
                    style={[commonStyles.footerLink, loading && styles.linkDisabled]}
                    onPress={() => !loading && navigation.navigate('ClientRegister')}
                  >
                    Inscription
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </Surface>
      </ScrollView>

      {/* Snackbar pour les messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  devInfo: {
    fontSize: 12,
    color: colors.accent,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  linkDisabled: {
    opacity: 0.5,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
  },
});

export default ClientLoginScreen;