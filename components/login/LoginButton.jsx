import { StyleSheet, Text, Pressable } from "react-native";
import { Colors } from "@/constants/colors";

export default function LoginButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dpdRed,
    minHeight: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    backgroundColor: "#d9d6dc",
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  disabledText: {
    color: "#8c8893",
  },
});
