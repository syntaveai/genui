"use client";

import { useState, useCallback } from "react";
import { cn } from "./lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProps {
  slides: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({
  slides,
  className,
  autoPlay,
  interval = 4000,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1)),
    [slides.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i === slides.length - 1 ? 0 : i + 1)),
    [slides.length],
  );

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <div className="relative">{slides[current]}</div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-700 shadow-sm hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-700 shadow-sm hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "w-4 bg-gray-900" : "w-1.5 bg-gray-300",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
