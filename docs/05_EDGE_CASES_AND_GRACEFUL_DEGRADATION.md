# Syntave GenUI: Edge Cases & Graceful Degradation

Handling the "no data" or "error" scenario gracefully is the difference between a fragile AI demo and a Relentless Quality enterprise product. We implement a **3-Layer Defense System**.

## Layer 1: The LLM (Prevention via MCP)
The MCP System Prompt instructs the LLM: *"If a user asks for data not covered by your tools, DO NOT hallucinate. Output the `FallbackMessage` component explaining the data is unavailable."*

## Layer 2: The Backend Resolver (Interception)
If the database query returns zero rows, or throws an error, the backend intercepts it before it reaches the frontend.

```typescript
// Backend Resolver: Handling Empty DB Results
async function resolveDataPayload(llmPayload: any, allowedDataSources: any) {
  const { dataSource, ...otherProps } = llmPayload.props;
  
  if (dataSource && allowedDataSources[dataSource]) {
    try {
      const realData = await allowedDataSources[dataSource](); 
      
      // INTERCEPTION: Check if data is null, undefined, or empty array
      if (!realData || (Array.isArray(realData) && realData.length === 0)) {
        return {
          type: llmPayload.type,
          props: {
            ...otherProps,
            isEmpty: true, // <-- Flag for the UI component
            fallbackMessage: "No data available for this specific query."
          }
        };
      }
      return { type: llmPayload.type, props: { ...otherProps, data: realData } };
    } catch (error) {
      // INTERCEPTION: DB connection failed
      return { type: "FallbackMessage", props: { message: "We encountered an error retrieving that data." } };
    }
  }
  return llmPayload;
}
```

## Layer 3: The Frontend Components (Graceful Degradation)
Every data-driven component (`DataTable`, `MetricCard`, `Chart`) **must** be built to handle the `isEmpty` flag. It must render a beautiful, standardized Empty State matching the Syntave monochrome design system.

```tsx
// packages/ui/data-table.tsx
import { cn } from "@/lib/utils";

export function DataTable({ data, columns, isEmpty, fallbackMessage, className }) {
  // GRACEFUL DEGRADATION: Render empty state if flagged
  if (isEmpty) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-12 rounded-lg",
        "border border-dashed border-gray-200 bg-gray-50",
        className
      )}>
        <p className="text-sm font-medium text-gray-500 font-inter text-center">
          {fallbackMessage || "No data available."}
        </p>
      </div>
    );
  }

  // Normal rendering logic with `data` and `columns`...
  return ( <table>...</table> );
}
```
