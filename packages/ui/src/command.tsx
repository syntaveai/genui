"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "./lib/utils";
import { Search } from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  keywords?: string[];
  onSelect?: () => void;
}

export interface CommandProps {
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function Command({
  items,
  placeholder = "Type a command...",
  emptyText = "No results.",
  className,
}: CommandProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      })
    : items;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect?.();
      }
    },
    [filtered, selectedIndex],
  );

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex items-center border-b border-gray-200 px-3">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="ml-2 flex-1 border-0 bg-transparent py-3 text-sm outline-none"
        />
      </div>
      <div className="max-h-64 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-gray-400">
            {emptyText}
          </p>
        ) : (
          filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={item.onSelect}
              className={cn(
                "flex w-full items-center px-3 py-2 text-left text-sm transition-colors",
                i === selectedIndex
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50",
              )}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
