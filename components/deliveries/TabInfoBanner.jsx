import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TabInfoBanner({
  icon,
  title,
  subtitle,
  iconColor,
  iconBg,
}) {
  return (
    <Pressable style={styles.card}>
      <View
        style={[styles.iconCircle, { backgroundColor: iconBg || "#FDEBEC" }]}
      >
        <Ionicons name={icon} size={20} color={iconColor || Colors.dpdRed} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F3B6C1",
    backgroundColor: "#FDEFF2",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dpdRed,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mutedText,
    lineHeight: 22,
  },
});
