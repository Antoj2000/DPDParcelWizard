import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import { Colors } from "@/constants/colors";

export default function ActionButtonsRow({
  onEdit,
  onDelete,
  item,
  isDefault,
  onSetDefault,
}) {
  return (
    <View style={styles.row}>
      {!isDefault && (
        <View style={styles.editButton}>
          <IconButton
            icon="checkmark-circle-outline"
            color={Colors.dpdRed}
            size={18}
            onPress={() => onSetDefault(item)}
            label="Set as Default"
          />
        </View>
      )}
      <View style={styles.editButton}>
        <IconButton
          icon="create-outline"
          color={Colors.dpdRed}
          size={18}
          onPress={() => onEdit(item)}
          label="Edit"
        />
      </View>
      <View style={styles.deleteButton}>
        <IconButton
          icon="trash-outline"
          color={Colors.dpdRed}
          size={18}
          onPress={() => onDelete(item)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },

  editButton: {
    flex: 0.7,
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
    flex: 0.3,
    marginVertical: 4,
    paddingVertical: 2,
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
