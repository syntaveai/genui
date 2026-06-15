"use client";

import { cn } from "./lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`e${i}`}
            className="flex h-8 w-8 items-center justify-center text-sm text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
              page === currentPage
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {page}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
