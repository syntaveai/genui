import Link from "next/link";
import { ArrowRight, Boxes, Shield, Workflow, Terminal } from "lucide-react";

export default function DocsIntroductionPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-syntave-900 text-3xl font-semibold tracking-tight">
          Introduction
        </h1>
        <p className="text-syntave-500 mt-3 text-base leading-relaxed">
          Syntave GenUI is a Generative UI framework that lets LLMs render real,
          type-safe React components through a registry-driven model.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="border-syntave-200 hover:border-syntave-300 rounded-2xl border bg-white p-6 transition-all hover:shadow-sm">
          <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Workflow className="h-5 w-5" />
          </div>
          <h3 className="text-syntave-900 mt-4 text-sm font-semibold">
            Registry-driven
          </h3>
          <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
            Components live in your project as local source code — downloaded
            via the CLI, owned by you, and fully customizable.
          </p>
        </div>
        <div className="border-syntave-200 hover:border-syntave-300 rounded-2xl border bg-white p-6 transition-all hover:shadow-sm">
          <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-syntave-900 mt-4 text-sm font-semibold">
            Type-safe
          </h3>
          <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
            Zod schemas validate LLM output at every boundary. No runtime
            surprises, no hallucinated props.
          </p>
        </div>
        <div className="border-syntave-200 hover:border-syntave-300 rounded-2xl border bg-white p-6 transition-all hover:shadow-sm">
          <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Boxes className="h-5 w-5" />
          </div>
          <h3 className="text-syntave-900 mt-4 text-sm font-semibold">
            57 Components
          </h3>
          <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
            5 GenUI components with LLM schemas and 44 base primitives. All
            monochrome, accessible, and tested.
          </p>
        </div>
        <div className="border-syntave-200 hover:border-syntave-300 rounded-2xl border bg-white p-6 transition-all hover:shadow-sm">
          <div className="border-syntave-200 bg-syntave-50 text-syntave-700 flex h-10 w-10 items-center justify-center rounded-lg border">
            <Terminal className="h-5 w-5" />
          </div>
          <h3 className="text-syntave-900 mt-4 text-sm font-semibold">
            CLI First
          </h3>
          <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
            Install components with a single command. The CLI generates typed
            component maps automatically.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-syntave-900 text-xl font-semibold">How it works</h2>
        <div className="text-syntave-600 space-y-3 text-sm leading-relaxed">
          <p>
            The LLM outputs a structured JSON payload describing the UI it wants
            to render. The backend resolver validates data source references
            against an allowlist, injects real data, and hands the resolved
            payload to the{" "}
            <code className="bg-syntave-100 text-syntave-800 rounded px-1.5 py-0.5 font-mono text-xs">
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
        <h2 className="text-syntave-900 text-xl font-semibold">Architecture</h2>
        <div className="border-syntave-200 bg-syntave-950 text-syntave-300 overflow-hidden rounded-2xl border p-6 font-mono text-xs leading-loose">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
              1
            </span>
            <span>User Prompt</span>
          </div>
          <div className="text-syntave-500 ml-3 h-6 border-l border-white/10 pl-3">
            &darr;
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
              2
            </span>
            <span>LLM outputs Intent (LLMSchema)</span>
          </div>
          <div className="text-syntave-500 ml-3 h-6 border-l border-white/10 pl-3">
            &darr;
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
              3
            </span>
            <span>Backend Resolver validates + injects data</span>
          </div>
          <div className="text-syntave-500 ml-3 h-6 border-l border-white/10 pl-3">
            &darr;
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
              4
            </span>
            <span>&lt;GenerativeUI /&gt; maps type to component</span>
          </div>
          <div className="text-syntave-500 ml-3 h-6 border-l border-white/10 pl-3">
            &darr;
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white">
              5
            </span>
            <span>React Component renders</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-syntave-900 text-xl font-semibold">Quick start</h2>
        <div className="text-syntave-600 space-y-3 text-sm leading-relaxed">
          <p>Install a GenUI component in your Next.js project:</p>
          <pre className="border-syntave-200 bg-syntave-950 text-syntave-200 overflow-x-auto rounded-xl border p-5 font-mono text-sm">
            npx genui add metric-card
          </pre>
          <p>Create a component map and render:</p>
          <pre className="border-syntave-200 bg-syntave-950 text-syntave-200 overflow-x-auto rounded-xl border p-5 font-mono text-sm">
            {`import { GenerativeUI } from "@syntave/runtime";
import { componentMap } from "@/components/genui";

<GenerativeUI
  payload={resolvedPayload}
  componentMap={componentMap}
/>`}
          </pre>
          <Link
            href="/docs/installation"
            className="bg-syntave-950 hover:bg-syntave-800 group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all"
          >
            Read installation guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
