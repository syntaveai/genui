"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { cn } from "./lib/utils";

interface ToggleGroupCtxValue {
  value: string | string[];
  onToggle: (v: string) => void;
}

const ToggleGroupCtx = createContext<ToggleGroupCtxValue>({
  value: "",
  onToggle: () => {},
});

export interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
  className?: string;
}

export function ToggleGroup({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: ToggleGroupProps) {
  const multiple = type === "multiple";
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? (multiple ? [] : ""),
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleToggle = useCallback(
    (itemValue: string) => {
      let next: string | string[];
      if (multiple) {
        const arr = (Array.isArray(value) ? value : []) as string[];
        next = arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue];
      } else {
        next = value === itemValue ? "" : itemValue;
      }
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [value, multiple, isControlled, onValueChange],
  );

  return (
    <ToggleGroupCtx.Provider value={{ value, onToggle: handleToggle }}>
      <div
        className={cn(
          "inline-flex items-center rounded-md border border-gray-200 bg-gray-100 p-1",
          className,
        )}
      >
        {children}
      </div>
    </ToggleGroupCtx.Provider>
  );
}

export function ToggleGroupItem({
  value: itemValue,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(ToggleGroupCtx);
  const isActive = Array.isArray(ctx.value)
    ? ctx.value.includes(itemValue)
    : ctx.value === itemValue;

  return (
    <button
      type="button"
      onClick={() => ctx.onToggle(itemValue)}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
