import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ICON_VARIANTS = {
  pink: { bg: "#FDEBEC", color: Colors.dpdRed },
  blue: { bg: "#E8F0FE", color: "#3B72F6" },
  green: { bg: "#E9F7EF", color: Colors.green },
};

export default function NotificationCard({ notification, onPress, onDelete }) {
  const variant = ICON_VARIANTS[notification.iconVariant] ?? ICON_VARIANTS.pink;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        !notification.isRead && styles.cardUnread,
        pressed && styles.pressed,
      ]}
    >
      {/* Leading icon */}
      <View style={[styles.iconCircle, { backgroundColor: variant.bg }]}>
        <Ionicons
          name={notification.iconName}
          size={20}
          color={variant.color}
        />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.timeLabel}>{notification.timeLabel}</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{notification.parcelTracking}</Text>
          </View>

          <Pressable
            onPress={onDelete}
            hitSlop={8}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.dpdRed} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  cardUnread: {
    borderColor: "#F3B6C1",
    backgroundColor: "#FFFAFB",
  },
  pressed: {
    opacity: 0.85,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: Colors.dpdRed,
    flexShrink: 0,
  },
  message: {
    fontSize: 14,
    color: Colors.mutedText,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeLabel: {
    fontSize: 13,
    color: Colors.mutedText,
  },
  chip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
});
