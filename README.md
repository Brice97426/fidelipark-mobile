# 📱 FidéliPark - Application Mobile

Application mobile de fidélisation pour le centre-ville de Saint-Pierre, La Réunion.

## 🎯 Objectif du Projet

Dynamiser le commerce local en proposant un système de fidélité moderne basé sur le stationnement payant.

## 👥 Équipe

- **Brice BERNARDIN** - b.bernardin@rt-iut.re
- **Killian DENA** - k.dena@rt-iut.re

BUT RT3 - Année 2025-2026

## 🚀 Technologies

### Framework Principal
- **React Native** via **Expo SDK 52**
- **Node.js** v22.x

### Navigation
- **@react-navigation/native** v6 - Navigation principale
- **@react-navigation/native-stack** - Stack navigation
- **@react-navigation/bottom-tabs** - Tabs navigation
- **@react-navigation/drawer** - Drawer navigation
- **react-native-screens** - Optimisation écrans
- **react-native-safe-area-context** - Zones sûres
- **react-native-gesture-handler** - Gestion des gestes

### UI/UX
- **react-native-paper** - Material Design components
- **react-native-vector-icons** - Icônes
- **@expo-google-fonts/roboto** - Police Roboto
- **expo-font** - Chargement de polices
- **expo-splash-screen** - Écran de démarrage
- **expo-status-bar** - Barre de statut

### QR Code & Caméra
- **expo-camera** - Accès caméra
- **expo-barcode-scanner** - Scan de QR codes
- **react-native-qrcode-svg** - Génération QR codes
- **react-native-svg** - Support SVG

### Cartes & Localisation
- **react-native-maps** - Cartes interactives
- **expo-location** - Géolocalisation

### Stockage
- **@react-native-async-storage/async-storage** - Stockage local
- **expo-secure-store** - Stockage sécurisé (tokens, credentials)

### API & Réseau
- **axios** - Client HTTP pour API backend

### Formulaires & Validation
- **formik** - Gestion de formulaires
- **yup** - Validation de schémas

### Images & Médias
- **expo-image-picker** - Sélection d'images
- **expo-image-manipulator** - Manipulation d'images
- **expo-file-system** - Système de fichiers

### Notifications
- **expo-notifications** - Notifications push
- **expo-device** - Informations appareil

### State Management
- **zustand** - Gestion d'état globale

### Utilitaires
- **moment** - Gestion de dates
- **lodash** - Fonctions utilitaires
- **expo-constants** - Constantes système
- **react-native-webview** - WebView (pour PayByPhone)

### Développement
- **@types/react** - Types TypeScript pour React
- **@types/react-native** - Types TypeScript pour React Native
- **eslint** - Linter
- **prettier** - Formatage de code
- **@babel/core** - Compilateur Babel
- **expo-cli** - CLI Expo
- **eas-cli** - CLI EAS Build

## 📂 Structure du Projet

```
fidelipark-mobile/
├── src/
│   ├── assets/              # Ressources statiques
│   │   ├── images/          # Images
│   │   ├── icons/           # Icônes (icon.png)
│   │   └── fonts/           # Polices personnalisées
│   ├── components/          # Composants réutilisables
│   │   ├── common/          # Composants communs
│   │   ├── qrcode/          # Composants QR Code
│   │   ├── map/             # Composants carte
│   │   ├── offers/          # Composants offres
│   │   ├── parking/         # Composants parking
│   │   └── loyalty/         # Composants fidélité
│   ├── screens/             # Écrans de l'application
│   │   ├── auth/            # Écrans authentification
│   │   │   ├── ClientLoginScreen.js
│   │   │   ├── ClientRegisterScreen.js
│   │   │   ├── MerchantLoginScreen.js
│   │   │   └── MerchantRegisterScreen.js
│   │   ├── client/          # Écrans client
│   │   ├── merchant/        # Écrans commerçant
│   │   ├── admin/           # Écrans administrateur
│   │   └── common/          # Écrans communs
│   ├── navigation/          # Configuration navigation
│   │   └── AuthNavigator.js # Navigateur authentification
│   ├── services/            # Services
│   │   ├── api/             # Services API
│   │   ├── auth/            # Services authentification
│   │   ├── storage/         # Services stockage
│   │   ├── location/        # Services localisation
│   │   └── notification/    # Services notifications
│   ├── store/               # State management (Zustand)
│   ├── hooks/               # Custom hooks React
│   ├── utils/               # Fonctions utilitaires
│   ├── constants/           # Constantes de l'app
│   └── theme/               # Thème React Native Paper
├── .env                     # Variables d'environnement
├── .gitignore               # Fichiers ignorés par Git
├── app.json                 # Configuration Expo
├── App.js                   # Point d'entrée de l'app
├── babel.config.js          # Configuration Babel
├── package.json             # Dépendances npm
├── .eslintrc.js             # Configuration ESLint
├── .prettierrc              # Configuration Prettier
└── README.md                # Ce fichier
```

## 📦 Installation

### Prérequis
```bash
# Node.js v22.x
node --version

# npm ou yarn
npm --version

# Git
git --version

# Java JDK 17 (pour Android)
java -version

# Expo Go sur votre téléphone
# Android: https://play.google.com/store/apps/details?id=host.exp.exponent
# iOS: https://apps.apple.com/app/expo-go/id982107779
```

### Cloner le projet
```bash
git clone git@github.com-mobile:Brice97426/fidelipark-mobile.git
cd fidelipark-mobile
```

### Installer les dépendances
```bash
npm install
```

### Configurer l'environnement

