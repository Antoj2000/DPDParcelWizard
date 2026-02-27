import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

import Pill from "@/components/ui/Pill";
import Divider from "../ui/Divider";
import ActionButtonsRow from "../ui/ActionButtonsRow";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
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
    <View
      style={[
        styles.card,
        isDefault && {
          backgroundColor: Colors.softPink,
          borderColor: Colors.dpdRed,
        },
      ]}
    >
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

      <Divider />

      <ActionButtonsRow
        onEdit={onEdit}
        onDelete={onDelete}
        item={address}
        isDefault={isDefault}
        onSetDefault={onSetDefault}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 14,
    borderRadius: 8,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: "#EFEFF3",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
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
    marginBottom: 8,
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
    color: Colors.darkText,
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
});
