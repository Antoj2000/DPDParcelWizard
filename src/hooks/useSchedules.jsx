import { formatDateKey } from "@/utils/date";
import { useCallback, useMemo, useState } from "react";

export default function useSchedules() {
  // Store all schedules
  const [schedules, setSchedules] = useState([]);

  // Add a new schedule with a generated ID
  const addSchedule = useCallback((schedule) => {
    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...schedule,
      },
    ]);
  }, []);

  // Build a map of date strings to actions for quick lookup in the calendar
  const scheduleMap = useMemo(() => {
    const map = new Map();

    schedules.forEach((schedule) => {
      if (schedule.mode === "range") {
        const start = new Date(schedule.startDate);
        const end = new Date(schedule.endDate);

        // Iterate through the selected date range and mark every day.
        for (
          let currentDate = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
          );
          currentDate <= end;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          const key = formatDateKey(currentDate);
          map.set(key, schedule.action);
        }
      } else {
        // Add entries for single-day schedules.
        schedule.dates.forEach((date) => {
          map.set(date, schedule.action);
        });
      }
    });

    return map;
  }, [schedules]);

  return {
    schedules,
    addSchedule,
    scheduleMap,
  };
}
