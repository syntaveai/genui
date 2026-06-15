"use client";

import {
  useRef,
  useCallback,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "./lib/utils";

export interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export function InputOTP({
  value = "",
  onChange,
  maxLength = 6,
  className,
}: InputOTPProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        focus(index - 1);
      } else if (e.key === "ArrowLeft" && index > 0) {
        focus(index - 1);
      } else if (e.key === "ArrowRight" && index < maxLength - 1) {
        focus(index + 1);
      }
    },
    [value, maxLength, focus],
  );

  const handleChange = useCallback(
    (val: string, index: number) => {
      const digits = value.split("");
      digits[index] = val.slice(-1);
      const next = digits.join("").slice(0, maxLength);
      onChange?.(next);
      if (val && index < maxLength - 1) focus(index + 1);
    },
    [value, maxLength, onChange, focus],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      e.preventDefault();
      const data = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, maxLength);
      onChange?.(data);
      focus(Math.min(data.length, maxLength - 1));
    },
    [maxLength, onChange, focus],
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: maxLength }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
