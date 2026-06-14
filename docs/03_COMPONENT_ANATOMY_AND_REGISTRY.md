# Syntave GenUI: Component Anatomy & Registry Model

Every single component in GenUI consists of **four distinct pieces of code**. You must build the tooling to generate and serve all four.

## 1. The React Component (`packages/ui/[name].tsx`)
The visual UI. It strictly follows the Syntave Design System. It accepts strictly typed props.
```tsx
// packages/ui/metric-card.tsx
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: { value: number; direction: "up" | "down"; };
  className?: string;
}

export function MetricCard({ title, value, description, trend, className }: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-6", className)}>
      <p className="text-sm font-medium text-gray-500 font-inter">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-3xl font-semibold text-gray-900 font-inter tracking-tight">{value}</h3>
        {trend && (
          <span className={cn("flex items-center text-sm font-medium", trend.direction === "up" ? "text-green-600" : "text-red-600")}>
            {trend.direction === "up" ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
```

## 2. The Zod Schema (`packages/schemas/[name].ts`)
The contract for the LLM. It must include `.describe()` tags for MCP (Model Context Protocol) tool generation.
```ts
// packages/schemas/metric-card.ts
import { z } from "zod";

export const MetricCardSchema = z.object({
  type: z.literal("MetricCard"),
  props: z.object({
    title: z.string().describe("The label for the metric (e.g., 'Total Revenue')"),
    value: z.union([z.string(), z.number()]).describe("The main metric value"),
    description: z.string().optional().describe("Optional context or subtitle"),
    trend: z.object({
      value: z.number().describe("The percentage change"),
      direction: z.enum(["up", "down"]),
    }).optional(),
  }),
});
```

## 3. The Registry JSON (`apps/registry/r/[name].json`)
Hosted at `https://genui.syntave.com/r/[name].json`. Read by the CLI to know what to download.
```json
{
  "name": "metric-card",
  "type": "registry:ui",
  "dependencies": ["lucide-react", "clsx", "tailwind-merge"],
  "files": [
    { "path": "ui/metric-card.tsx", "content": "[RAW_TSX_CONTENT]", "type": "registry:ui" }
  ],
  "meta": {
    "description": "Displays a single key performance indicator (KPI) with optional trend data.",
    "mcp_tool_definition": {
      "name": "render_metric_card",
      "description": "Use this to display a single, prominent data point like revenue.",
      "parameters": { "type": "object", "properties": { "title": { "type": "string" }, "value": { "type": "string" } }, "required": ["title", "value"] }
    }
  }
}
```

## 4. The Runtime Package (`packages/runtime/index.tsx`)
The lightweight npm package installed by the developer. It maps the LLM's JSON to the locally installed component.
```tsx
// packages/runtime/index.tsx
import { MetricCard } from "./components/ui/metric-card"; // Maps to user's local file

const componentMap = { MetricCard };

export function GenerativeUI({ payload }: { payload: any }) {
  if (!payload?.type) return null;
  const Component = componentMap[payload.type as keyof typeof componentMap];
  if (!Component) return <div className="p-4 text-red-500">Unsupported GenUI component: {payload.type}</div>;
  return <Component {...payload.props} />;
}
```
