import { useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { isSameDay } from "@/utils/date";
import { Colors } from "@/constants/colors";
export default function DaysCell({ item, selectedDate, onPress }) {
  const isSelected = useMemo(
    () => isSameDay(item.date, selectedDate),
    [item.date, selectedDate],
  );

  return (
    <View style={styles.cell}>
      <Pressable
        onPress={() => onPress(item.date, item.inMonth)}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        <View
          style={[
            styles.circle,
            item.isToday && styles.todayCircle,
            isSelected && styles.selectedCircle,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              !item.inMonth && styles.mutedText,
              item.isToday && styles.todayText,
              isSelected && styles.selectedText,
            ]}
          >
            {item.day}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  cell: {
    width: "14.285%", // 100 / 7
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  mutedText: {
    color: "#9CA3AF",
    fontWeight: "500",
  },

  todayCircle: {
    borderWidth: 1,
    borderColor: Colors.mutedRed,
    backgroundColor: Colors.mutedRed,
  },
  todayText: {
    color: "#111827",
  },

  selectedCircle: {
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    backgroundColor: Colors.dpdRed,
  },
  selectedText: {
    color: "white",
  },
});
