import * as React from "react";
import { cn } from "./lib/utils";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  name: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 16, ...props }, ref) => {
    const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];

    if (!LucideIcon) {
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        size={size}
        className={cn("text-gray-500", className)}
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";

export { Icon };
