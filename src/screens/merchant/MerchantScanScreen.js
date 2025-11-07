// src/screens/merchant/MerchantScanScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Surface, ActivityIndicator } from 'react-native-paper';
import { CameraView, Camera } from 'expo-camera/next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MerchantScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanning(false);

    try {
      const qrData = JSON.parse(data);
      console.log('QR Code scanné:', qrData);

      // TODO: Vérifier avec PayByPhone API
      // TODO: Valider la réservation de parking
      // TODO: Afficher les détails du client

      Alert.alert(
        '✅ QR Code scanné',
        `Client ID: ${qrData.userId}\nOffre ID: ${qrData.offerId}`,
        [
          {
            text: 'Valider',
            onPress: () => {
              // TODO: Implémenter la validation
              Alert.alert('Succès', 'Points attribués au client !');
              setScanned(false);
              setScanning(true);
            },
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => {
              setScanned(false);
              setScanning(true);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'QR Code invalide');
      setScanned(false);
      setScanning(true);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2CB76E" />
        <Text style={styles.loadingText}>Chargement de la caméra...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="camera-off" size={64} color="#E53935" />
        <Text style={styles.errorTitle}>Accès à la caméra refusé</Text>
        <Text style={styles.errorText}>
          Vous devez autoriser l'accès à la caméra pour scanner les QR codes
        </Text>
        <Button
          mode="contained"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
          style={styles.permissionButton}
        >
          Autoriser la caméra
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scanner QR Code</Text>
        <Text style={styles.headerSubtitle}>
          Scannez le QR code du client pour valider
        </Text>
      </View>

      {/* Scanner */}
      {scanning ? (
        <View style={styles.scannerContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            style={styles.camera}
          />

          {/* Overlay de scan */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
          </View>

          <Surface style={styles.instructionCard} elevation={4}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#2CB76E" />
            <Text style={styles.instructionText}>
              Placez le QR code dans le cadre
            </Text>
          </Surface>
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2CB76E" />
          <Text style={styles.processingText}>Traitement...</Text>
        </View>
      )}

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Surface style={styles.instructionItem} elevation={1}>
          <MaterialCommunityIcons name="numeric-1-circle" size={24} color="#2CB76E" />
          <Text style={styles.instructionItemText}>
            Le client présente son QR code
          </Text>
        </Surface>

        <Surface style={styles.instructionItem} elevation={1}>
          <MaterialCommunityIcons name="numeric-2-circle" size={24} color="#2CB76E" />
          <Text style={styles.instructionItemText}>Scannez le QR code</Text>
        </Surface>

        <Surface style={styles.instructionItem} elevation={1}>
          <MaterialCommunityIcons name="numeric-3-circle" size={24} color="#2CB76E" />
          <Text style={styles.instructionItemText}>
            Validez la réservation parking
          </Text>
        </Surface>

        <Surface style={styles.instructionItem} elevation={1}>
          <MaterialCommunityIcons name="numeric-4-circle" size={24} color="#2CB76E" />
          <Text style={styles.instructionItemText}>
            Attribuez les points au client
          </Text>
        </Surface>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#2CB76E',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#2CB76E',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructionCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  instructionsContainer: {
    padding: 15,
    gap: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    gap: 15,
  },
  instructionItemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2CB76E',
    fontWeight: '600',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  permissionButton: {
    marginTop: 10,
    borderRadius: 10,
  },
});

export default MerchantScanScreen;