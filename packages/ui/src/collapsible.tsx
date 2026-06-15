"use client";

import { useState, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronDown } from "lucide-react";

export interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [open, isControlled, onOpenChange]);

  return (
    <CollapsibleContext.Provider value={{ open, onToggle: handleToggle }}>
      <div className={cn("space-y-1", className)}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

import { createContext, useContext } from "react";

interface CollapsibleContextValue {
  open: boolean;
  onToggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  open: false,
  onToggle: () => {},
});

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onToggle } = useContext(CollapsibleContext);
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600",
        className,
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4 text-gray-500" />
      {children}
    </button>
  );
}

export function CollapsibleContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useContext(CollapsibleContext);
  if (!open) return null;

  return (
    <div className={cn("pl-6 text-sm text-gray-600", className)} {...props}>
      {children}
    </div>
  );
}
