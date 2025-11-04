// src/screens/auth/ClientRegisterScreen.js
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
  Checkbox,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { commonStyles, colors } from './styles';
import { registerClient } from '../../services/api/authService';

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
  nb_tel: Yup.string()
    .matches(/^[0-9]{10}$/, 'Numéro de téléphone invalide (10 chiffres)')
    .nullable(),
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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      console.log('🔄 Tentative d\'inscription CLIENT...', values.email);

      const result = await registerClient({
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        password: values.password,
        nb_tel: values.nb_tel,
      });

      if (result.success) {
        console.log('✅ Inscription réussie!', result.data.user);

        Alert.alert(
          '✅ Inscription réussie !',
          `Bienvenue ${values.prenom} ${values.nom} !\n\nVous pouvez maintenant vous connecter avec votre compte.`,
          [
            {
              text: 'Se connecter',
              onPress: () => navigation.navigate('ClientLogin'),
            },
          ]
        );
      } else {
        console.log('❌ Erreur d\'inscription:', result.error);

        let errorMessage = result.error || 'Erreur lors de l\'inscription.';

        // Afficher les détails des erreurs de validation si disponibles
        if (result.details && Array.isArray(result.details)) {
          const validationErrors = result.details.map(err => err.msg).join('\n');
          errorMessage += '\n\n' + validationErrors;
        }

        Alert.alert('❌ Erreur d\'inscription', errorMessage);
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
          <View style={commonStyles.logoPlaceholder}>
            <Image source={require('../../assets/icons/icon.png')} style={commonStyles.logoImage} />
          </View>
          <Text style={commonStyles.welcomeText}>Bienvenue</Text>
          <Text style={commonStyles.subtitle}>Inscription Client</Text>
        </View>

        {/* Formulaire */}
        <Surface style={commonStyles.formContainer} elevation={2}>
          <Formik
            initialValues={{
              nom: '',
              prenom: '',
              email: '',
              nb_tel: '',
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
                {/* Nom et Prénom */}
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
                      disabled={loading}
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
                      left={<TextInput.Icon icon="account" />}
                      disabled={loading}
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
                  style={commonStyles.input}
                  left={<TextInput.Icon icon="email" />}
                  disabled={loading}
                />
                {touched.email && errors.email && (
                  <HelperText type="error" visible={true}>
                    {errors.email}
                  </HelperText>
                )}

                {/* Numéro de téléphone */}
                <TextInput
                  label="Numéro de téléphone (optionnel)"
                  mode="outlined"
                  value={values.nb_tel}
                  onChangeText={handleChange('nb_tel')}
                  onBlur={handleBlur('nb_tel')}
                  keyboardType="phone-pad"
                  error={touched.nb_tel && errors.nb_tel}
                  style={commonStyles.input}
                  left={<TextInput.Icon icon="phone" />}
                  placeholder="0692123456"
                  disabled={loading}
                />
                {touched.nb_tel && errors.nb_tel && (
                  <HelperText type="error" visible={true}>
                    {errors.nb_tel}
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
                  style={commonStyles.input}
                  left={<TextInput.Icon icon="lock-check" />}
                  right={
                    <TextInput.Icon
                      icon={secureConfirmText ? 'eye' : 'eye-off'}
                      onPress={() => setSecureConfirmText(!secureConfirmText)}
                    />
                  }
                  disabled={loading}
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
                      !loading && setFieldValue('acceptTerms', !values.acceptTerms)
                    }
                    disabled={loading}
                  />
                  <Text style={styles.checkboxText}>
                    J'accepte les conditions générales d'utilisation et la politique de confidentialité RGPD
                  </Text>
                </View>
                {touched.acceptTerms && errors.acceptTerms && (
                  <HelperText type="error" visible={true}>
                    {errors.acceptTerms}
                  </HelperText>
                )}

                {/* Boutons */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={commonStyles.button}
                  contentStyle={commonStyles.buttonContent}
                  icon="account-plus"
                >
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </Button>

                <Button
                  mode="text"
                  onPress={() => !loading && navigation.navigate('MerchantRegister')}
                  style={commonStyles.switchButton}
                  labelStyle={commonStyles.switchButtonLabel}
                  disabled={loading}
                >
                  Vous êtes commerçant ?
                </Button>

                <View style={commonStyles.footer}>
                  <Text style={commonStyles.footerText}>Vous avez un compte ?</Text>
                  <Text
                    style={[commonStyles.footerLink, loading && styles.linkDisabled]}
                    onPress={() => !loading && navigation.navigate('ClientLogin')}
                  >
                    Connexion
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.black,
  },
  linkDisabled: {
    opacity: 0.5,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
  },
});

export default ClientRegisterScreen;