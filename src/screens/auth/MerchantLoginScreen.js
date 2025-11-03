// src/screens/auth/MerchantLoginScreen.js
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
    HelperText,
    useTheme,

} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { commonStyles, colors } from './styles'; // Import centralisé

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse mail invalide')
        .required('Adresse mail requise'),
    password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Mot de passe requis'),
});

const MerchantLoginScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            console.log('Merchant Login:', values);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert('Connexion commerçant réussie !');
        } catch (error) {
            alert('Erreur de connexion. Veuillez réessayer.');
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
                    <Text style={commonStyles.subtitle}>Connexion</Text>
                    <Text style={commonStyles.userType}>Espace Commerçant</Text>
                </View>

                <Surface style={commonStyles.formContainer} elevation={2}>
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

                                <Button
                                    mode="contained"
                                    onPress={handleSubmit}
                                    loading={loading}
                                    disabled={loading}
                                    style={commonStyles.button}
                                    contentStyle={commonStyles.buttonContent}
                                >
                                    Connexion
                                </Button>

                                <Button
                                    mode="text"
                                    onPress={() => navigation.navigate('ClientLogin')}
                                    style={commonStyles.switchButton}
                                    labelStyle={commonStyles.switchButtonLabel}
                                >
                                    Vous êtes un client ?
                                </Button>

                                <View style={commonStyles.footer}>
                                    <Text style={commonStyles.footerText}>Mot de passe oublié ?</Text>
                                    <Text style={commonStyles.footerLink} onPress={() => { }}>
                                        Réinitialiser
                                    </Text>
                                </View>

                                <View style={commonStyles.footer}>
                                    <Text style={commonStyles.footerText}>
                                        Vous n'avez pas de compte ?
                                    </Text>
                                    <Text
                                        style={commonStyles.footerLink}
                                        onPress={() => navigation.navigate('MerchantRegister')}
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

export default MerchantLoginScreen;
