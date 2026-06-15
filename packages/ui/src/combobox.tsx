"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronDown, Search, X } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox({
  value: controlledValue,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Search...",
  emptyText = "No results found.",
  className,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = useCallback(
    (opt: ComboboxOption) => {
      if (!isControlled) setInternalValue(opt.value);
      onValueChange?.(opt.value);
      setQuery("");
      setOpen(false);
    },
    [isControlled, onValueChange],
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn("ml-2 h-4 w-4 text-gray-400", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center border-b border-gray-200 px-3">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
              className="ml-2 flex-1 border-0 bg-transparent py-2 text-sm outline-none"
            />
            {query && (
              <X
                className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setQuery("")}
              />
            )}
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-400">{emptyText}</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "flex w-full items-center px-3 py-1.5 text-left text-sm transition-colors hover:bg-gray-100",
                    opt.value === value
                      ? "bg-gray-100 font-medium text-gray-900"
                      : "text-gray-700",
                  )}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
