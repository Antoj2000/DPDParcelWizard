import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function AccountDropdown({
  title,
  subtitle,
  icon,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color={Colors.dpdRed} />
          </View>

          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#6B7280"
        />
      </Pressable>

      {isOpen && (
        <View style={styles.body}>
          <View style={styles.divider} />
          {children}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  header: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pressed: {
    opacity: 0.85,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.iconPink,
    alignItems: "center",
    justifyContent: "center",
  },

  titleWrap: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.mutedText,
  },

  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 12,
  },
});
