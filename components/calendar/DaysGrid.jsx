import { StyleSheet, View } from "react-native";
import DaysCell from "./DaysCell";

export default function DaysGrid({
  days = [],
  selectedDate,
  onSelectDate,
  deliveryDates,
  scheduleMap,
  selectedDates,
  isSelectingSchedule = false,
}) {
  return (
    <View style={styles.daysGrid}>
      {days.map((day) => (
        <DaysCell
          key={`${day.date.toISOString()}-${day.inMonth}`}
          item={day}
          selectedDate={selectedDate}
          onPress={onSelectDate}
          deliveryDates={deliveryDates}
          scheduleMap={scheduleMap}
          selectedDates={selectedDates}
          isSelectingSchedule={isSelectingSchedule}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
});
