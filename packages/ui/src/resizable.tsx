"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { cn } from "./lib/utils";

export interface ResizablePanelGroupProps {
  direction?: "horizontal" | "vertical";
  children: [ReactNode, ReactNode];
  defaultSizes?: [number, number];
  className?: string;
}

export function ResizablePanelGroup({
  direction = "horizontal",
  children,
  defaultSizes = [50, 50],
  className,
}: ResizablePanelGroupProps) {
  const [sizes, setSizes] = useState(defaultSizes);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      const startX = e.clientX;
      const startY = e.clientY;
      const startSizes: [number, number] = [sizes[0], sizes[1]];

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const delta =
          direction === "horizontal"
            ? ev.clientX - startX
            : ev.clientY - startY;
        const total = direction === "horizontal" ? rect.width : rect.height;
        const deltaPct = (delta / total) * 100;
        const newSizes: [number, number] = [
          Math.max(10, Math.min(90, startSizes[0]! + deltaPct)),
          Math.max(10, Math.min(90, startSizes[1]! - deltaPct)),
        ];
        setSizes(newSizes);
      };

      const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [sizes, direction],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
    >
      <div
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${sizes[0]}%`,
        }}
      >
        {children[0]}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className={cn(
          "flex shrink-0 cursor-col-resize items-center justify-center bg-gray-100 transition-colors hover:bg-gray-200",
          direction === "horizontal"
            ? "w-2 cursor-col-resize"
            : "h-2 cursor-row-resize",
        )}
      />
      <div
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${sizes[1]}%`,
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}
