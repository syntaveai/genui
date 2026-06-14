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
} from "@syntave/schemas";
import { CodeBlock } from "./code-block";
import { SchemaView } from "./schema-view";

interface Props {
  params: Promise<{ component: string }>;
}

const COMPONENT_META: Record<string, { label: string; isGenUI: boolean }> = {
  "metric-card": { label: "MetricCard", isGenUI: true },
  "data-table": { label: "DataTable", isGenUI: true },
  "fallback-message": { label: "FallbackMessage", isGenUI: true },
  card: { label: "Card", isGenUI: false },
  table: { label: "Table", isGenUI: false },
  separator: { label: "Separator", isGenUI: false },
  text: { label: "Text", isGenUI: false },
  badge: { label: "Badge", isGenUI: false },
  skeleton: { label: "Skeleton", isGenUI: false },
  button: { label: "Button", isGenUI: false },
  input: { label: "Input", isGenUI: false },
  icon: { label: "Icon", isGenUI: false },
};

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
