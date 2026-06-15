"use client";

import { createContext, useContext, useCallback } from "react";
import { cn } from "./lib/utils";
import { Circle } from "lucide-react";

interface RadioContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: RadioGroupProps) {
  const value = controlledValue ?? defaultValue ?? "";
  return (
    <RadioContext.Provider
      value={{ value, onValueChange: onValueChange ?? (() => {}) }}
    >
      <div role="radiogroup" className={cn("space-y-2", className)}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export function RadioGroupItem({
  value,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const ctx = useContext(RadioContext);
  const checked = ctx?.value === value;

  const handleClick = useCallback(() => {
    ctx?.onValueChange(value);
  }, [ctx, value]);

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2 text-sm text-gray-700",
        className,
      )}
    >
      <button
        role="radio"
        aria-checked={checked}
        onClick={handleClick}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400",
          checked && "border-gray-900",
        )}
        {...props}
      >
        {checked && (
          <Circle className="h-2.5 w-2.5 fill-gray-900 text-gray-900" />
        )}
      </button>
      {children}
    </label>
  );
}
