import { StyleSheet, Text, View, TextInput } from "react-native";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, placeholder, style, textInputConfig },
  ref,
) {
  return (
    <View style={styles.inputContainer}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor="#88888844"
        {...textInputConfig}
      />
    </View>
  );
});

export default Input;

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
