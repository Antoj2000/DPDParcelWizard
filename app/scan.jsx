import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import useAccount from "@/src/hooks/useAccount";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const router = useRouter();
  const { account } = useAccount();

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera access</Text>
      </View>
    );
  }

  const userName =
    [account?.firstName, account?.lastName].filter(Boolean).join(" ") || "User";

  const accountNumber = account?.id || "Unknown";

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={
          scanned
            ? undefined
            : () => {
                setScanned(true);
                Alert.alert(
                  "Account " + accountNumber,
                  userName + ", your locker number is #47",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        router.replace("/(tabs)/deliveries");
                      },
                    },
                  ],
                  { cancelable: false },
                );
              }
        }
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>Scan QR Code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },

  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
