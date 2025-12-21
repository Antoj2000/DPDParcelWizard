import { StyleSheet, Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, color, size, onPress, label }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
        {label && <Text>{label}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
