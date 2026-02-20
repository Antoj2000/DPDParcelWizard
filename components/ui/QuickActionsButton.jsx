import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function QuickActionsButton({ icon, label, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color={Colors.dpdRed} />
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f7f7f7",
    width: 90,
    height: 110,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",

   
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  pressed: {
    opacity: 0.7,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.iconPink, // soft red tint
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkText,
  },
});
