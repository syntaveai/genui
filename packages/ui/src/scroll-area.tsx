"use client";

import { cn } from "./lib/utils";

export interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal" | "both";
}

export function ScrollArea({
  children,
  className,
  orientation = "vertical",
}: ScrollAreaProps) {
  const overflow =
    orientation === "horizontal"
      ? "overflow-x-auto"
      : orientation === "both"
        ? "overflow-auto"
        : "overflow-y-auto";

  return <div className={cn("relative", overflow, className)}>{children}</div>;
}
