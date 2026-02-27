import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function FormFooter({ onCancel, onSubmit }) {
  return (
    <View style={styles.footer}>
      <Pressable onPress={onCancel} style={styles.cancelBtn}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>

      <Pressable onPress={onSubmit} style={styles.saveBtn}>
        <Ionicons name="checkmark" size={18} color="#fff" />
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 14,
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#EFEFF3",
    backgroundColor: Colors.background,
  },

  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.darkText,
  },

  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.dpdRed,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  saveText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
  },
});