Créer un fichier `.env` à la racine :
```env
# API Configuration
API_URL=http://192.168.1.100:3000
API_TIMEOUT=10000

# Environment
NODE_ENV=development

# CAS Authentication
CAS_URL=https://fidelipark.fr/cas
CAS_SERVICE_URL=https://fidelipark.fr

# PayByPhone
PAYBYPHONE_API_URL=https://api.paybyphone.com

# App Configuration
APP_NAME=FidéliPark
APP_VERSION=1.0.0

# Maps (si Google Maps)
GOOGLE_MAPS_API_KEY=votre_cle_google_maps

# Notifications
EXPO_PUSH_TOKEN=votre_token_expo
```

## 🏃 Lancer l'Application

### Mode développement
```bash
# Démarrer le serveur Expo
npm start

# Ou directement sur une plateforme
npm run android  # Android
npm run ios      # iOS
npm run web      # Web

# Nettoyer le cache si problème
npm run clear
```

### Scanner le QR Code
1. Lancez `npm start`
2. Un QR code s'affiche dans le terminal
3. Scannez-le avec **Expo Go** sur votre téléphone
4. L'application se lance automatiquement

## 📱 Fonctionnalités Implémentées

### ✅ Authentification
- [x] Écran de connexion client
- [x] Écran d'inscription client
- [x] Écran de connexion commerçant
- [x] Écran d'inscription commerçant
- [x] Validation de formulaires (Formik + Yup)
- [x] Gestion des erreurs
- [x] Affichage/masquage mot de passe

### 🔜 À Implémenter
- [ ] Navigation principale (Tabs/Drawer)
- [ ] Écran profil client
- [ ] Carte des commerçants
- [ ] Liste des commerçants
- [ ] Scan QR Code parking
- [ ] Génération QR Code véhicule
- [ ] Gestion des points de fidélité
- [ ] Liste des offres
- [ ] Favoris commerçants
- [ ] Notifications
- [ ] Dashboard commerçant
- [ ] Scan QR Code client (commerçant)
- [ ] Gestion des offres (commerçant)
- [ ] Enregistrement plaques (OCR)
- [ ] Intégration PayByPhone
- [ ] Dashboard administrateur

## 🔧 Configuration

### app.json
Configuration principale Expo :
- **Nom**: FidéliPark
- **Slug**: fidelipark
- **Version**: 1.0.0
- **Orientation**: Portrait
- **Permissions**:
  - Camera (scan QR codes)
  - Location (carte commerçants)
  - Storage (photos plaques)
  - Internet
- **Plugins**: expo-camera, expo-notifications, expo-location

### babel.config.js
Configuration Babel pour React Native Paper et Expo.

### Thème (React Native Paper)
Couleurs principales :
- **Primary**: #4A90E2 (Bleu)
- **Secondary**: #E91E63 (Rose)
- **Background**: #F5F5F5 (Gris clair)

## 🎨 Design System

### Composants React Native Paper
```javascript
import {
  Button,
  TextInput,
  Card,
  Surface,
  Text,
  Checkbox,
  HelperText
} from 'react-native-paper';
```

Documentation: https://reactnativepaper.com/

### Icônes (Material Design)
```javascript
<TextInput.Icon icon="email" />
<TextInput.Icon icon="lock" />
<TextInput.Icon icon="account" />
```

Catalogue: https://materialdesignicons.com/

## 📱 Build & Déploiement

### Build Android (APK)
```bash
npm run build:android
```

### Build iOS (IPA)
```bash
npm run build:ios
```

### Configuration EAS Build
Nécessite un compte Expo et configuration dans `app.json` :
```json
"extra": {
  "eas": {
    "projectId": "votre-project-id"
  }
}
```

## 🔒 Sécurité

### Stockage Sécurisé
- **AsyncStorage**: Données non sensibles
- **SecureStore**: Tokens JWT, identifiants

### Communication API
- HTTPS/TLS uniquement
- Tokens JWT dans headers Authorization
- Refresh tokens

### Validation
- Validation côté client (Formik + Yup)
- Validation côté serveur (express-validator)

## 🧪 Tests

```bash
# Tests unitaires (à implémenter)
npm test

# Linter
npm run lint

# Formatage
npm run format
```

## 📚 Documentation

### React Native & Expo
- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnavigation.org/
- **React Navigation**: https://reactnavigation.org/

### Bibliothèques
- **React Native Paper**: https://reactnativepaper.com/
- **Formik**: https://formik.org/
- **Yup**: https://github.com/jquense/yup
- **Zustand**: https://github.com/pmndrs/zustand
- **Axios**: https://axios-http.com/

## 🐛 Debugging

### Logs
```javascript
console.log('Debug info');
console.error('Error info');
```

### React Native Debugger
```bash
# Ouvrir le menu dev
# Android: Cmd+M (Mac) / Ctrl+M (Windows)
# iOS: Cmd+D

# Options:
- Enable Remote Debugging
- Enable Hot Reloading
- Enable Fast Refresh
```

### Expo Dev Tools
Accessible sur `http://localhost:19002` après `npm start`

## 📞 Support

- **Email**: b.bernardin@rt-iut.re, k.dena@rt-iut.re
- **GitHub**: Issues sur le dépôt
- **Documentation**: Voir fichiers de spécification

## 🤝 Contribution

1. Créer une branche: `git checkout -b feature/ma-fonctionnalite`
2. Commiter: `git commit -m "Ajout de ma fonctionnalité"`
3. Pousser: `git push origin feature/ma-fonctionnalite`
4. Créer une Pull Request

## 📄 Licence

Projet académique - BUT RT3 2025-2026  
IUT de La Réunion

---

**Fait avec ❤️ à La Réunion**
