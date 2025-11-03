// src/screens/auth/ClientLoginScreen.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
  HelperText,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // TODO: Implémenter l'authentification avec l'API
      console.log('Login avec:', values);
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Navigation vers l'écran principal client après succès
      // navigation.navigate('ClientHome');
      
      alert('Connexion réussie !');
    } catch (error) {
      alert('Erreur de connexion. Veuillez réessayer.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Image source={require('../../assets/icons/icon.png')} style={styles.logoImage} />
          </View>
          <Text style={styles.welcomeText}>Bienvenue</Text>
          <Text style={styles.subtitle}>Connexion</Text>
        </View>

        {/* Formulaire */}
        <Surface style={styles.formContainer} elevation={2}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
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
                  style={styles.input}
                  left={<TextInput.Icon icon="email" />}
                />
                {touched.email && errors.email && (
                  <HelperText type="error" visible={true}>
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
                  style={styles.input}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={secureText ? 'eye' : 'eye-off'}
                      onPress={() => setSecureText(!secureText)}
                    />
                  }
                />
                {touched.password && errors.password && (
                  <HelperText type="error" visible={true}>
                    {errors.password}
                  </HelperText>
                )}

                {/* Bouton Connexion */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                >
                  Connexion
                </Button>

                {/* Lien vers commerçant */}
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('MerchantLogin')}
                  style={styles.switchButton}
                  labelStyle={styles.switchButtonLabel}
                >
                  Vous êtes commerçant ?
                </Button>

                {/* Mot de passe oublié */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Mot de passe oublié ?</Text>
                  <Text style={styles.footerLink} onPress={() => {}}>
                    Réinitialiser
                  </Text>
                </View>

                {/* Lien inscription */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Vous n'avez pas de compte ?
                  </Text>
                  <Text
                    style={styles.footerLink}
                    onPress={() => navigation.navigate('ClientRegister')}
                  >
                    Inscription
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  logoImage: {
    width: 246,
    height: 151,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 246,
    height: 151,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  switchButton: {
    marginTop: 10,
  },
  switchButtonLabel: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default ClientLoginScreen;
