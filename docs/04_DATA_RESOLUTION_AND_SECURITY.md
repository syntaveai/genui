# Syntave GenUI: Data Resolution & Security Architecture

**CRITICAL RULE:** The LLM *never* generates data. It only generates *intent*. The backend intercepts and resolves. This ensures zero hallucinations and enterprise-grade security.

## 1. The 4-Step Data Resolution Flow

### Step 1: Developer Defines Secure "Data Sources" (The Allowlist)
In the backend, the developer registers specific, secure functions. This is the *only* way data enters the system.
```typescript
// developer's backend: data-sources.ts
export const dataSources = {
  get_mau_by_country: async () => {
    const result = await db.query('SELECT country, users FROM mau_metrics');
    return result; 
  }
};
```

### Step 2: MCP Schema Exposes Sources to LLM
The Zod schema for the component includes a `dataSource` field. The LLM is explicitly told: *"Do not make up data. Choose one of the available dataSources."*
```typescript
const DataTableSchema = z.object({
  type: z.literal("DataTable"),
  props: z.object({
    columns: z.array(z.string()),
    dataSource: z.enum(["get_mau_by_country"]).describe("The secure data source to fetch real data from")
  })
});
```

### Step 3: LLM Outputs "Intent" (Not Data)
The LLM outputs the instruction of what to fetch, with zero actual data.
```json
{
  "type": "DataTable",
  "props": { "columns": ["Country", "Users"], "dataSource": "get_mau_by_country" }
}
```

### Step 4: Backend Intercepts and Resolves (The Magic)
The Syntave Backend Data Resolver (middleware) validates the JSON, executes the developer's function, and injects the real data.

```typescript
// Syntave Backend Resolver
async function resolveDataPayload(llmPayload: any, allowedDataSources: Record<string, Function>) {
  const { dataSource, dataSourceParams, ...otherProps } = llmPayload.props;
  
  if (dataSource && allowedDataSources[dataSource]) {
    // Fetch REAL data securely
    const realData = await allowedDataSources[dataSource](dataSourceParams); 
    
    // Inject it into the payload, removing the dataSource key
    return {
      type: llmPayload.type,
      props: { ...otherProps, data: realData } // <-- Real data injected here!
    };
  }
  
  // Fallback if LLM hallucinated a data source
  return { type: "FallbackMessage", props: { message: "Access to that data source is not permitted." } };
}
```

## 2. Handling Parameters (Advanced Fetching)
If the user asks for filtered data, the LLM can pass safe parameters. The Zod schema strictly validates these parameters to prevent injection attacks.
```json
{
  "type": "DataTable",
  "props": {
    "dataSource": "get_mau_by_country",
    "dataSourceParams": { "countryFilter": "India" } // Strictly validated by Zod
  }
}
```
