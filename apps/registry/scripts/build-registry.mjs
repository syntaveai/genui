import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Project } from "ts-morph";
import { zodToJsonSchema } from "zod-to-json-schema";

import {
  MetricCardLLMSchema,
  DataTableLLMSchema,
  FallbackMessageLLMSchema,
  PieChartLLMSchema,
  ProgressBarLLMSchema,
} from "@syntave/schemas";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const UI_SRC = resolve(ROOT, "../../packages/ui/src");
const PUBLIC_R = resolve(ROOT, "public/r");

const SCHEMAS = {
  "metric-card": MetricCardLLMSchema,
  "data-table": DataTableLLMSchema,
  "fallback-message": FallbackMessageLLMSchema,
  "pie-chart": PieChartLLMSchema,
  "progress-bar": ProgressBarLLMSchema,
};

const REGISTRY = [
  {
    name: "metric-card",
    componentFile: "metric-card.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "Displays a single KPI with optional trend data.",
  },
  {
    name: "data-table",
    componentFile: "data-table.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "Displays structured tabular data with defined columns.",
  },
  {
    name: "fallback-message",
    componentFile: "fallback-message.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A graceful UI state for when data is unavailable or a request cannot be fulfilled.",
  },
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
  {
    name: "pie-chart",
    componentFile: "pie-chart.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A monochrome SVG pie chart with labeled segments and percentage labels.",
  },
  {
    name: "progress-bar",
    componentFile: "progress-bar.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A horizontal progress bar with label, value, and percentage display.",
  },
  {
    name: "alert",
    componentFile: "alert.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A callout for user attention with info, success, warning, and error variants.",
  },
  {
    name: "checkbox",
    componentFile: "checkbox.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A control that allows the user to toggle between checked and not checked.",
  },
  {
    name: "dialog",
    componentFile: "dialog.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A modal dialog with header, title, description, and footer sections.",
  },
  {
    name: "select",
    componentFile: "select.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A custom select dropdown with option list and keyboard navigation.",
  },
  {
    name: "switch",
    componentFile: "switch.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A toggle switch control for binary settings.",
  },
  {
    name: "tabs",
    componentFile: "tabs.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A set of layered sections of content displayed one at a time via tab triggers.",
  },
  {
    name: "accordion",
    componentFile: "accordion.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
  },
  {
    name: "collapsible",
    componentFile: "collapsible.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "An interactive component which expands/collapses a panel.",
  },
  {
    name: "popover",
    componentFile: "popover.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "Displays rich content in a portal, triggered by a button.",
  },
  {
    name: "tooltip",
    componentFile: "tooltip.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "A popup that displays information related to an element on hover or focus.",
  },
  {
    name: "sheet",
    componentFile: "sheet.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A slide-in panel from the left or right edge of the screen.",
  },
  {
    name: "drawer",
    componentFile: "drawer.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A slide-up panel from the bottom of the screen with a drag handle.",
  },
  {
    name: "slider",
    componentFile: "slider.tsx",
    dependencies: ["clsx", "tailwind-merge"],
    description: "An input where the user selects a value from within a given range.",
  },
  {
    name: "radio-group",
    componentFile: "radio-group.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A set of checkable radio buttons where no more than one can be checked.",
  },
  {
    name: "native-select",
    componentFile: "native-select.tsx",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    description: "A styled native HTML select element with consistent design system integration.",
  },
];

function readSource(filePath) {
  return readFileSync(filePath, "utf-8");
}

function transformImports(sourceCode, componentName) {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(`${componentName}.tsx`, sourceCode);

  sourceFile.getImportDeclarations().forEach((imp) => {
    const moduleSpecifier = imp.getModuleSpecifierValue();

    if (moduleSpecifier.includes("/lib/utils") || moduleSpecifier === "./lib/utils") {
      imp.setModuleSpecifier("@/lib/utils");
    }

    if (moduleSpecifier.startsWith("../") && !moduleSpecifier.startsWith("./")) {
      console.warn(`Warning: ${componentName} has relative import "${moduleSpecifier}" — may need manual review`);
    }
  });

  return sourceFile.getFullText();
}

function generateMCPDefinition(componentName, zodSchema) {
  if (!zodSchema) return null;

  const jsonSchema = zodToJsonSchema(zodSchema, { target: "jsonSchema7" });

  return {
    name: `render_${componentName.replace(/-/g, "_")}`,
    description: zodSchema._def.description || `Renders the ${componentName} component.`,
    parameters: jsonSchema,
  };
}

const UTILS_SOURCE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

function buildRegistry() {
  if (!existsSync(PUBLIC_R)) {
    mkdirSync(PUBLIC_R, { recursive: true });
  }

  for (const entry of REGISTRY) {
    try {
      const componentPath = resolve(UI_SRC, entry.componentFile);

      if (!existsSync(componentPath)) {
        console.error(`Missing source file: ${entry.componentFile}`);
        process.exit(1);
      }

      const rawSource = readSource(componentPath);
      const componentSource = transformImports(rawSource, entry.name);

      const zodSchema = SCHEMAS[entry.name];
      const mcp = generateMCPDefinition(entry.name, zodSchema);

      const meta = { description: entry.description };
      if (mcp) {
        meta.mcp_tool_definition = mcp;
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
    } catch (err) {
      console.error(`Failed to build ${entry.name}: ${err.message}`);
      process.exit(1);
    }
  }

  // Write utils.json so the CLI can fetch it
  const utilsRegistry = {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        content: UTILS_SOURCE,
        type: "registry:lib",
      },
    ],
    meta: {
      description: "Utility functions for class name merging with Tailwind CSS.",
    },
  };
  const utilsOutputPath = resolve(PUBLIC_R, "utils.json");
  writeFileSync(utilsOutputPath, JSON.stringify(utilsRegistry, null, 2), "utf-8");
  console.log("Generated: utils.json");
}

buildRegistry();
