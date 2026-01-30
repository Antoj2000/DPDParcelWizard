import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Input({
  label,
  value,
  placeholder,
  keyboardType,
  style,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "black",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
});
