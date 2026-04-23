import { Colors } from "@/constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import IconRow from "./IconRow";

export default function IncomingParcelCard({
  parcel,
  onPress,
  onManagePress,
  canManage = true,
}) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.topArea, pressed && styles.pressed]}
      >
        <View style={styles.parcelIcon}>
          <Ionicons name="cube-outline" size={22} color={Colors.dpdRed} />
        </View>

        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{parcel.statusDisplay}</Text>
            </View>
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
        disabled={!canManage}
        onPress={onManagePress}
        style={({ pressed }) => [
          styles.manageButton,
          !canManage && styles.manageButtonDisabled,
          pressed && canManage && styles.pressed,
        ]}
      >
        <Feather
          name="edit-2"
          size={16}
          color={canManage ? Colors.dpdRed : Colors.mutedText}
        />
        <Text
          style={[styles.manageText, !canManage && styles.manageTextDisabled]}
        >
          {canManage ? "Manage Parcel" : "Cannot Manage (Less than 2 days)"}
        </Text>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
    gap: 4,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
  },
  statusPill: {
    borderWidth: 1,
    borderColor: "#F7A3B3",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FDEFF2",
  },
  statusText: {
    color: Colors.dpdRed,
    fontSize: 14,
    fontWeight: "600",
  },
  lineText: {
    color: Colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  metaWrap: {
    marginTop: 6,
    marginBottom: 8,
  },
  manageButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3B6C1",
    backgroundColor: "#FDEFF2",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  manageButtonDisabled: {
    borderColor: "#E7E7EA",
    backgroundColor: "#F7F7F9",
  },
  manageText: {
    color: Colors.dpdRed,
    fontSize: 12,
    fontWeight: "700",
  },
  manageTextDisabled: {
    color: "#969AA4",
  },
});
