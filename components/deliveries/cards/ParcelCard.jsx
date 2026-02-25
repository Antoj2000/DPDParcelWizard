import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import IconRow from "../cards/IconRow";
import Pill from "../../ui/Pill";

export default function ParcelCard({ parcel, status, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardContent}>
        <View style={styles.parcelIcon}>
          <Ionicons name="cube-outline" size={18} color={Colors.dpdRed} />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.trackingNumber}>{parcel.trackingNumber}</Text>
          <Text style={styles.recipient}>{parcel.toName}</Text>
          <IconRow
            icon={
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.mutedText}
              />
            }
            text={
              parcel.address.line1 +
              ", " +
              parcel.address.line3 +
              ", " +
              parcel.address.line4 +
              ", " +
              parcel.address.eircode
            }
          />
          <IconRow
            icon={<Feather name="clock" size={14} color={Colors.mutedText} />}
            text={parcel.eta.label}
          />
        </View>

        <View style={styles.cardActions}>
          <Pill label={parcel.statusDisplay} />
          <Ionicons name="chevron-forward" size={18} color={Colors.mutedText} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  cardPressed: { opacity: 0.9 },
  cardContent: {
    flexDirection: "row",
    padding: 14,
  },
  parcelIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FDEBEC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  trackingNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  recipient: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  cardActions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
