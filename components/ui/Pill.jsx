import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
export default function Pill({ children }) {
  return (
    <View style={styles.pillPrimary}>
      <Text style={styles.pillPrimaryText}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  pillPrimary: {
    backgroundColor: Colors.dpdRed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  pillPrimaryText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
