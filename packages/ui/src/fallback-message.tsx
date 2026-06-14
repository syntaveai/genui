import { cn } from "./lib/utils";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Text } from "./text";

export interface FallbackMessageProps {
  message: string;
  variant?: "empty" | "error" | "info";
  className?: string;
}

const variantStyles = {
  empty: {
    container: "bg-gray-50 border-dashed border-gray-200",
    icon: AlertCircle,
    iconColor: "text-gray-500",
    textColor: "text-gray-500",
  },
  error: {
    container: "bg-red-50 border-red-200",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    textColor: "text-red-900",
  },
  info: {
    container: "bg-gray-50 border-gray-200",
    icon: Info,
    iconColor: "text-gray-500",
    textColor: "text-gray-500",
  },
} as const;

export function FallbackMessage({
  message,
  variant = "info",
  className,
}: FallbackMessageProps) {
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border p-12",
        styles.container,
        className,
      )}
    >
      <IconComponent className={cn("mb-3 h-8 w-8", styles.iconColor)} />
      <Text variant="muted" className={cn(styles.textColor, "text-center")}>
        {message}
      </Text>
    </div>
  );
}
