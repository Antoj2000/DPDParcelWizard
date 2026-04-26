import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import TextButton from "../../ui/TextButton";

export default function SelectDatesCard({
  onClose,
  selectedDates,
  scheduleMode = "single",
  onContinue,
}) {
  const isRangeMode = scheduleMode === "range";
  const requiredCount = isRangeMode ? 2 : 1;
  const orderedDates = [...selectedDates].sort((a, b) => a - b);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Select Delivery Dates</Text>
          <Text style={styles.subtitle}>
            {isRangeMode
              ? "Range mode: select 2 future dates (start and end)."
              : "Single-day mode: select 1 future date."}
          </Text>
        </View>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={18} color="#6B7280" />
        </Pressable>
      </View>

      <Text style={styles.hint}>Past dates cannot be selected.</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Selected ({orderedDates.length}/{requiredCount}):{" "}
          {orderedDates.length > 0
            ? orderedDates.map((d) => d.toLocaleDateString()).join(", ")
            : "None"}
        </Text>
      </View>

      {orderedDates.length !== requiredCount ? (
        <Text style={styles.validationHint}>
          {isRangeMode
            ? "Pick exactly two dates for this range."
            : "Pick a starting date to proceed."}
        </Text>
      ) : null}

      <TextButton
        label="Continue to Schedule Details"
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={onContinue}
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
  hint: {
    marginBottom: 8,
    fontSize: 13,
    color: "#4B5563",
  },
  dateContainer: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: Colors.darkText,
  },
  validationHint: {
    marginBottom: 10,
    fontSize: 13,
    color: Colors.dpdRed,
    fontWeight: "600",
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
