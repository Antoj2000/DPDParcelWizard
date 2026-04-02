import useParcels from "@/src/hooks/useParcels";
import {
  addMonths,
  buildCalendarDays,
  formatMonthLabel,
  startOfMonth,
} from "@/utils/date";
import { useCallback, useMemo, useState } from "react";

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

  const selectedDateParcels = useMemo(() => {
    const selectedDateKey = selectedDate.toISOString().split("T")[0];

    return parcels.filter((parcel) => parcel.expectedAt === selectedDateKey);
  }, [parcels, selectedDate]);

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
    selectedDateParcels,
    monthLabel,
    days,
    deliveryDates,
    onPrevMonth,
    onNextMonth,
    onSelectDate,
  };
}
