import Link from "next/link";

const PACKAGES = [
  {
    name: "@syntave/schemas",
    desc: "Zod schemas for LLM intent validation and props resolution.",
  },
  {
    name: "@syntave/runtime",
    desc: "The <GenerativeUI /> mapper and server-side data resolver.",
  },
  {
    name: "@syntave/cli",
    desc: "CLI tool to download and install components into your project.",
  },
  { name: "@syntave/ui", desc: "All 49 UI primitives and GenUI components." },
];

export default function DocsInstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-inter text-3xl font-semibold tracking-tight text-gray-900">
          Installation
        </h1>
        <p className="mt-2 text-gray-500">
          Add Syntave GenUI to your Next.js project in minutes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          1. Install packages
        </h2>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`npm install @syntave/schemas @syntave/runtime @syntave/cli @syntave/ui`}
        </pre>
        <div className="grid gap-3 sm:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-lg border border-gray-200 p-4"
            >
              <h3 className="font-inter text-sm font-semibold text-gray-900">
                {pkg.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{pkg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          2. Add components
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Use the CLI to download components into your project. You can install
          individual components, multiple at once, or everything:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`# Install GenUI components (LLM-driven)
npx genui add metric-card data-table fallback-message pie-chart progress-bar

# Install primitives
npx genui add card button badge dialog toast

# Install everything at once
npx genui add --all

# List available components
npx genui list

# Regenerate component map from components.json
npx genui init`}
        </pre>
        <p className="text-sm leading-relaxed text-gray-600">
          The CLI auto-generates a{" "}
          <code className="font-mono text-gray-800">
            src/components/genui.ts
          </code>{" "}
          file with a typed{" "}
          <code className="font-mono text-gray-800">componentMap</code>. Run{" "}
          <code className="font-mono text-gray-800">npx genui list</code> to see
          all 49 components with install status.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          3. Set up the API route
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Create an API route that calls the LLM and resolves the data. The
          route fetches MCP tool definitions from the registry, calls the LLM,
          validates the response against Zod schemas, and resolves data sources:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`import { NextRequest, NextResponse } from "next/server";
import { resolvePayload } from "@syntave/runtime/server";
import {
  MetricCardLLMSchema, DataTableLLMSchema,
  FallbackMessageLLMSchema,
} from "@syntave/schemas";

const LLM_SCHEMAS = {
  MetricCard: MetricCardLLMSchema,
  DataTable: DataTableLLMSchema,
  FallbackMessage: FallbackMessageLLMSchema,
};

const COMPONENT_MAP = {
  render_metric_card: "MetricCard",
  render_data_table: "DataTable",
  render_fallback_message: "FallbackMessage",
};

async function loadTools() {
  const tools = [];
  for (const name of ["metric-card", "data-table", "fallback-message"]) {
    const res = await fetch(\`https://genui.syntave.com/r/\${name}.json\`);
    const json = await res.json();
    const mcp = json.meta?.mcp_tool_definition;
    if (mcp) tools.push({ type: "function", function: mcp });
  }
  return tools;
}

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  const tools = await loadTools();
  const apiKey = process.env.LLM_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: \`Bearer \${apiKey}\` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You MUST call a tool. NEVER respond with text." },
        { role: "user", content: prompt },
      ],
      tools, tool_choice: "auto",
    }),
  });

  const toolCall = (await response.json())?.choices?.[0]?.message?.tool_calls?.[0];
  const rawArgs = JSON.parse(toolCall.function.arguments);
  const componentType = COMPONENT_MAP[toolCall.function.name];
  const { props } = LLM_SCHEMAS[componentType].parse({ type: componentType, props: rawArgs });
  const resolved = await resolvePayload({ type: componentType, props }, YOUR_DATA_SOURCES);
  return NextResponse.json({ payload: resolved });
}`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          4. Multi-provider LLM support
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Configure different LLM providers via environment variables:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`# OpenAI (default)
LLM_PROVIDER=openai
LLM_API_KEY=sk-...
LLM_MODEL=gpt-4o-mini

# DeepSeek / OpenRouter / Groq (OpenAI-compatible)
LLM_PROVIDER=openai-compatible
LLM_API_KEY=sk-...
LLM_BASE_URL=https://api.deepseek.com/v1
LLM_MODEL=deepseek-chat

# Anthropic Claude
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-haiku-latest`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          5. Connect the client
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Use <code className="font-mono text-gray-800">GenerativeUI</code> with
          your component map on the client:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`"use client";
import { GenerativeUI } from "@syntave/runtime";
import { componentMap } from "@/components/genui";

export function AIPanel() {
  const [payload, setPayload] = useState(null);

  const handlePrompt = async (prompt: string) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const { payload } = await res.json();
    setPayload(payload);
  };

  return <GenerativeUI payload={payload} componentMap={componentMap} />;
}`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          6. Available components
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          GenUI ships with <strong>49 components</strong> — 5 GenUI components
          (LLM-driven with Zod schemas) and 44 primitives. Browse the full list
          with <code className="font-mono text-gray-800">npx genui list</code>{" "}
          or visit the component docs.
        </p>
        <p className="text-sm leading-relaxed text-gray-600">
          <Link
            href="/docs"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            View all components →
          </Link>
        </p>
      </section>
    </div>
  );
}
