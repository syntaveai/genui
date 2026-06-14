# Syntave GenUI: MVP Component Registry Specification

**To the AI Engineering Agent:** 
You are to build exactly these three components. Do not add `Chart`, `List`, or `StatGroup` until explicitly instructed in a future phase. Every component must strictly follow the schemas, prop interfaces, and MCP definitions below.

---

## 1. MetricCard
**Description:** Displays a single, prominent Key Performance Indicator (KPI) with optional contextual description and trend data.
**LLM Use Case:** Use when the user asks for a single, specific metric (e.g., "What is our current MRR?", "Show me total active users").

### A. LLM Input Schema (Zod)
*This is what the LLM sees and is validated against before backend resolution.*
```typescript
import { z } from "zod";

export const MetricCardLLMSchema = z.object({
  type: z.literal("MetricCard"),
  props: z.object({
    title: z.string().describe("The label for the metric (e.g., 'Monthly Recurring Revenue')"),
    dataSource: z.string().describe("The exact name of the registered data source to fetch this metric from."),
    dataSourceParams: z.record(z.any()).optional().describe("Optional parameters to pass to the data source (e.g., { region: 'US' })"),
  }),
});
```

### B. Resolved UI Props (TypeScript)
*This is what the React component actually receives after the Backend Data Resolver injects the real data.*
```typescript
export interface MetricCardProps {
  title: string;
  value: string | number; // Injected by backend
  description?: string;   // Injected by backend or derived
  trend?: {
    value: number;        // Injected by backend
    direction: "up" | "down"; // Injected by backend
  };
  isEmpty?: boolean;      // Injected by backend if data is null/empty
  fallbackMessage?: string; // Injected by backend on error/empty
  className?: string;
}
```

### C. Registry JSON Meta (MCP Tool Definition)
```json
{
  "name": "metric-card",
  "type": "registry:ui",
  "dependencies": ["lucide-react", "clsx", "tailwind-merge"],
  "meta": {
    "description": "Displays a single KPI with optional trend data.",
    "mcp_tool_definition": {
      "name": "render_metric_card",
      "description": "Use this to display a single, prominent data point like revenue, user count, or conversion rate.",
      "parameters": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "description": "The label for the metric" },
          "dataSource": { "type": "string", "description": "The registered data source to fetch real data from" },
          "dataSourceParams": { "type": "object", "description": "Optional parameters for the data source" }
        },
        "required": ["title", "dataSource"]
      }
    }
  }
}
```

### D. Edge Case Handling
- If `isEmpty` is true, render a `bg-gray-50`, `border-dashed border-gray-200` container with `fallbackMessage` centered in `text-gray-500 font-inter`.
- If `trend.direction` is "up", use `text-green-600` with `TrendingUp` icon. If "down", use `text-red-600` with `TrendingDown` icon.

---

## 2. DataTable
**Description:** Displays structured, tabular data with defined column headers.
**LLM Use Case:** Use when the user asks for a list, breakdown, or comparison of multiple items (e.g., "Show me revenue by country", "List the top 5 performing products").

### A. LLM Input Schema (Zod)
```typescript
import { z } from "zod";

export const DataTableLLMSchema = z.object({
  type: z.literal("DataTable"),
  props: z.object({
    columns: z.array(
      z.object({
        header: z.string().describe("The visible column header (e.g., 'Country')"),
        accessorKey: z.string().describe("The key in the data object to display (e.g., 'country_name')")
      })
    ).describe("The columns to display in the table"),
    dataSource: z.string().describe("The exact name of the registered data source to fetch the table rows from."),
    dataSourceParams: z.record(z.any()).optional().describe("Optional parameters to filter the data source (e.g., { limit: 10, status: 'active' })"),
  }),
});
```

### B. Resolved UI Props (TypeScript)
```typescript
export interface DataTableProps {
  columns: { header: string; accessorKey: string }[];
  data: Record<string, any>[]; // Injected by backend resolver
  isEmpty?: boolean;           // Injected by backend if array is empty
  fallbackMessage?: string;    // Injected by backend on error/empty
  className?: string;
}
```

