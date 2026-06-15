# Syntave GenUI

A component registry and runtime for building AI-driven user interfaces. LLMs output structured intent — your backend resolves data, our components render it.

```bash
npm install @syntave/schemas @syntave/runtime @syntave/cli @syntave/ui
npx genui add metric-card data-table fallback-message
```

## Architecture

```
User Prompt → LLM (tool calling) → Structured Intent → resolvePayload() → <GenerativeUI /> → React Component
                 ↑                              ↑                      ↑
           MCP schemas from              Zod validation          Allowlisted data
           registry JSONs                + data injection       source handlers
```

1. **LLM outputs intent** — Calls MCP tools matching component Zod schemas. Outputs `{ type, props, dataSource }` — never raw data.
2. **Backend validates & resolves** — `resolvePayload()` from `@syntave/runtime/server` validates against Zod schemas, calls your allowlisted data source handler, injects real data.
3. **GenerativeUI renders** — Maps the resolved payload to the matching React component from your `componentMap`.

## Components

**49 components** — 5 GenUI (LLM-driven with Zod schemas) + 44 primitives.

### GenUI Components

MetricCard, DataTable, FallbackMessage, PieChart, ProgressBar

### Primitives

Layout: Card, Table, Separator, ScrollArea, AspectRatio, Resizable
Navigation: Accordion, Tabs, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar
Overlays: Dialog, AlertDialog, Sheet, Drawer, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, Command
Forms: Button, Input, Select, Checkbox, Switch, RadioGroup, Slider, Toggle, Combobox, Calendar, DatePicker, and more
Display: Text, Badge, Avatar, Skeleton, Spinner, Icon, Kbd, Toast, Alert, Collapsible, Carousel

## CLI

```bash
npx genui add <name>              # Install a component
npx genui add name1 name2         # Install multiple at once
npx genui add --all               # Install all 49 components
npx genui list                    # List all components
npx genui init                    # Regenerate genui.ts from components.json
```

## Quick Start

### 1. Install

```bash
npm install @syntave/schemas @syntave/runtime @syntave/cli @syntave/ui
npx genui add metric-card data-table fallback-message
```

### 2. Create API route

```typescript
// app/api/generate/route.ts
import { resolvePayload } from "@syntave/runtime/server";
import { MetricCardLLMSchema } from "@syntave/schemas";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  // Fetch MCP tools from registry, call LLM, get structured intent
  const resolved = await resolvePayload(llmPayload, yourDataSources);
  return NextResponse.json({ payload: resolved });
}
```

### 3. Render on client

```tsx
"use client";
import { GenerativeUI } from "@syntave/runtime";
import { componentMap } from "@/components/genui";

<GenerativeUI payload={resolvedPayload} componentMap={componentMap} />;
```

See the [full documentation](https://genui.syntave.com/docs) for setup guides, multi-provider LLM support (OpenAI, Anthropic, DeepSeek, OpenRouter, Groq), and all component APIs.

## Multi-LLM Support

```env
# OpenAI (default)
LLM_PROVIDER=openai
LLM_API_KEY=sk-...
LLM_MODEL=gpt-4o-mini

# DeepSeek / OpenRouter / Groq
LLM_PROVIDER=openai-compatible
LLM_BASE_URL=https://api.deepseek.com/v1
LLM_MODEL=deepseek-chat

# Anthropic Claude
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
```

## Repository Structure

```
apps/
  registry/       Next.js docs site + component registry (genui.syntave.com)
  playground/     Interactive JSON playground for testing components
packages/
  schemas/        Zod schemas for LLM intent + resolved props
  runtime/        <GenerativeUI> component + resolvePayload() server module
  ui/             49 React components (GenUI + primitives)
  cli/            npx genui CLI tool
```

## Security

- **No eval()** — Zero dynamic code generation. All components are pre-built.
- **Zod validation** — LLM output is validated against schemas at every trust boundary.
- **Object.hasOwn()** — Prototype-safe allowlist lookups.
- **spawnSync with arrays** — No shell injection in CLI tool.
- **Allowlisted data sources** — The LLM cannot access arbitrary data; only registered handlers.
- **Monochrome DOM** — LLM cannot inject arbitrary CSS or HTML (no `dangerouslySetInnerHTML` in runtime).

Full security audit: [docs/04_DATA_RESOLUTION_AND_SECURITY.md](./docs/04_DATA_RESOLUTION_AND_SECURITY.md)

## License

[MIT](./LICENSE)
