// src/screens/auth/MerchantRegisterScreen.js
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
    nomCommerce: Yup.string()
        .min(2, 'Le nom du commerce doit contenir au moins 2 caractères')
        .required('Nom du commerce requis'),
    adresseCommerce: Yup.string()
        .min(5, 'Adresse invalide')
        .required('Adresse du commerce requise'),
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

const MerchantRegisterScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureConfirmText, setSecureConfirmText] = useState(true);

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            console.log('Merchant Registration:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert('Inscription commerçant réussie ! Vous pouvez maintenant vous connecter.');
            navigation.navigate('MerchantLogin');
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
                <View style={commonStyles.logoContainer}>
                        <Image
                            source={require('../../assets/icons/icon.png')}
                            style={commonStyles.logoImage}
                        />
                    <Text style={commonStyles.welcomeText}>Bienvenue</Text>
                    <Text style={commonStyles.subtitle}>Inscription</Text>
                    <Text style={commonStyles.userType}>Espace Commerçant</Text>
                </View>

                <Surface style={commonStyles.formContainer} elevation={2}>
                    <Formik
                        initialValues={{
                            nomCommerce: '',
                            adresseCommerce: '',
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
                                {/* Nom du commerce */}
                                <TextInput
                                    label="Nom du commerce"
                                    mode="outlined"
                                    value={values.nomCommerce}
                                    onChangeText={handleChange('nomCommerce')}
                                    onBlur={handleBlur('nomCommerce')}
                                    error={touched.nomCommerce && errors.nomCommerce}
                                    style={commonStyles.input}
                                    left={<TextInput.Icon icon="store" />}
                                />
                                {touched.nomCommerce && errors.nomCommerce && (
                                    <HelperText type="error" visible={true}>
                                        {errors.nomCommerce}
                                    </HelperText>
                                )}

                                {/* Adresse du commerce */}
                                <TextInput
                                    label="Adresse du commerce"
                                    mode="outlined"
                                    value={values.adresseCommerce}
                                    onChangeText={handleChange('adresseCommerce')}
                                    onBlur={handleBlur('adresseCommerce')}
                                    error={touched.adresseCommerce && errors.adresseCommerce}
                                    style={commonStyles.input}
                                    left={<TextInput.Icon icon="map-marker" />}
                                />
                                {touched.adresseCommerce && errors.adresseCommerce && (
                                    <HelperText type="error" visible={true}>
                                        {errors.adresseCommerce}
                                    </HelperText>
                                )}

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

                                {/* Confirmer mot de passe */}
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

                                {/* Accept Terms */}
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
                                    onPress={() => navigation.navigate('ClientRegister')}
                                    style={commonStyles.switchButton}
                                    labelStyle={commonStyles.switchButtonLabel}
                                >
                                    Vous êtes un client ?
                                </Button>

                                <View style={commonStyles.footer}>
                                    <Text style={commonStyles.footerText}>Vous avez un compte ?</Text>
                                    <Text
                                        style={commonStyles.footerLink}
                                        onPress={() => navigation.navigate('MerchantLogin')}
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

export default MerchantRegisterScreen;

