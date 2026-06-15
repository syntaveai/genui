"use client";

import { useState, useCallback } from "react";
import { cn } from "./lib/utils";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  disabled,
  children,
  className,
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : internalPressed;

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = !pressed;
    if (!isControlled) setInternalPressed(next);
    onPressedChange?.(next);
  }, [pressed, disabled, isControlled, onPressedChange]);

  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
        pressed
          ? "bg-gray-200 text-gray-900"
          : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
