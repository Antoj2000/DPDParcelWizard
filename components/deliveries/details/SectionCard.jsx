import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function SectionCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,

    borderWidth: 1,
    borderColor: "#F2F2F2",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.darkText,
    marginBottom: 12,
  },
});
