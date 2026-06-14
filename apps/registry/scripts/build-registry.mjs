import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const UI_SRC = resolve(ROOT, "../../packages/ui/src");
const PUBLIC_R = resolve(ROOT, "public/r");

const REGISTRY = [
  {
    name: "metric-card",
    componentFile: "metric-card.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "Displays a single KPI with optional trend data.",
    mcp: {
      name: "render_metric_card",
      description: "Use this to display a single, prominent data point like revenue, user count, or conversion rate.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "The label for the metric" },
          dataSource: { type: "string", description: "The registered data source to fetch real data from" },
          dataSourceParams: { type: "object", description: "Optional parameters for the data source" },
        },
        required: ["title", "dataSource"],
      },
    },
  },
  {
    name: "data-table",
    componentFile: "data-table.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "Displays structured tabular data with defined columns.",
    mcp: {
      name: "render_data_table",
      description: "Use this to display a list or breakdown of multiple items in a structured table format.",
      parameters: {
        type: "object",
        properties: {
          columns: {
            type: "array",
            description: "Array of column definitions with header and accessorKey",
            items: {
              type: "object",
              properties: {
                header: { type: "string" },
                accessorKey: { type: "string" },
              },
              required: ["header", "accessorKey"],
            },
          },
          dataSource: { type: "string", description: "The registered data source to fetch table rows from" },
          dataSourceParams: { type: "object", description: "Optional filters for the data source" },
        },
        required: ["columns", "dataSource"],
      },
    },
  },
  {
    name: "fallback-message",
    componentFile: "fallback-message.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A graceful UI state for when data is unavailable or a request cannot be fulfilled.",
    mcp: {
      name: "render_fallback_message",
      description: "Use this ONLY when you cannot fulfill the user's request with available data sources. Do not use for normal conversational responses.",
      parameters: {
        type: "object",
        properties: {
          message: { type: "string", description: "The explanation of why the request cannot be fulfilled" },
          variant: { type: "string", enum: ["empty", "error", "info"], description: "The visual style of the fallback" },
        },
        required: ["message"],
      },
    },
  },
  // Base Primitives
  {
    name: "card",
    componentFile: "card.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A foundational container component with header, title, description, content, and footer sections.",
  },
  {
    name: "table",
    componentFile: "table.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A responsive table primitive with header, body, row, head, and cell sub-components.",
  },
  {
    name: "separator",
    componentFile: "separator.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A horizontal or vertical divider line.",
  },
  {
    name: "text",
    componentFile: "text.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A typography primitive with predefined variants (h1, h2, h3, body, muted, code).",
  },
  {
    name: "badge",
    componentFile: "badge.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A badge/tag primitive with variants for default, secondary, outline, success, and destructive.",
  },
  {
    name: "skeleton",
    componentFile: "skeleton.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A loading placeholder primitive with subtle pulse animation.",
  },
  {
    name: "button",
    componentFile: "button.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A button primitive with variants for default, secondary, outline, and ghost.",
  },
  {
    name: "input",
    componentFile: "input.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "Form input and textarea primitives with consistent styling.",
  },
  {
    name: "icon",
    componentFile: "icon.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A standardized wrapper for lucide-react icons with consistent sizing and coloring.",
  },
];

function readSource(filePath) {
  return readFileSync(filePath, "utf-8");
}

function transformImports(source, componentName) {
  return source.replace(
    /from\s+["']\.\/lib\/utils["']/g,
    'from "@/lib/utils"',
  );
}

function buildRegistry() {
  if (!existsSync(PUBLIC_R)) {
    mkdirSync(PUBLIC_R, { recursive: true });
  }

  for (const entry of REGISTRY) {
    const componentPath = resolve(UI_SRC, entry.componentFile);
    const rawSource = readSource(componentPath);
    const componentSource = transformImports(rawSource, entry.name);

    const meta = { description: entry.description };
    if (entry.mcp) {
      meta.mcp_tool_definition = entry.mcp;
    }

    const registry = {
      name: entry.name,
      type: "registry:ui",
      dependencies: entry.dependencies,
      files: [
        {
          path: `ui/${entry.componentFile}`,
          content: componentSource,
          type: "registry:ui",
        },
      ],
      meta,
    };

    const outputPath = resolve(PUBLIC_R, `${entry.name}.json`);
    writeFileSync(outputPath, JSON.stringify(registry, null, 2), "utf-8");
    console.log(`Generated: ${entry.name}.json`);
  }
}

buildRegistry();
