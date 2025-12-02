import { useDeliveries } from "@/src/hooks/useDelivery";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DeliveriesHomeScreen() {
  const { deliveries } = useDeliveries();

  // Compute stats from real delivery types
  const todayCount = deliveries.filter(
    d => d.status === "OutForDelivery"
  ).length;

  const inTransitCount = deliveries.filter(
    d => d.status === "InTransit"
  ).length;

  const deliveredCount = deliveries.filter(
    d => d.status === "Delivered"
  ).length;

  return (
    <ScrollView style={styles.container}>
      {/* Welcome / Hero Box */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroSubtitle}>Welcome back, Anthony</Text>
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heroCard: {
    marginTop: 50,
    backgroundColor: "#FF0000", 
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
    color: "rgba(255,255,255,0.85)",
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
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
  },
});
