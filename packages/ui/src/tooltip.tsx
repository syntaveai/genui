"use client";

import { useState, useRef } from "react";
import { cn } from "./lib/utils";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  delay = 300,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 shadow-sm"
        >
          {content}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-200">
            <div className="absolute -left-1 -top-[5px] border-4 border-transparent border-t-white" />
          </div>
        </div>
      )}
    </div>
  );
}
