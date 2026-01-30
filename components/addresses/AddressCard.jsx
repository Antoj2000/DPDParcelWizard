import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "@/components/ui/IconButton";

export default function AddressCard({ address, onEdit, onDelete }) {
  const {
    id,
    title,
    line1,
    line2,
    line3,
    line4,
    eircode,
    type = "home",
    isDefault = false,
  } = address;

  const iconName =
    type === "work"
      ? "briefcase-outline"
      : type === "other"
        ? "location-outline"
        : "home-outline";

  return (
    <View style={styles.card}>
      <View style={styles.topContainerRow}>
        <View style={styles.colIcon}>
          <Ionicons name={iconName} size={24} color={Colors.dpdRed} />
        </View>
        <View style={styles.colAddress}>
          <Text style={styles.title}>
            {title} {isDefault && "Default"}
          </Text>
          <Text style={styles.subtitle}>{line1}</Text>
          <Text style={styles.subtitle}>{line3}</Text>
          <Text style={styles.subtitle}>{line4}</Text>
          <Text style={styles.eircode}>{eircode}</Text>
        </View>
      </View>

      <View style={styles.bottomContainerRow}>
        <View style={styles.editButton}>
          <IconButton
            icon="create-outline"
            color={Colors.dpdRed}
            size={20}
            onPress={() => onEdit(id)}
            label="Edit"
          />
        </View>
        <View style={styles.deleteButton}>
          <IconButton
            icon="trash-outline"
            color={Colors.dpdRed}
            size={20}
            onPress={() => onDelete(id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.bg500,
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topContainerRow: {
    flexDirection: "row",
    marginBottom: 8,
    padding: 8,
    borderBottomColor: Colors.mutedText,
    borderBottomWidth: 2,
  },
  colIcon: {
    flexDirection: "column",
    height: 35,
    padding: 4,
    borderRadius: 6,
    backgroundColor: Colors.bgIcon,
  },
  colAddress: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  eircode: {
    fontSize: 14,
    color: Colors.dpdRed,
  },
  bottomContainerRow: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    flex: 1,
    marginVertical: 4,
    paddingVertical: 2,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    flex: 0.35,
    marginVertical: 4,
    padding: 4,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
