import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { notFound } from "next/navigation";
import { z } from "zod";
import {
  MetricCardLLMSchema,
  MetricCardPropsSchema,
  DataTableLLMSchema,
  DataTablePropsSchema,
  FallbackMessageLLMSchema,
  FallbackMessagePropsSchema,
  PieChartLLMSchema,
  PieChartPropsSchema,
  ProgressBarLLMSchema,
  ProgressBarPropsSchema,
} from "@syntave/schemas";
import { CodeBlock } from "./code-block";
import { SchemaView } from "./schema-view";

interface Props {
  params: Promise<{ component: string }>;
}

type ComponentMeta = { label: string; isGenUI: boolean };

function buildMeta(): Record<string, ComponentMeta> {
  const genui = [
    "metric-card",
    "data-table",
    "fallback-message",
    "pie-chart",
    "progress-bar",
  ];
  const primitives = [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "avatar",
    "badge",
    "breadcrumb",
    "button",
    "button-group",
    "calendar",
    "card",
    "carousel",
    "checkbox",
    "collapsible",
    "combobox",
    "command",
    "context-menu",
    "date-picker",
    "dialog",
    "drawer",
    "dropdown-menu",
    "field",
    "hover-card",
    "icon",
    "input",
    "input-group",
    "input-otp",
    "kbd",
    "label",
    "menubar",
    "native-select",
    "navigation-menu",
    "pagination",
    "popover",
    "progress-bar",
    "radio-group",
    "resizable",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "sidebar",
    "skeleton",
    "slider",
    "spinner",
    "switch",
    "table",
    "tabs",
    "text",
    "toast",
    "toggle",
    "toggle-group",
    "tooltip",
  ];
  const labels: Record<string, string> = {
    "metric-card": "MetricCard",
    "data-table": "DataTable",
    "fallback-message": "FallbackMessage",
    "pie-chart": "PieChart",
    "progress-bar": "ProgressBar",
    accordion: "Accordion",
    alert: "Alert",
    "alert-dialog": "AlertDialog",
    "aspect-ratio": "AspectRatio",
    avatar: "Avatar",
    badge: "Badge",
    breadcrumb: "Breadcrumb",
    button: "Button",
    "button-group": "ButtonGroup",
    calendar: "Calendar",
    card: "Card",
    carousel: "Carousel",
    checkbox: "Checkbox",
    collapsible: "Collapsible",
    combobox: "Combobox",
    command: "Command",
    "context-menu": "ContextMenu",
    "date-picker": "DatePicker",
    dialog: "Dialog",
    drawer: "Drawer",
    "dropdown-menu": "DropdownMenu",
    field: "Field",
    "hover-card": "HoverCard",
    icon: "Icon",
    input: "Input",
    "input-group": "InputGroup",
    "input-otp": "InputOTP",
    kbd: "Kbd",
    label: "Label",
    menubar: "Menubar",
    "native-select": "NativeSelect",
    "navigation-menu": "NavigationMenu",
    pagination: "Pagination",
    popover: "Popover",
    "radio-group": "RadioGroup",
    resizable: "Resizable",
    "scroll-area": "ScrollArea",
    select: "Select",
    separator: "Separator",
    sheet: "Sheet",
    sidebar: "Sidebar",
    skeleton: "Skeleton",
    slider: "Slider",
    spinner: "Spinner",
    switch: "Switch",
    table: "Table",
    tabs: "Tabs",
    text: "Text",
    toast: "Toast",
    toggle: "Toggle",
    "toggle-group": "ToggleGroup",
    tooltip: "Tooltip",
  };
  const meta: Record<string, ComponentMeta> = {};
  for (const g of genui) meta[g] = { label: labels[g] ?? g, isGenUI: true };
  for (const p of primitives)
    meta[p] = { label: labels[p] ?? p, isGenUI: false };
  return meta;
}

const COMPONENT_META = buildMeta();

const SCHEMA_MAP: Record<string, { llm: string; props: string }> = {
  "metric-card": {
    llm: describeZod(MetricCardLLMSchema),
    props: describeZod(MetricCardPropsSchema),
  },
  "data-table": {
    llm: describeZod(DataTableLLMSchema),
    props: describeZod(DataTablePropsSchema),
  },
  "fallback-message": {
    llm: describeZod(FallbackMessageLLMSchema),
    props: describeZod(FallbackMessagePropsSchema),
  },
  "pie-chart": {
    llm: describeZod(PieChartLLMSchema),
    props: describeZod(PieChartPropsSchema),
  },
  "progress-bar": {
    llm: describeZod(ProgressBarLLMSchema),
    props: describeZod(ProgressBarPropsSchema),
  },
};

