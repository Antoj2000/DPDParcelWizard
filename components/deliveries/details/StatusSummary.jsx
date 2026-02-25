import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function StatusSummary() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.statusIcon}>
          <Ionicons name="cube-outline" size={18} color={Colors.dpdRed} />
        </View>

        <View style={styles.textCol}>
          <Text style={styles.statusTitle}>Out for Delivery</Text>
          <Text style={styles.etaText}>Today, 2:00pm - 4:00pm</Text>
        </View>
      </View>
      <View style={styles.trackingBlock}>
        <Text style={styles.trackingLabel}>Tracking Number</Text>
        <Text style={styles.trackingNumber}>123456789</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,

    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFEFF4",
    alignItems: "center",
    justifyContent: "center",
  },

  textCol: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.darkText,
    marginBottom: 4,
  },

  etaText: {
    fontSize: 13,
    color: "#6B7280",
  },
  trackingBlock: {
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#FFF5F7",
    alignItems: "center",
  },
  trackingLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },

  trackingNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.dpdRed,
    letterSpacing: 0.5,
  },
});
