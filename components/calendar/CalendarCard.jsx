import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import MonthHeader from "./MonthHeader";
import WeekdayRow from "./WeekdayRow";
import DaysGrid from "./DaysGrid";

export default function CalendarCard({
  monthLabel,
  onPrevMonth,
  onNextMonth,
  days,
  selectedDate,
  onSelectDate,
}) {
  return (
    <View style={styles.calendarCard}>
      <Text style={styles.sectionTitle}>Delivery Schedule</Text>
      <MonthHeader
        monthLabel={monthLabel}
        onPrev={onPrevMonth}
        onNext={onNextMonth}
      />
      <WeekdayRow />
      <DaysGrid
        days={days}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
  },
});
