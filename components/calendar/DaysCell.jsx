import { Colors } from "@/constants/colors";
import { formatDateKey, isSameDay } from "@/utils/date";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function DaysCell({
  item,
  selectedDate,
  onPress,
  deliveryDates,
  scheduleMap,
  selectedDates,
  isSelectingSchedule = false,
}) {
  const isSelected = useMemo(
    () => isSameDay(item.date, selectedDate),
    [item.date, selectedDate],
  );

  // Create a key for deliveryDates and scheduleMap based on the date (e.g., "2024-09-01")
  const dateKey = useMemo(() => {
    return formatDateKey(item.date);
  }, [item.date]);

  const hasDelivery = item.inMonth && deliveryDates?.has(dateKey);
  const scheduleSymbol = scheduleMap?.get(dateKey);

  // Determine if this date is selected for schedule creation
  const isSelectedForSchedule = useMemo(() => {
    if (!isSelectingSchedule || !selectedDates) {
      return false;
    }

    // Check if this date is in the selectedDates array
    return selectedDates.some((date) => isSameDay(date, item.date));
  }, [isSelectingSchedule, selectedDates, item.date]);

  const isPastInScheduleMode = useMemo(() => {
    if (!isSelectingSchedule) {
      return false;
    }

    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const itemStart = new Date(
      item.date.getFullYear(),
      item.date.getMonth(),
      item.date.getDate(),
    );

    return itemStart < todayStart;
  }, [isSelectingSchedule, item.date]);

  return (
    <View style={styles.cell}>
      <Pressable
        onPress={() => onPress(item.date, item.inMonth)}
        disabled={isPastInScheduleMode}
        style={({ pressed }) => [
          styles.pressable,
          isPastInScheduleMode && styles.disabledPressable,
          pressed && !isPastInScheduleMode && styles.pressed,
        ]}
      >
        <View style={styles.content}>
          {scheduleSymbol ? (
            <View style={styles.scheduleBadge}>
              <Text style={styles.scheduleBadgeText}>{scheduleSymbol}</Text>
            </View>
          ) : null}
          <View
            style={[
              styles.circle,
              item.isToday && styles.todayCircle,
              isSelected && styles.selectedCircle,
              isSelectedForSchedule && styles.scheduleSelectCircle,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                !item.inMonth && styles.mutedText,
                item.isToday && styles.todayText,
                isSelected && styles.selectedText,
                isSelectedForSchedule && styles.scheduleSelectText,
                isPastInScheduleMode && styles.pastDateText,
              ]}
            >
              {item.day}
            </Text>
          </View>
          {hasDelivery ? <View style={styles.deliveryDot} /> : null}
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
  disabledPressable: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    width: 36,
    height: 36,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
  pastDateText: {
    color: "#9CA3AF",
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
  scheduleSelectCircle: {
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    backgroundColor: Colors.mutedRed,
  },
  scheduleSelectText: {
    color: Colors.dpdRed,
  },
  deliveryDot: {
    position: "absolute",
    bottom: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dpdRed,
  },
  scheduleBadge: {
    position: "absolute",
    top: -2,
    left: -2,
    minWidth: 12,
    height: 12,
    paddingHorizontal: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  scheduleBadgeText: {
    fontSize: 8,
    lineHeight: 9,
    fontWeight: "700",
    color: Colors.dpdRed,
  },
});
