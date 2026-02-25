import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={16} color={Colors.dpdRed} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFF1F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkText,
    lineHeight: 20,
  },

  divider: {
    position: "absolute",
    bottom: 0,
    left: 48,
    right: 0,
    height: 1,
    backgroundColor: "#F2F2F2",
  },
});
