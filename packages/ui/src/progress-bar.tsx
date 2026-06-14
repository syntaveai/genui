import { cn } from "./lib/utils";
import { Text } from "./text";

export interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  isEmpty?: boolean;
  fallbackMessage?: string;
  className?: string;
}

export function ProgressBar({
  label,
  value,
  maxValue = 100,
  isEmpty,
  fallbackMessage,
  className,
}: ProgressBarProps) {
  if (isEmpty) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500",
          className,
        )}
      >
        {fallbackMessage || "No progress data available."}
      </div>
    );
  }

  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Text variant="body" className="font-medium">
          {label}
        </Text>
        <Text variant="muted" className="text-sm">
          {value.toLocaleString()}
          {` / `}
          {maxValue.toLocaleString()}
        </Text>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gray-900 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Text variant="muted" className="text-right text-xs">
        {Math.round(pct)}%
      </Text>
    </div>
  );
}
