import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotificationActionBar({ onMarkAllRead, onClearAll }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onMarkAllRead}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={18}
          color={Colors.darkText}
        />
        <Text style={styles.btnText}>Mark All Read</Text>
      </Pressable>

      <Pressable
        onPress={onClearAll}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <Ionicons name="trash-outline" size={18} color={Colors.dpdRed} />
        <Text style={[styles.btnText, styles.btnTextDanger]}>Clear All</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  pressed: {
    opacity: 0.75,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkText,
  },
  btnTextDanger: {
    color: Colors.dpdRed,
  },
});
