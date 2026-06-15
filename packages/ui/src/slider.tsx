"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "./lib/utils";

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value: controlledValue,
  defaultValue = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const trackRef = useRef<HTMLDivElement>(null);

  const current = value[0] ?? min;
  const pct = ((current - min) / (max - min)) * 100;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track || disabled) return;

      const update = (clientX: number) => {
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(
          Math.max((clientX - rect.left) / rect.width, 0),
          1,
        );
        const raw = min + ratio * (max - min);
        const stepped = Math.round(raw / step) * step;
        const clamped = Math.min(Math.max(stepped, min), max);
        const next = [clamped];
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      };

      update(e.clientX);

      const handleMouseMove = (ev: MouseEvent) => update(ev.clientX);
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [min, max, step, disabled, isControlled, onValueChange],
  );

  return (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={current}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        const delta =
          e.key === "ArrowRight" || e.key === "ArrowUp"
            ? step
            : e.key === "ArrowLeft" || e.key === "ArrowDown"
              ? -step
              : 0;
        if (delta) {
          e.preventDefault();
          const next = Math.min(Math.max(current + delta, min), max);
          if (!isControlled) setInternalValue([next]);
          onValueChange?.([next]);
        }
      }}
      className={cn(
        "relative flex h-5 w-full touch-none items-center",
        className,
      )}
    >
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className="relative h-1.5 w-full rounded-full bg-gray-200"
      >
        <div
          className="absolute h-full rounded-full bg-gray-900"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-900 bg-white shadow-sm"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}
