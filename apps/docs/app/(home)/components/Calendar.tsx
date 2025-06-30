"use client";
import { useState } from "react";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/registry/new-york/ui/card";
import { subDays, addDays } from "date-fns";

export function MultipleSelectionCalendar() {
  const today = new Date();
  const [date, setDate] = useState<Date[] | undefined>([
    subDays(today, 17),
    addDays(today, 2),
    addDays(today, 6),
    addDays(today, 8),
  ]);

  return (
    <Card className="lg:h-[400px] shadow-none">
      <CardHeader>
        <CardTitle>
          <Badge variant="secondary" className="text-xs">
            Calendar
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Calendar
          mode="multiple"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border border-border p-2 "
        />
        {/* Updated date display */}
        <div className="mt-4 w-full md:w-auto">
          <h6 className="text-sm font-medium text-foreground">
            Selected Dates
          </h6>
          <div className="flex flex-col gap-2 mt-1 max-h-36 overflow-y-auto">
            {date && date.length ? (
              date.map((d, idx) => (
                <Badge variant="secondary" key={idx} className="text-xs">
                  {d.toLocaleDateString()}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">None</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
