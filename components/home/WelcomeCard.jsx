import { View, Text, StyleSheet } from "react-native";
import useParcels from "@/src/hooks/useParcels";
import useAccount from "@/src/hooks/useAccount";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function WelcomeCard() {
  const { parcels } = useParcels();
  const { account } = useAccount();

  // Compute stats from real delivery types
  const todayCount = parcels.filter(
    (d) => d.status === "OUT_FOR_DELIVERY",
  ).length;

  const inTransitCount = parcels.filter(
    (d) => d.status === "IN_TRANSIT",
  ).length;

  const deliveredCount = parcels.filter((d) => d.status === "DELIVERED").length;

  return (
    <View style={styles.heroCard}>
      <View style={styles.heroHeader}>
        <View>
          <Text style={styles.heroSubtitle}>
            Welcome back, {account.firstName}
          </Text>
          <Text style={styles.heroTitle}>Your Deliveries</Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons name="cube-outline" size={30} color="#fff" />
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{todayCount}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{inTransitCount}</Text>
          <Text style={styles.statLabel}>In Transit</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{deliveredCount}</Text>
          <Text style={styles.statLabel}>Delivered</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: Colors.dpdRed,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "#F9F9F9",
    fontSize: 14,
    marginBottom: 4,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  iconCircle: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    color: "#F9F9F9",
    fontSize: 12,
  },
});
