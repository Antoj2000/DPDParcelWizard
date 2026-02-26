import { StyleSheet, Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, color, size, onPress, label, style, textStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,        //fills parent container 
        style,                   
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
        {label && <Text style={textStyle}>{label}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
   pressable: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    gap: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
