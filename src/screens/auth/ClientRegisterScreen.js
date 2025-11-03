// src/screens/auth/ClientRegisterScreen.js
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
  Checkbox,
  HelperText,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Schéma de validation
const registerSchema = Yup.object().shape({
  nom: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Nom requis'),
  prenom: Yup.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .required('Prénom requis'),
  email: Yup.string()
    .email('Adresse mail invalide')
    .required('Adresse mail requise'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requise'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les conditions générales')
    .required(),
});

const ClientRegisterScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      // TODO: Implémenter l'inscription avec l'API
      console.log('Inscription avec:', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigation.navigate('ClientLogin');
    } catch (error) {
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
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
          <Text style={styles.subtitle}>Inscription</Text>
        </View>

        {/* Formulaire */}
        <Surface style={styles.formContainer} elevation={2}>
          <Formik
            initialValues={{
              nom: '',
              prenom: '',
              email: '',
              password: '',
              confirmPassword: '',
              acceptTerms: false,
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                {/* Nom et Prénom sur la même ligne */}
                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <TextInput
                      label="Nom"
                      mode="outlined"
                      value={values.nom}
                      onChangeText={handleChange('nom')}
                      onBlur={handleBlur('nom')}
                      error={touched.nom && errors.nom}
                      left={<TextInput.Icon icon="account" />}
                    />
                    {touched.nom && errors.nom && (
                      <HelperText type="error" visible={true}>
                        {errors.nom}
                      </HelperText>
                    )}
                  </View>

                  <View style={styles.halfInput}>
                    <TextInput
                      label="Prénom"
                      mode="outlined"
                      value={values.prenom}
                      onChangeText={handleChange('prenom')}
                      onBlur={handleBlur('prenom')}
                      error={touched.prenom && errors.prenom}
                    />
                    {touched.prenom && errors.prenom && (
                      <HelperText type="error" visible={true}>
                        {errors.prenom}
                      </HelperText>
                    )}
                  </View>
                </View>

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

                {/* Confirmation mot de passe */}
                <TextInput
                  label="Confirmer le Mot de passe"
                  mode="outlined"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={secureConfirmText}
                  error={touched.confirmPassword && errors.confirmPassword}
                  style={styles.input}
                  left={<TextInput.Icon icon="lock-check" />}
                  right={
                    <TextInput.Icon
                      icon={secureConfirmText ? 'eye' : 'eye-off'}
                      onPress={() => setSecureConfirmText(!secureConfirmText)}
                    />
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <HelperText type="error" visible={true}>
                    {errors.confirmPassword}
                  </HelperText>
                )}

                {/* Conditions générales */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={values.acceptTerms ? 'checked' : 'unchecked'}
                    onPress={() =>
                      setFieldValue('acceptTerms', !values.acceptTerms)
                    }
                  />
                  <Text style={styles.checkboxText}>
                    Veuillez accepter les conditions générales
                  </Text>
                </View>
                {touched.acceptTerms && errors.acceptTerms && (
                  <HelperText type="error" visible={true}>
                    {errors.acceptTerms}
                  </HelperText>
                )}

                {/* Bouton Inscription */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                >
                  Inscription
                </Button>

                {/* Lien vers commerçant */}
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('MerchantRegister')}
                  style={styles.switchButton}
                  labelStyle={styles.switchButtonLabel}
                >
                  Vous êtes commerçant ?
                </Button>

                {/* Lien connexion */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Vous avez un compte ?</Text>
                  <Text
                    style={styles.footerLink}
                    onPress={() => navigation.navigate('ClientLogin')}
                  >
                    Connexion
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

export default ClientRegisterScreen;
