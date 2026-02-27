import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function FormHeader({
  icon = "create-outline",
  title,
  subtitle,
  onClose,
}) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={Colors.dpdRed} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {onClose && (
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={20} color={Colors.darkText} />
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFF3",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.iconPink,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.darkText,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#666",
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
});
