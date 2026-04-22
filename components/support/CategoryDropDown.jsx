import { Ionicons } from "@expo/vector-icons";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function IssueCategoryDropdown({
  label = "Issue Category *",
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  placeholder = "Select a category...",
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={styles.categoryField}
        onPress={() => {
          Keyboard.dismiss();
          onToggle?.();
        }}
      >
        <Text style={[styles.categoryText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.darkText}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.categoryList}>
          {options.map((option) => (
            <Pressable
              key={option}
              style={styles.categoryOption}
              onPress={() => onSelect?.(option)}
            >
              <Text style={styles.categoryOptionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "black",
    marginBottom: 6,
    fontWeight: "600",
  },
  categoryField: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 16,
    color: Colors.darkText,
  },
  placeholderText: {
    color: "#8B8B8B",
  },
  categoryList: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
    backgroundColor: "white",
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  categoryOptionText: {
    fontSize: 15,
    color: Colors.darkText,
  },
});