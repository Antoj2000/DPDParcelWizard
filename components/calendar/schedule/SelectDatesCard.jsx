import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

import TextButton from "../../ui/TextButton";

export default function SelectDatesCard({ onClose, selectedDates }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Select Delivery Dates</Text>
          <Text style={styles.subtitle}>
            Tap dates on the calendar to select them
          </Text>
        </View>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={18} color="#6B7280" />
        </Pressable>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Selected:{" "} 
          {selectedDates
            ? selectedDates.map((d) => d.toLocaleDateString()).join(", ")
            : "None"}
        </Text>
      </View>

      <TextButton
        label="Continue to Schedule Details"
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  title: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
  },
  dateContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: Colors.darkText,
  },
  buttonContainer: {
    backgroundColor: Colors.dpdRed,
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
