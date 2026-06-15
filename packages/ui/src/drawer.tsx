"use client";

import {
  useCallback,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { cn } from "./lib/utils";
import { X } from "lucide-react";

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  onOpenChange: () => {},
});

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Drawer({ open = false, onOpenChange, children }: DrawerProps) {
  return (
    <DrawerContext.Provider
      value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(DrawerContext);
  return (
    <button onClick={() => onOpenChange(true)} className={className} {...props}>
      {children}
    </button>
  );
}

export function DrawerContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = useContext(DrawerContext);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/30"
      onClick={(e) => {
        if (e.target === overlayRef.current) onOpenChange(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-xl border border-gray-200 bg-white shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-300" />
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="overflow-y-auto px-6 pb-6 pt-4">{children}</div>
      </div>
    </div>
  );
}
