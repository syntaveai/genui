import { cn } from "./lib/utils";
import { Card, CardContent } from "./card";
import { Text } from "./text";
import { Badge } from "./badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: { value: number; direction: "up" | "down" };
  isEmpty?: boolean;
  fallbackMessage?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  trend,
  isEmpty,
  fallbackMessage,
  className,
}: MetricCardProps) {
  if (isEmpty) {
    return (
      <Card
        className={cn(
          "border-dashed border-gray-200 bg-gray-50",
          className,
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Text variant="muted" className="text-center">
            {fallbackMessage || "No data available."}
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <Text variant="muted">{title}</Text>
        <div className="mt-2 flex items-baseline gap-2">
          <Text variant="h2" as="h3" className="text-3xl">
            {value}
          </Text>
          {trend && (
            <Badge
              variant={trend.direction === "up" ? "success" : "destructive"}
              className="flex items-center gap-1"
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {trend.value}%
            </Badge>
          )}
        </div>
        {description && (
          <Text variant="muted" className="mt-1">
            {description}
          </Text>
        )}
      </CardContent>
    </Card>
  );
}
