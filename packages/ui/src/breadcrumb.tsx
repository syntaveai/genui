import { cn } from "./lib/utils";
import { ChevronRight, Slash } from "lucide-react";

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  separator?: "chevron" | "slash";
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "chevron",
  className,
}: BreadcrumbProps) {
  const SepIcon = separator === "slash" ? Slash : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm", className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <SepIcon className="h-4 w-4 text-gray-400" />}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={
                  isLast ? "font-medium text-gray-900" : "text-gray-500"
                }
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
