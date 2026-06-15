"use client";

import { useState, useRef } from "react";
import { cn } from "./lib/utils";

export interface HoverCardProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function HoverCard({
  content,
  children,
  delay = 300,
  className,
}: HoverCardProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => {
        timerRef.current = setTimeout(() => setVisible(true), delay);
      }}
      onMouseLeave={() => {
        if (timerRef.current !== undefined) clearTimeout(timerRef.current);
        setVisible(false);
      }}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {content}
        </div>
      )}
    </div>
  );
}
