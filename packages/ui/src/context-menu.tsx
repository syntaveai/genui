"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "./lib/utils";

export interface ContextMenuProps {
  items: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    separator?: boolean;
  }[];
  children: React.ReactNode;
  className?: string;
}

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setPos(null);
    if (pos) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [pos]);

  return (
    <div
      className={className}
      onContextMenu={(e) => {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
    >
      {children}
      {pos && (
        <div
          ref={ref}
          style={{ left: pos.x, top: pos.y }}
          className="fixed z-50 min-w-[10rem] rounded-lg border border-gray-200 bg-white py-1 shadow-sm"
        >
          {items.map((item, i) =>
            item.separator ? (
              <div key={i} className="my-1 border-t border-gray-200" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  item.onClick();
                  setPos(null);
                }}
                disabled={item.disabled}
                className="flex w-full items-center px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
