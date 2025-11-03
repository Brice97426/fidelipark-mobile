// src/screens/auth/ClientRegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
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
import { commonStyles, colors } from './styles';

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
          <Text style={commonStyles.subtitle}>Inscription</Text>
        </View>

        {/* Formulaire */}
        <Surface style={commonStyles.formContainer} elevation={2}>
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
                  style={commonStyles.input}
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
                  style={commonStyles.input}
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

                {/* Boutons */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={commonStyles.button}
                  contentStyle={commonStyles.buttonContent}
                >
                  Inscription
                </Button>

                <Button
                  mode="text"
                  onPress={() => navigation.navigate('MerchantRegister')}
                  style={commonStyles.switchButton}
                  labelStyle={commonStyles.switchButtonLabel}
                >
                  Vous êtes commerçant ?
                </Button>

                <View style={commonStyles.footer}>
                  <Text style={commonStyles.footerText}>Vous avez un compte ?</Text>
                  <Text
                    style={commonStyles.footerLink}
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
    backgroundColor: colors.background, // spécifique à cet écran
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
    color: colors.gray,
  },
});

export default ClientRegisterScreen;
