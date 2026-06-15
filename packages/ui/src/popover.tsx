"use client";

import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { cn } from "./lib/utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverCtx = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => {},
});

export interface PopoverProps {
  children?: React.ReactNode;
  className?: string;
}

export function Popover({ children, className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <PopoverCtx.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn("relative inline-flex", className)}>
        {children}
      </div>
    </PopoverCtx.Provider>
  );
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useContext(PopoverCtx);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export function PopoverContent({
  children,
  className,
  align = "center",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end";
}) {
  const { open } = useContext(PopoverCtx);

  if (!open) return null;

  const alignClass =
    align === "start"
      ? "left-0"
      : align === "end"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-2 min-w-[12rem] rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        alignClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
