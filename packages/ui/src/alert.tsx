import { cn } from "./lib/utils";
import { Text } from "./text";
import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

const variantConfig = {
  info: {
    container: "border-blue-200 bg-blue-50",
    icon: "text-blue-600",
    Icon: Info,
  },
  success: {
    container: "border-green-200 bg-green-50",
    icon: "text-green-600",
    Icon: CheckCircle2,
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    icon: "text-amber-600",
    Icon: AlertTriangle,
  },
  error: {
    container: "border-red-200 bg-red-50",
    icon: "text-red-600",
    Icon: AlertCircle,
  },
};

export interface AlertProps {
  variant?: keyof typeof variantConfig;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  const cfg = variantConfig[variant];
  const { Icon: IconComponent } = cfg;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        cfg.container,
        className,
      )}
    >
      <IconComponent className={cn("mt-0.5 h-5 w-5 shrink-0", cfg.icon)} />
      <div className="space-y-1">
        {title && (
          <Text variant="body" className="font-semibold text-gray-900">
            {title}
          </Text>
        )}
        {children && (
          <Text variant="muted" className="text-sm">
            {children}
          </Text>
        )}
      </div>
    </div>
  );
}

export function AlertTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text
      variant="body"
      className={cn("font-semibold text-gray-900", className)}
    >
      {children}
    </Text>
  );
}

export function AlertDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text variant="muted" className={cn("text-sm", className)}>
      {children}
    </Text>
  );
}
