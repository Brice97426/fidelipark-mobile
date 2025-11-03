import { StyleSheet } from 'react-native';

// 🎨 Couleurs globales
export const colors = {
    background: '#F5F5F5',  // fond gris clair pour login/register
    primary: '#2CB76E',     // vert principal
    accent: '#B72C6F',      // rose accent
    text: '#333',
    white: '#fff',
    black: '#000',
};

// 🧱 Styles communs
export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
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
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoImage: {
        width: 246,
        height: 151,
    },
    welcomeText: {
        fontSize: 50,
        color: colors.black,
        marginBottom: 5,
        fontFamily: 'Iceland', // 🧠 Police personnalisée
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 40,
        color: colors.black,
        opacity: 0.9,
        fontFamily: 'Iceland', // 🧠 même police pour cohérence
        textAlign: 'center',
        marginBottom: 10,
    },
    userType: {
        fontFamily: 'Iceland',
        fontSize: 16,
        color: colors.black,
        marginTop: 5,
    },
    formContainer: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    button: {
        backgroundColor: colors.accent,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    switchButton: {
        marginTop: 10,
    },
    switchButtonLabel: {
        color: colors.accent,
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
        color: colors.black,
    },
    footerLink: {
        fontSize: 14,
        color: colors.accent,
        fontWeight: 'bold',
    },
});
