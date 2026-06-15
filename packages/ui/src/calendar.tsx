"use client";

import { useState, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

function getMonthDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function Calendar({ value, onChange, className }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getMonthDays(viewYear, viewMonth);

  const prev = useCallback(() => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  }, [viewMonth]);
  const next = useCallback(() => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  }, [viewMonth]);

  const isSelected = (day: number) =>
    value &&
    value.getDate() === day &&
    value.getMonth() === viewMonth &&
    value.getFullYear() === viewYear;

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-[280px] rounded-lg border border-gray-200 bg-white p-3",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={prev}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium text-gray-900">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={next}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, i) =>
          day ? (
            <button
              key={i}
              onClick={() => onChange?.(new Date(viewYear, viewMonth, day))}
              className={cn(
                "rounded-md py-1 transition-colors",
                isSelected(day)
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100",
                isToday(day) &&
                  !isSelected(day) &&
                  "font-semibold text-gray-900",
              )}
            >
              {day}
            </button>
          ) : (
            <div key={i} />
          ),
        )}
      </div>
    </div>
  );
}
