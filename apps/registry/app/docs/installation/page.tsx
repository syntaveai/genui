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
        <p className="text-sm leading-relaxed text-gray-600">
          Install the core runtime packages from npm:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`npm install @syntave/schemas @syntave/runtime @syntave/cli`}
        </pre>
        <div className="grid gap-3">
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
          Use the CLI to download components into your project:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`npx genui add metric-card
npx genui add data-table
npx genui add fallback-message`}
        </pre>
        <p className="text-sm leading-relaxed text-gray-600">
          The CLI auto-generates a{" "}
          <code className="font-mono text-gray-800">
            src/components/genui.ts
          </code>{" "}
          file with a typed{" "}
          <code className="font-mono text-gray-800">componentMap</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          3. Set up the provider
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Use the <code className="font-mono text-gray-800">GenerativeUI</code>{" "}
          component with your component map:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`import { GenerativeUI } from "@syntave/runtime";
import { resolvePayload } from "@syntave/runtime/server";
import { componentMap } from "@/components/genui";

// Server: resolve LLM intent into props
const resolved = await resolvePayload(llmPayload, {
  get_revenue: {
    handler: async () => db.query("SELECT ..."),
  },
});

// Client: render the component
<GenerativeUI payload={resolved} componentMap={componentMap} />`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="font-inter text-xl font-semibold text-gray-800">
          4. Add base primitives
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Primitives provide the visual foundation for GenUI components and can
          also be used directly in your app:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
          {`npx genui add card
npx genui add button
npx genui add badge`}
        </pre>
        <p className="text-sm leading-relaxed text-gray-600">
          See the{" "}
          <Link
            href="/docs/card"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            primitives documentation
          </Link>{" "}
          for all available components.
        </p>
      </section>
    </div>
  );
}
