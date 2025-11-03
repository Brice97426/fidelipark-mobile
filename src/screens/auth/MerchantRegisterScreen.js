// src/screens/auth/MerchantRegisterScreen.js
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
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Image source={require('../../assets/icons/icon.png')} style={styles.logoImage} />
                    </View>
                    <Text style={styles.welcomeText}>Bienvenue</Text>
                    <Text style={styles.subtitle}>Inscription</Text>
                    <Text style={styles.userType}>Espace Commerçant</Text>
                </View>

                <Surface style={styles.formContainer} elevation={2}>
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
                                <TextInput
                                    label="Nom du commerce"
                                    mode="outlined"
                                    value={values.nomCommerce}
                                    onChangeText={handleChange('nomCommerce')}
                                    onBlur={handleBlur('nomCommerce')}
                                    error={touched.nomCommerce && errors.nomCommerce}
                                    style={styles.input}
                                    left={<TextInput.Icon icon="store" />}
                                />
                                {touched.nomCommerce && errors.nomCommerce && (
                                    <HelperText type="error" visible={true}>
                                        {errors.nomCommerce}
                                    </HelperText>
                                )}

                                <TextInput
                                    label="Adresse du commerce"
                                    mode="outlined"
                                    value={values.adresseCommerce}
                                    onChangeText={handleChange('adresseCommerce')}
                                    onBlur={handleBlur('adresseCommerce')}
                                    error={touched.adresseCommerce && errors.adresseCommerce}
                                    style={styles.input}
                                    left={<TextInput.Icon icon="map-marker" />}
                                />
                                {touched.adresseCommerce && errors.adresseCommerce && (
                                    <HelperText type="error" visible={true}>
                                        {errors.adresseCommerce}
                                    </HelperText>
                                )}

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

                                <Button
                                    mode="text"
                                    onPress={() => navigation.navigate('ClientRegister')}
                                    style={styles.switchButton}
                                    labelStyle={styles.switchButtonLabel}
                                >
                                    Vous êtes un client ?
                                </Button>

                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Vous avez un compte ?</Text>
                                    <Text
                                        style={styles.footerLink}
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
export default MerchantRegisterScreen;