# 📱 FidéliPark - Application Mobile

Application mobile de fidélisation pour le centre-ville de Saint-Pierre, La Réunion.

## 🎯 Objectif du Projet

Dynamiser le commerce local en proposant un système de fidélité moderne basé sur le stationnement payant.

## 👥 Équipe

- **Brice BERNARDIN** - b.bernardin@rt-iut.re
- **Killian DENA** - k.dena@rt-iut.re

BUT RT3 - Année 2025-2026

## 🚀 Technologies

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation 6
- **UI**: React Native Paper (Material Design)
- **State Management**: Zustand
- **API**: Axios
- **Maps**: React Native Maps
- **QR Code**: Expo Camera + Barcode Scanner
- **Storage**: AsyncStorage + SecureStore

## 📦 Installation

```bash
# Cloner le dépôt
git clone git@github.com-mobile:Brice97426/fidelipark-mobile.git
cd fidelipark-mobile

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Modifier .env avec vos valeurs
```

## 🏃 Lancer l'Application

```bash
# Mode développement
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web

# Nettoyer le cache
npm run clear
```

## 📱 Fonctionnalités

### Pour les Clients
- 🔐 Authentification via CAS
- 📸 Scan de QR Code parking
- 💳 Paiement via PayByPhone
- ⭐ Accumulation de points de fidélité
- 🎁 Consultation et utilisation des offres
- 🗺️ Carte interactive des commerçants
- 🚗 Enregistrement des plaques
- 📊 Historique des transactions

### Pour les Commerçants
- 📊 Dashboard de statistiques
- 🎁 Création et gestion des offres
- ✅ Validation des offres clients
- 👥 Gestion des points de fidélité
- 📈 Analyse des performances

### Pour les Administrateurs
- 👥 Gestion des utilisateurs
- 🏪 Gestion des commerçants
- 📊 Statistiques globales
- ⚙️ Configuration du système

## 📂 Structure du Projet

```
fidelipark-mobile/
├── src/
│   ├── assets/          # Images, icônes, fonts
│   ├── components/      # Composants réutilisables
│   ├── screens/         # Écrans de l'app
│   ├── navigation/      # Configuration navigation
│   ├── services/        # Services (API, Auth...)
│   ├── store/           # State management
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilitaires
│   ├── constants/       # Constantes
│   └── theme/           # Thème React Native Paper
├── .env                 # Variables d'environnement
├── app.json             # Configuration Expo
├── babel.config.js      # Configuration Babel
├── package.json         # Dépendances
└── README.md
```

## 🔧 Configuration

### Variables d'Environnement (.env)

```env
API_URL=http://votre-serveur:3000
CAS_URL=https://fidelipark.fr/cas
GOOGLE_MAPS_API_KEY=votre_cle
```

## 🎨 UI Components (React Native Paper)

```javascript
import { Button, Card, TextInput } from 'react-native-paper';
```

Documentation: https://reactnativepaper.com/

## 📱 Build & Déploiement

### Android (APK)

```bash
npm run build:android
```

### iOS (IPA)

```bash
npm run build:ios
```

## 📄 Licence

Projet académique - BUT RT3 2025-2026
IUT de La Réunion

## 📞 Contact

- Brice BERNARDIN - b.bernardin@rt-iut.re
- Killian DENA - k.dena@rt-iut.re

---

**Fait avec ❤️ à La Réunion**
