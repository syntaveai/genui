"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  createContext,
  useContext,
} from "react";
import { cn } from "./lib/utils";
import { X } from "lucide-react";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
});

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider
      value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}
    >
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <button onClick={() => onOpenChange(true)} className={className} {...props}>
      {children}
    </button>
  );
}

export function SheetContent({
  children,
  className,
  side = "right",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }) {
  const { open, onOpenChange } = useContext(SheetContext);
  const id = useId();
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

  const sideClass = side === "left" ? "left-0" : "right-0";

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
        aria-labelledby={`${id}-title`}
        className={cn(
          "fixed inset-y-0 flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-sm",
          sideClass,
          className,
        )}
        {...props}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "space-y-1.5 border-b border-gray-200 px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = useId();
  return (
    <h2
      id={id}
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}
