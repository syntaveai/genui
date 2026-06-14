import * as React from "react";
import { cn } from "./lib/utils";

const badgeVariants = {
  default: "bg-gray-900 text-white",
  secondary: "bg-gray-100 text-gray-900",
  outline: "border border-gray-200 text-gray-900",
  success: "bg-green-50 text-green-600 border border-green-200",
  destructive: "bg-red-50 text-red-600 border border-red-200",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          badgeVariants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
