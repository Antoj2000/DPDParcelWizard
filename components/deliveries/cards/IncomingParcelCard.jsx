import { Colors } from "@/constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import IconRow from "./IconRow";

export default function IncomingParcelCard({ parcel, onPress, onManagePress }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.topArea, pressed && styles.pressed]}
      >
        <View style={styles.parcelIcon}>
          <Ionicons name="cube-outline" size={18} color={Colors.dpdRed} />
        </View>

        <View style={styles.details}>
          <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{parcel.statusDisplay}</Text>
          </View>

          <Text style={styles.lineText}>From: {parcel.fromName}</Text>
          <Text style={styles.lineText}>To: {parcel.toName}</Text>
        </View>
      </Pressable>

      <View style={styles.metaWrap}>
        <IconRow
          icon={<Feather name="calendar" size={14} color={Colors.mutedText} />}
          text={parcel.eta?.label || "Upcoming"}
        />
        <IconRow
          icon={
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.mutedText}
            />
          }
          text={parcel.address?.line1 || "Address unavailable"}
        />
      </View>

      <Pressable
        onPress={onManagePress}
        style={({ pressed }) => [
          styles.manageButton,
          pressed && styles.pressed,
        ]}
      >
        <Feather name="edit-2" size={16} color={Colors.mutedText} />
        <Text style={styles.manageText}>Manage Parcel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    padding: 14,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  topArea: {
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.88,
  },
  parcelIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FDEBEC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  trackingNumber: {
    fontSize: 32 / 2,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  statusPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#F7A3B3",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FDEFF2",
    marginBottom: 10,
  },
  statusText: {
    color: Colors.dpdRed,
    fontSize: 16,
    fontWeight: "600",
  },
  lineText: {
    color: Colors.mutedText,
    fontSize: 16,
    lineHeight: 26,
  },
  metaWrap: {
    marginTop: 6,
    marginBottom: 10,
  },
  manageButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E7E7EA",
    backgroundColor: "#F7F7F9",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  manageText: {
    color: "#969AA4",
    fontSize: 17,
    fontWeight: "700",
  },
});
