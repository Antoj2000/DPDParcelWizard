import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function MenuRow({
  label,
  icon,
  onPress,
  danger = false,
  showChevron = true,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={22} color={Colors.dpdRed} />
        </View>
        <Text style={[styles.label, danger && styles.labelDanger]}>{label}</Text>
      </View>

      {showChevron ? (
        <Ionicons name="chevron-forward" size={22} color={Colors.greyText} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 6,
  },
  pressed: {
    opacity: 0.75,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.iconPink,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#333",
    fontSize: 17,
    fontWeight: "500",
  },
  labelDanger: {
    color: Colors.dpdRed,
  },
});