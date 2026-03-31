import { useMemo, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/colors";
import {
  buildCalendarDays,
  startOfMonth,
  addMonths,
  formatMonthLabel,
} from "@/utils/date";
import CalendarLegend from "@/components/calendar/CalendarLegend";
import CalendarCard from "@/components/calendar/CalendarCard";
import SelectDatesCard from "@/components/calendar/schedule/SelectDatesCard";

import useParcels from "@/src/hooks/useParcels";

export default function CalendarScreen() {
  const today = useMemo(() => new Date(), []); //Memo to avoid re-creating date object on every render

  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

  const { parcels } = useParcels();

  const deliveryDates = useMemo(() => {
    return new Set(
      parcels
        .filter((parcel) => parcel.expectedAt)
        .map((parcel) => parcel.expectedAt),
    );
  }, [parcels]);

  const days = useMemo(
    () => buildCalendarDays(visibleMonth, today),
    [visibleMonth, today],
  );

  const monthLabel = useMemo(
    () => formatMonthLabel(visibleMonth, "en-IE"),
    [visibleMonth],
  );

  const onPrevMonth = () => {
    setVisibleMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1),
    );
  };

  const onNextMonth = useCallback(() => {
    setVisibleMonth((m) => addMonths(m, 1));
  }, []);

  const onSelectDate = (date, inMonth) => {
    setSelectedDate(date);
    if (!inMonth) {
      setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

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
