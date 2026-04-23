import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function HistoryParcelCard({ parcel, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.leadingIconWrap}>
        <Ionicons name="checkmark-circle-outline" size={22} color={Colors.green} />
      </View>

      <View style={styles.details}>
        <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
        <Text style={styles.routeText}>
          {parcel.fromName} -{">"} {parcel.toName}
        </Text>
        <Text style={styles.timeText}>Delivered on {parcel.eta?.label || "time unavailable"}</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Delivered</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.9,
  },
  leadingIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E9F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  trackingNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 3,
  },
  routeText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 3,
  },
  timeText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#95D7AF",
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: Colors.green,
    fontWeight: "700",
    fontSize: 14,
  },
});