### C. Registry JSON Meta (MCP Tool Definition)
```json
{
  "name": "data-table",
  "type": "registry:ui",
  "dependencies": ["clsx", "tailwind-merge"],
  "meta": {
    "description": "Displays structured tabular data with defined columns.",
    "mcp_tool_definition": {
      "name": "render_data_table",
      "description": "Use this to display a list or breakdown of multiple items in a structured table format.",
      "parameters": {
        "type": "object",
        "properties": {
          "columns": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "header": { "type": "string" },
                "accessorKey": { "type": "string" }
              },
              "required": ["header", "accessorKey"]
            }
          },
          "dataSource": { "type": "string", "description": "The registered data source to fetch table rows from" },
          "dataSourceParams": { "type": "object", "description": "Optional filters for the data source" }
        },
        "required": ["columns", "dataSource"]
      }
    }
  }
}
```

### D. Edge Case Handling
- If `isEmpty` is true, do NOT render an empty `<table>`. Render a `bg-gray-50`, `border-dashed border-gray-200`, `p-12` container with the `fallbackMessage` centered.
- Table headers must use `text-xs font-medium text-gray-500 uppercase tracking-wider`.
- Table cells must use `text-sm text-gray-900 font-inter`.

---

## 3. FallbackMessage
**Description:** A standardized, graceful UI state to inform the user when data is unavailable, access is denied, or an error occurred.
**LLM Use Case:** Use ONLY when the LLM recognizes it does not have a valid `dataSource` to fulfill the user's request, or when explicitly instructed by the system prompt to handle an out-of-bounds query.

### A. LLM Input Schema (Zod)
```typescript
import { z } from "zod";

export const FallbackMessageLLMSchema = z.object({
  type: z.literal("FallbackMessage"),
  props: z.object({
    message: z.string().describe("A polite, clear, and concise explanation of why the data cannot be shown or what the user should do next."),
    variant: z.enum(["empty", "error", "info"]).optional().default("info").describe("The visual style of the message. 'empty' for no data, 'error' for system failures, 'info' for missing permissions/context.")
  }),
});
```

### B. Resolved UI Props (TypeScript)
```typescript
export interface FallbackMessageProps {
  message: string;
  variant?: "empty" | "error" | "info";
  className?: string;
}
```

### C. Registry JSON Meta (MCP Tool Definition)
```json
{
  "name": "fallback-message",
  "type": "registry:ui",
  "dependencies": ["lucide-react", "clsx", "tailwind-merge"],
  "meta": {
    "description": "A graceful UI state for when data is unavailable or a request cannot be fulfilled.",
    "mcp_tool_definition": {
      "name": "render_fallback_message",
      "description": "Use this ONLY when you cannot fulfill the user's request with available data sources. Do not use for normal conversational responses.",
      "parameters": {
        "type": "object",
        "properties": {
          "message": { "type": "string", "description": "The explanation of why the request cannot be fulfilled" },
          "variant": { "type": "string", "enum": ["empty", "error", "info"], "description": "The visual style of the fallback" }
        },
        "required": ["message"]
      }
    }
  }
}
```

### D. Edge Case Handling
- **`variant="empty"`**: Use `AlertCircle` icon (gray-500), `bg-gray-50`, `border-dashed border-gray-200`.
- **`variant="error"`**: Use `AlertTriangle` icon (red-600), `bg-red-50`, `border border-red-200`, `text-red-900`.
- **`variant="info"`**: Use `Info` icon (gray-500), `bg-gray-50`, `border border-gray-200`.

---

## Agent Execution Rules for this Document

1. **Schema First:** You must write the Zod schemas in `packages/schemas/` and write passing Vitest unit tests for them *before* writing the React components.
2. **No Arbitrary Data:** The React components for `MetricCard` and `DataTable` must **not** contain any mock data. They must purely render the `props` passed to them.
3. **Strict Prop Mapping:** The Backend Data Resolver (which you will also build) is responsible for transforming the `LLM Input Schema` into the `Resolved UI Props`. The React component only ever sees the `Resolved UI Props`.
4. **Design System Lock:** Use *only* the colors and fonts defined in `06_DESIGN_SYSTEM_AND_STYLING_RULES.md`. No exceptions.
