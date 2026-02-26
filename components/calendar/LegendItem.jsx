import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function LegendItem({ symbol, label, dot }) {
  return (
    <View style={styles.item}>
      {dot ? (
        <View style={styles.dot} />
      ) : (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{symbol}</Text>
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flex: 1,
  },

  badge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.dpdRed,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  badgeText: {
    color: Colors.dpdRed,
    fontSize: 14,
    fontWeight: "700",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dpdRed,
    marginRight: 16, 
  },

  label: {
    fontSize: 14,
    color: "#4B5563", 
    flexShrink: 1,
  },
});
