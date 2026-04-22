import { StyleSheet, Text, View } from "react-native";

export default function SectionHeader({ title, icon, iconBg, count }) {
  return (
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.count}>{count} Parcels</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F2937",
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  count: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
});
