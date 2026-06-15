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

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const AlertDialogCtx = createContext<AlertDialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

export function AlertDialog({
  open = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <AlertDialogCtx.Provider
      value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}
    >
      {children}
    </AlertDialogCtx.Provider>
  );
}

export function AlertDialogTrigger({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { onOpenChange } = useContext(AlertDialogCtx);
  return (
    <button onClick={() => onOpenChange(true)} className={className}>
      {children}
    </button>
  );
}

export function AlertDialogContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { open, onOpenChange } = useContext(AlertDialogCtx);
  const overlayRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.addEventListener("keydown", h);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === overlayRef.current) onOpenChange(false);
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className={cn(
          "w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 space-y-1.5", className)} {...props} />;
}

export function AlertDialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)} {...props} />
  );
}

export function AlertDialogCancel({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(AlertDialogCtx);
  return (
    <button
      onClick={() => onOpenChange(false)}
      className={cn(
        "rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      {children ?? "Cancel"}
    </button>
  );
}

export function AlertDialogAction({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(AlertDialogCtx);
  return (
    <button
      onClick={() => onOpenChange(false)}
      className={cn(
        "rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800",
        className,
      )}
      {...props}
    >
      {children ?? "Continue"}
    </button>
  );
}
