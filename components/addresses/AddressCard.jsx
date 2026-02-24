import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "@/components/ui/IconButton";
import Pill from "@/components/ui/Pill";

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
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>

            {isDefault && (
              <View style={styles.pill}>
                <Pill label="Default" />
              </View>
            )}
          </View>

          <Text style={styles.subtitle}>{line1}</Text>
          <Text style={styles.subtitle}>{line3}</Text>
          <Text style={styles.subtitle}>{line4}</Text>
          <Text style={styles.eircode}>{eircode}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomContainerRow}>
        <View style={styles.editButton}>
          <IconButton
            icon="create-outline"
            color={Colors.dpdRed}
            size={18}
            onPress={() => onEdit(address)}
            label="Edit"
          />
        </View>
        <View style={styles.deleteButton}>
          <IconButton
            icon="trash-outline"
            color={Colors.dpdRed}
            size={18}
            onPress={() => onDelete(address)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  topContainerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  colIcon: {
    width: 44,
    height: 44,
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.iconPink,
  },
  colAddress: {
    flex: 1,
    paddingTop: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.darkText
  },
  pill: {
    transform: [{ translateY: 1 }],
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  eircode: {
    fontSize: 14,
    color: Colors.dpdRed,
  },
  divider: {
    height: 1,
    backgroundColor: "#000",
    marginTop: 14,
    marginBottom: 12,
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
