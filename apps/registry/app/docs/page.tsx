import Link from "next/link";

export default function DocsIntroductionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-inter text-3xl font-semibold tracking-tight text-gray-900">
          Introduction
        </h1>
        <p className="mt-2 text-gray-500">
          Syntave GenUI is a Generative UI framework that lets LLMs render real,
          type-safe React components through a registry-driven model.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          How it works
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-gray-600">
          <p>
            The LLM outputs a structured JSON payload describing the UI it wants
            to render. The backend resolver validates data source references
            against an allowlist, injects real data, and hands the resolved
            payload to the{" "}
            <code className="font-mono text-gray-800">
              &lt;GenerativeUI /&gt;
            </code>{" "}
            mapper.
          </p>
          <p>
            Components live in your project as local source code &mdash;
            downloaded via the CLI, owned by you, and fully customizable. No
            runtime bundles, no lock-in.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          Architecture
        </h2>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-loose text-gray-700">
          <div>User Prompt</div>
          <div className="pl-4 text-gray-400">&darr;</div>
          <div className="pl-4">LLM outputs Intent (LLMSchema)</div>
          <div className="pl-4 text-gray-400">&darr;</div>
          <div className="pl-4">Backend Resolver validates + injects data</div>
          <div className="pl-4 text-gray-400">&darr;</div>
          <div className="pl-4">
            &lt;GenerativeUI /&gt; maps type to component
          </div>
          <div className="pl-4 text-gray-400">&darr;</div>
          <div className="pl-4">React Component renders</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          Quick start
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-gray-600">
          <p>Install a GenUI component in your Next.js project:</p>
          <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
            npx genui add metric-card
          </pre>
          <p>Create a component map and render:</p>
          <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
            {`import { GenerativeUI } from "@syntave/runtime";
import { componentMap } from "@/components/genui";

<GenerativeUI
  payload={resolvedPayload}
  componentMap={componentMap}
/>`}
          </pre>
          <Link
            href="/docs/installation"
            className="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Read installation guide
          </Link>
        </div>
      </section>
    </div>
  );
}
