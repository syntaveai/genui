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

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuCtx = createContext<DropdownMenuContextValue>({
  open: false,
  setOpen: () => {},
});

export interface DropdownMenuProps {
  children?: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <DropdownMenuCtx.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-flex">
        {children}
      </div>
    </DropdownMenuCtx.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = useContext(DropdownMenuCtx);

  if (asChild) {
    return (
      <span
        onClick={() => setOpen(!open)}
        className={cn("cursor-pointer", className)}
      >
        {children}
      </span>
    );
  }

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

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open } = useContext(DropdownMenuCtx);
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-gray-200 bg-white py-1 shadow-sm",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useContext(DropdownMenuCtx);
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 border-t border-gray-200", className)} />;
}
