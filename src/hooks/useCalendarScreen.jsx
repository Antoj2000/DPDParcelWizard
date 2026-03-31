import { useMemo, useState, useCallback } from "react";
import useParcels from "@/src/hooks/useParcels";
import {
  buildCalendarDays,
  startOfMonth,
  addMonths,
  formatMonthLabel,
} from "@/utils/date";

export default function useCalendarScreen() {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today);

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

  const onPrevMonth = useCallback(() => {
    setVisibleMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1),
    );
  }, []);

  const onNextMonth = useCallback(() => {
    setVisibleMonth((prevMonth) => addMonths(prevMonth, 1));
  }, []);

  const onSelectDate = useCallback((date, inMonth) => {
    setSelectedDate(date);

    if (!inMonth) {
      setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }, []);
  return {
    selectedDate,
    monthLabel,
    days,
    deliveryDates,
    onPrevMonth,
    onNextMonth,
    onSelectDate,
  };
}
