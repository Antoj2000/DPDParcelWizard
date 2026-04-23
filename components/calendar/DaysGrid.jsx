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
  scheduleMode = "single",
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
          scheduleMode={scheduleMode}
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
