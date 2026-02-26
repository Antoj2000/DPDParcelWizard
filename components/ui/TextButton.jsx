import { StyleSheet, Pressable, View, Text } from "react-native";

export default function TextButton({ onPress, label, style, textStyle, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable, //fills parent container
        style,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.buttonContainer}>
        <Text style={textStyle}>{label}</Text>
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
  },
  pressed: {
    opacity: 0.7,
  },
});
