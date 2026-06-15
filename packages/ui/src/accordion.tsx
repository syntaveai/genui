"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  expanded: string | null;
  setExpanded: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  defaultValue?: string;
  type?: "single" | "multiple";
  children?: React.ReactNode;
  className?: string;
}

export function Accordion({
  defaultValue,
  type = "single",
  children,
  className,
}: AccordionProps) {
  const [expanded, setExpanded] = useState<string | null>(defaultValue ?? null);

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      <div className={cn("divide-y divide-gray-200", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-1", className)} data-value={value}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(AccordionContext);
  const isExpanded = ctx?.expanded === value;

  const handleClick = useCallback(() => {
    ctx?.setExpanded(isExpanded ? null : value);
  }, [ctx, isExpanded, value]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between py-3 text-sm font-medium text-gray-900 transition-colors hover:text-gray-600",
        className,
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200",
          isExpanded && "rotate-180",
        )}
      />
    </button>
  );
}

export function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(AccordionContext);
  if (ctx?.expanded !== value) return null;

  return (
    <div className={cn("pb-3 text-sm text-gray-600", className)}>
      {children}
    </div>
  );
}
