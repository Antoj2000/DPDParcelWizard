import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CalendarCard from "@/components/calendar/CalendarCard";
import CalendarLegend from "@/components/calendar/CalendarLegend";
import ScheduleDetailsCard from "@/components/calendar/schedule/ScheduleDetailsCard";
import SelectDatesCard from "@/components/calendar/schedule/SelectDatesCard";
import ParcelCard from "@/components/deliveries/cards/ParcelCard";
import IconButton from "@/components/ui/IconButton";

import useCalendarScreen from "@/src/hooks/useCalendarScreen";
import useSchedules from "@/src/hooks/useSchedules";
import { isSameDay } from "@/utils/date";

export default function CalendarScreen() {
  const {
    selectedDate,
    monthLabel,
    days,
    deliveryDates,
    onPrevMonth,
    onNextMonth,
    onSelectDate: onSelectDateHook,
    selectedDateParcels,
  } = useCalendarScreen();

  const { addSchedule, scheduleMap } = useSchedules();

  const router = useRouter();

  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const [scheduleMode, setScheduleMode] = useState("single");
  const [selectedScheduleDates, setSelectedScheduleDates] = useState([]);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);

  function isPastDate(date) {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const dateStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    return dateStart < todayStart;
  }

  function toggleCreateSchedule() {
    setIsCreatingSchedule((prev) => !prev);
    setScheduleMode("single");
    setSelectedScheduleDates([]);
    setShowScheduleDetails(false);
  }

  function handleSelectDate(date, inMonth) {
    if (isCreatingSchedule) {
      if (isPastDate(date)) {
        return;
      }

      setSelectedScheduleDates((prev) => {
        const exists = prev.some((d) => isSameDay(d, date));

        if (exists) {
          return prev.filter((d) => !isSameDay(d, date));
        }

        if (scheduleMode === "single") {
          return [date];
        }

        if (prev.length >= 2) {
          return prev;
        }

        return [...prev, date];
      });
    } else {
      onSelectDateHook(date, inMonth);
    }
  }

  function handleContinue() {
    if (selectedScheduleDates.length === 0) {
      return;
    }

    setShowScheduleDetails(true);
  }

  function handleModeChange(nextMode) {
    setScheduleMode(nextMode);

    if (nextMode === "single") {
      setSelectedScheduleDates((prev) => {
        if (prev.length <= 1) {
          return prev;
        }

        const ordered = [...prev].sort((a, b) => a - b);
        return [ordered[0]];
      });
    }
  }

  function handleSave(schedule) {
    addSchedule(schedule);
    setIsCreatingSchedule(false);
    setSelectedScheduleDates([]);
    setShowScheduleDetails(false);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isCreatingSchedule ? (
          showScheduleDetails ? (
            <ScheduleDetailsCard
              selectedDates={selectedScheduleDates}
              scheduleMode={scheduleMode}
              onModeChange={handleModeChange}
              onSave={handleSave}
              onCancel={() => setShowScheduleDetails(false)}
            />
          ) : (
            <SelectDatesCard
              onClose={toggleCreateSchedule}
              selectedDates={selectedScheduleDates}
              scheduleMode={scheduleMode}
              onContinue={handleContinue}
            />
          )
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
          onSelectDate={handleSelectDate}
          deliveryDates={deliveryDates}
          scheduleMap={scheduleMap}
          selectedDates={selectedScheduleDates}
          isSelectingSchedule={isCreatingSchedule}
          scheduleMode={scheduleMode}
        />

        {selectedDateParcels.map((parcel) => (
          <ParcelCard
            key={parcel.id}
            parcel={parcel}
            onPress={() => router.push(`/${parcel.trackingNumber}`)}
          />
        ))}

        <CalendarLegend />
      </ScrollView>
    </View>
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
