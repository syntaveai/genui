"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  options,
  disabled,
  className,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
          value ? "text-gray-900" : "text-gray-400",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? selected.label : placeholder}
        <ChevronDown
          className={cn("ml-2 h-4 w-4 text-gray-400", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-sm"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "flex w-full items-center px-3 py-1.5 text-left text-sm transition-colors hover:bg-gray-100",
                opt.value === value
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-700",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
