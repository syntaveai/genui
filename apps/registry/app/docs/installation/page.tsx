import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { CopyButton } from "../../../components/copy-button";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Syntave GenUI components via npm and CLI. Get started with @syntave/schemas, @syntave/runtime, @syntave/cli, and @syntave/ui.",
  openGraph: {
    title: "Installation | Syntave GenUI",
    description:
      "Install Syntave GenUI — npm packages and CLI tool for Generative UI components.",
    url: "https://genuui.syntave.com/docs/installation",
  },
};

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
  { name: "@syntave/ui", desc: "All 57 UI primitives and GenUI components." },
];

function DarkCodeBlock({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="border-syntave-200 bg-syntave-950 group relative overflow-hidden rounded-xl border">
      <CopyButton text={code} />
      <pre className="text-syntave-200 overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

const INSTALL_CODE = `npm install @syntave/schemas @syntave/runtime @syntave/cli @syntave/ui`;

const CLI_CODE = `# Install GenUI components (LLM-driven)
npx genui add metric-card data-table fallback-message pie-chart progress-bar

# Install primitives
npx genui add card button badge dialog toast

# Install everything at once
npx genui add --all

# List available components
npx genui list

# Regenerate component map from components.json
npx genui init`;

const API_ROUTE_CODE = `import { NextRequest, NextResponse } from "next/server";
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
}`;

const ENV_CODE = `# OpenAI (default)
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
ANTHROPIC_MODEL=claude-3-5-haiku-latest`;

const CLIENT_CODE = `"use client";
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
}`;

export default function DocsInstallationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-syntave-900 text-3xl font-semibold tracking-tight">
          Installation
        </h1>
        <p className="text-syntave-500 mt-3 text-base leading-relaxed">
          Add Syntave GenUI to your Next.js project in minutes.
        </p>
      </div>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            1
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Install packages
          </h2>
        </div>
        <DarkCodeBlock code={INSTALL_CODE}>{INSTALL_CODE}</DarkCodeBlock>
        <div className="grid gap-4 sm:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="border-syntave-200 flex items-start gap-4 rounded-2xl border bg-white p-5"
            >
              <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-syntave-900 font-mono text-sm font-semibold">
                  {pkg.name}
                </h3>
                <p className="text-syntave-500 mt-1 text-xs leading-relaxed">
                  {pkg.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            2
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Add components
          </h2>
        </div>
        <p className="text-syntave-600 text-sm leading-relaxed">
          Use the CLI to download components into your project. You can install
          individual components, multiple at once, or everything:
        </p>
        <DarkCodeBlock code={CLI_CODE}>{CLI_CODE}</DarkCodeBlock>
        <p className="text-syntave-600 text-sm leading-relaxed">
          The CLI auto-generates a{" "}
          <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
            src/components/genui.ts
          </code>{" "}
          file with a typed{" "}
          <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
            componentMap
          </code>
          . Run{" "}
          <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
            npx genui list
          </code>{" "}
          to see all 57 components with install status.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            3
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Set up the API route
          </h2>
        </div>
        <p className="text-syntave-600 text-sm leading-relaxed">
          Create an API route that calls the LLM and resolves the data. The
          route fetches MCP tool definitions from the registry, calls the LLM,
          validates the response against Zod schemas, and resolves data sources:
        </p>
        <DarkCodeBlock code={API_ROUTE_CODE}>{API_ROUTE_CODE}</DarkCodeBlock>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            4
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Multi-provider LLM support
          </h2>
        </div>
        <p className="text-syntave-600 text-sm leading-relaxed">
          Configure different LLM providers via environment variables:
        </p>
        <DarkCodeBlock code={ENV_CODE}>{ENV_CODE}</DarkCodeBlock>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            5
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Connect the client
          </h2>
        </div>
        <p className="text-syntave-600 text-sm leading-relaxed">
          Use{" "}
          <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
            GenerativeUI
          </code>{" "}
          with your component map on the client:
        </p>
        <DarkCodeBlock code={CLIENT_CODE}>{CLIENT_CODE}</DarkCodeBlock>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="bg-syntave-950 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
            6
          </span>
          <h2 className="text-syntave-900 text-lg font-semibold">
            Available components
          </h2>
        </div>
        <p className="text-syntave-600 text-sm leading-relaxed">
          GenUI ships with <strong>57 components</strong> — 5 GenUI components
          (LLM-driven with Zod schemas) and 44 primitives. Browse the full list
          with{" "}
          <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
            npx genui list
          </code>{" "}
          or visit the component docs.
        </p>
        <Link
          href="/docs"
          className="bg-syntave-950 hover:bg-syntave-800 group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all"
        >
          View all components
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>
    </div>
  );
}
