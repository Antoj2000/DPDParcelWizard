import { Colors } from "@/constants/colors";
import { useEffect, useRef } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";

export default function TrackingBox({ value, onChangeText, onSubmit, isOpen }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur();
      Keyboard.dismiss();
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search tracking number..."
          placeholderTextColor="#777"
          keyboardType="number-pad"
          autoCorrect={false}
          returnKeyType="search"
          maxLength={9}
          onSubmitEditing={onSubmit}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dpdRed,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: {
    fontSize: 15,
    color: "#000",
  },
});