function describeZod(raw: unknown): string {
  function walk(schema: unknown, depth = 0): string {
    if (!(schema instanceof z.ZodType)) return "unknown";
    if (schema instanceof z.ZodString)
      return `string${schema.description ? `  // ${schema.description}` : ""}`;
    if (schema instanceof z.ZodNumber)
      return `number${schema.description ? `  // ${schema.description}` : ""}`;
    if (schema instanceof z.ZodBoolean)
      return `boolean${schema.description ? `  // ${schema.description}` : ""}`;
    if (schema instanceof z.ZodEnum)
      return `"${schema._def.values.join(" | ")}"${schema.description ? `  // ${schema.description}` : ""}`;
    if (schema instanceof z.ZodLiteral)
      return `"${String(schema._def.value)}"${schema.description ? `  // ${schema.description}` : ""}`;
    if (schema instanceof z.ZodOptional)
      return `${walk(schema._def.innerType, depth)} (optional)`;
    if (schema instanceof z.ZodArray)
      return `${walk(schema._def.type, depth)}[]`;
    if (schema instanceof z.ZodRecord)
      return `Record<string, ${walk(schema._def.valueType, depth)}>`;
    if (schema instanceof z.ZodUnion)
      return schema._def.options
        .map((o: z.ZodType) => walk(o, depth))
        .join(" | ");
    if (schema instanceof z.ZodObject) {
      if (depth > 2) return "{ ... }";
      const shape = schema._def.shape();
      const entries = Object.entries(shape).map(
        ([key, val]) => `  ${key}: ${walk(val as z.ZodType, depth + 1)}`,
      );
      return `{\n${entries.join(",\n")}\n}`;
    }
    return String(schema.constructor.name ?? "unknown");
  }
  return walk(raw);
}

function getRegistryData(component: string) {
  const filePath = resolve(process.cwd(), "public", "r", `${component}.json`);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

export function generateStaticParams() {
  return Object.keys(COMPONENT_META).map((component) => ({ component }));
}

export default async function ComponentDocPage({ params }: Props) {
  const { component } = await params;
  const meta = COMPONENT_META[component];
  if (!meta) notFound();

  const registry = getRegistryData(component);
  if (!registry) notFound();

  const code = registry.files[0]?.content ?? "";
  const deps: string[] = registry.dependencies ?? [];
  const description: string = registry.meta?.description ?? "";
  const schemas = SCHEMA_MAP[component];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-inter text-3xl font-semibold tracking-tight text-gray-900">
            {meta.label}
          </h1>
          {meta.isGenUI && (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500">
              GenUI
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>

      {deps.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-inter text-lg font-semibold text-gray-800">
            Dependencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {deps.map((dep) => (
              <span
                key={dep}
                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs text-gray-600"
              >
                {dep}
              </span>
            ))}
          </div>
        </section>
      )}

      {schemas && (
        <section className="space-y-4">
          <h2 className="font-inter text-lg font-semibold text-gray-800">
            Schema
          </h2>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h3 className="font-inter text-sm font-medium text-gray-500">
                LLM Schema (Intent)
              </h3>
              <SchemaView text={schemas.llm} />
            </div>
            <div className="space-y-2">
              <h3 className="font-inter text-sm font-medium text-gray-500">
                Props Schema (Resolved)
              </h3>
              <SchemaView text={schemas.props} />
            </div>
          </div>
        </section>
      )}

      {!schemas && (
        <section className="space-y-2">
          <h2 className="font-inter text-lg font-semibold text-gray-800">
            Props
          </h2>
          <p className="text-sm text-gray-500">
            This is a base primitive. It accepts standard HTML attributes plus{" "}
            <code className="font-mono text-gray-800">className</code> for
            styling via <code className="font-mono text-gray-800">cn()</code>.
          </p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-inter text-lg font-semibold text-gray-800">
          Source
        </h2>
        <CodeBlock code={code} />
      </section>

      <section className="space-y-3">
        <h2 className="font-inter text-lg font-semibold text-gray-800">CLI</h2>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          npx genui add {component}
        </pre>
      </section>
    </div>
  );
}
