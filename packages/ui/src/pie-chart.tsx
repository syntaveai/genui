import { cn } from "./lib/utils";
import { Text } from "./text";

const GRAY_SCALE = [
  "fill-gray-900",
  "fill-gray-700",
  "fill-gray-500",
  "fill-gray-400",
  "fill-gray-300",
  "fill-gray-200",
];

export interface PieChartProps {
  title: string;
  data?: { label: string; value: number }[];
  isEmpty?: boolean;
  fallbackMessage?: string;
  className?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function PieChart({
  title,
  data,
  isEmpty,
  fallbackMessage,
  className,
}: PieChartProps) {
  if (isEmpty) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500",
          className,
        )}
      >
        {fallbackMessage || "No chart data available."}
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  let currentAngle = 0;
  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const path = describeArc(100, 100, 90, currentAngle, currentAngle + angle);
    const midAngle = currentAngle + angle / 2;
    const labelPos = polarToCartesian(100, 100, 65, midAngle);
    const pct = ((d.value / total) * 100).toFixed(1);
    currentAngle += angle;
    return {
      ...d,
      path,
      pct,
      labelX: labelPos.x,
      labelY: labelPos.y,
      color: GRAY_SCALE[i % GRAY_SCALE.length],
    };
  });

  return (
    <div className={cn("space-y-3", className)}>
      <Text variant="body" className="font-semibold">
        {title}
      </Text>
      <div className="flex items-center gap-6">
        <svg
          viewBox="0 0 200 200"
          className="h-48 w-48 shrink-0"
          role="img"
          aria-label={title}
        >
          {segments.map((s, i) => (
            <path key={i} d={s.path} className={s.color} />
          ))}
          {segments
            .filter((s) => s.pct !== "0.0")
            .map((s, i) => (
              <text
                key={i}
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-white text-[10px] text-xs font-medium"
              >
                {s.pct}%
              </text>
            ))}
        </svg>
        <div className="space-y-2">
          {segments.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={cn(
                  "h-3 w-3 rounded-sm",
                  (GRAY_SCALE[i % GRAY_SCALE.length] ?? "bg-gray-500").replace(
                    "fill-",
                    "bg-",
                  ),
                )}
              />
              <span className="text-sm text-gray-700">{s.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {s.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
