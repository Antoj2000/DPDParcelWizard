import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/colors";

import CalendarLegend from "@/components/calendar/CalendarLegend";
import CalendarCard from "@/components/calendar/CalendarCard";
import SelectDatesCard from "@/components/calendar/schedule/SelectDatesCard";

import useCalendarScreen from "@/src/hooks/useCalendarScreen";

export default function CalendarScreen() {
  const {
    selectedDate,
    monthLabel,
    days,
    deliveryDates,
    onPrevMonth,
    onNextMonth,
    onSelectDate,
  } = useCalendarScreen();

  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

  function toggleCreateSchedule() {
    setIsCreatingSchedule((prev) => !prev);
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isCreatingSchedule ? (
          <SelectDatesCard
            onClose={toggleCreateSchedule}
            selectedDates={[selectedDate]}
          />
        ) : (
          <View style={styles.createButton}>
            <IconButton
              icon="add"
              size={24}
              color="white"
              label="Create Delivery Schedule"
              textStyle={styles.createButtonText}
              onPress={toggleCreateSchedule}
            />
          </View>
        )}
        <CalendarCard
          monthLabel={monthLabel}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          days={days}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          deliveryDates={deliveryDates}
        />
        <CalendarLegend />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },

  createButton: {
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: Colors.dpdRed,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
