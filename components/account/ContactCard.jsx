import { StyleSheet, Text, View } from "react-native";
import Pill from "../ui/Pill";
import Divider from "../ui/Divider";
import IconButton from "../ui/IconButton";
import { Colors } from "@/constants/colors";
export default function ContactCard({ value, isPrimary, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.valueText}>{value}</Text>
      <View style={styles.badgeRow}>
        {isPrimary && <Pill label="Primary" />}
      </View>
      <Divider />
      <View style={styles.bottomContainerRow}>
        <View style={styles.editButton}>
          <IconButton
            icon="create-outline"
            color={Colors.dpdRed}
            size={18}
            onPress={onEdit}
            label="Edit"
          />
        </View>
        <View style={styles.deleteButton}>
          <IconButton
            icon="trash-outline"
            color={Colors.dpdRed}
            size={18}
            onPress={onDelete}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
    marginBottom: 10,
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
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
