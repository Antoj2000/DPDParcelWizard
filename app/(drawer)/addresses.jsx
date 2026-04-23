import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddressScreen from "@/screens/AddressScreen";

export default function DrawerAddresses() {
  const router = useRouter();

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(tabs)/deliveries");
  }

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#111827" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title}>Address Book</Text>
      </View>

      <AddressScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});
