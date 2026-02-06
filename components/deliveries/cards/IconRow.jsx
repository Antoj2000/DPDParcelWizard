import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function IconRow({ icon, text }) {
  return (
    <View style={styles.row}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  text: {
    marginLeft: 6,
    fontSize: 13,
    color: "#6B7280",
    flexShrink: 1,
  },
});
