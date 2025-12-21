import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Input({label}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: "black",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
