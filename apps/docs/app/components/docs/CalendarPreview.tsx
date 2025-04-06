"use client";

import { useState } from "react";
import { addDays, subDays } from "date-fns";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { DateRange } from "react-day-picker";

// 1) Multiple Selection Calendar
export function MultipleSelectionCalendar() {
  const today = new Date();
  const [date, setDate] = useState<Date[] | undefined>([
    subDays(today, 17),
    addDays(today, 2),
    addDays(today, 6),
    addDays(today, 8),
  ]);

  return (
    <div className="not-prose">
      <Calendar
        mode="multiple"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border border-border p-2"
      />
    </div>
  );
}

// 2) Simple (Single-Day) Calendar
export function CalendarSimple() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="not-prose">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border border-border p-2"
      />
    </div>
  );
}

// 3) Range Selection Calendar
interface CalendarPreviewProps {
  className?: string;
}

export function CalendarPreview({ className }: CalendarPreviewProps) {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 3),
  });

  return (
    <div className={className}>
      <Calendar
        className="not-prose"
        mode="range"
        selected={date}
        onSelect={setDate}
      />
    </div>
  );
}
