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
      if (schedule.recurring) {
        const start = new Date(schedule.startDate);
        const end = new Date(schedule.endDate);
        const weekdays = schedule.dates.map((date) => new Date(date).getDay());

        // Iterate through the date range and add entries for the specified weekdays
        for (
          let currentDate = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate(),
          );
          currentDate <= end;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          if (weekdays.includes(currentDate.getDay())) {
            const key = formatDateKey(currentDate);
            map.set(key, schedule.action);
          }
        }
      } else {
        // Add entries for non-recurring schedules
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
