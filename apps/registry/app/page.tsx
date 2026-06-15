import Link from "next/link";

const FEATURES = [
  {
    title: "LLM-Driven UI",
    desc: "Components with Zod schemas that LLMs call via tool calling. Structured intent output, no hallucinated data.",
  },
  {
    title: "49 Components",
    desc: "5 GenUI components + 44 primitives. All monochrome, accessible, and tested.",
  },
  {
    title: "Data Resolution",
    desc: "Allowlisted data sources. The LLM outputs intent, your backend injects real data via resolvePayload().",
  },
  {
    title: "Multi-LLM Support",
    desc: "OpenAI, Anthropic Claude, DeepSeek, OpenRouter, Groq — any OpenAI-compatible or Anthropic provider.",
  },
  {
    title: "CLI Tool",
    desc: "Install components with npx genui add. Supports batch install, --all, and component listing.",
  },
  {
    title: "Security First",
    desc: "No eval(), no dynamic component generation. Zod validation at every trust boundary. Object.hasOwn() allowlists.",
  },
];

const GENUI_COMPONENTS = [
  {
    name: "MetricCard",
    desc: "Single KPI with title, value, trend",
    href: "/docs/metric-card",
  },
  {
    name: "DataTable",
    desc: "Structured table with columns",
    href: "/docs/data-table",
  },
  {
    name: "FallbackMessage",
    desc: "Empty, error, info states",
    href: "/docs/fallback-message",
  },
  {
    name: "PieChart",
    desc: "Monochrome SVG pie chart",
    href: "/docs/pie-chart",
  },
  {
    name: "ProgressBar",
    desc: "Bar with label and percentage",
    href: "/docs/progress-bar",
  },
];

const PRIMITIVE_CATEGORIES = [
  {
    label: "Layout",
    items: [
      "Card",
      "Table",
      "Separator",
      "ScrollArea",
      "AspectRatio",
      "Resizable",
    ],
  },
  {
    label: "Navigation",
    items: [
      "Accordion",
      "Tabs",
      "Breadcrumb",
      "Pagination",
      "NavigationMenu",
      "Menubar",
      "Sidebar",
    ],
  },
  {
    label: "Overlays",
    items: [
      "Dialog",
      "AlertDialog",
      "Sheet",
      "Drawer",
      "Popover",
      "Tooltip",
      "HoverCard",
      "DropdownMenu",
      "ContextMenu",
      "Command",
    ],
  },
  {
    label: "Forms",
    items: [
      "Button",
      "Input",
      "Select",
      "Checkbox",
      "Switch",
      "RadioGroup",
      "Slider",
      "Toggle",
      "Combobox",
      "Calendar",
      "DatePicker",
    ],
  },
  {
    label: "Display",
    items: [
      "Text",
      "Badge",
      "Avatar",
      "Skeleton",
      "Spinner",
      "Icon",
      "Kbd",
      "Toast",
      "Alert",
      "Carousel",
    ],
  },
];

export default function RegistryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="font-inter text-5xl font-semibold tracking-tight text-gray-900">
            Syntave GenUI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            A component registry and runtime for building AI-driven user
            interfaces. LLMs output structured intent — your backend resolves
            data, our components render it.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/docs/installation"
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/syntaveai/genui"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              GitHub
            </a>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left font-mono text-sm text-gray-800">
            <p className="text-gray-400"># Install in your project</p>
            <p>
              npm install @syntave/schemas @syntave/runtime @syntave/cli
              @syntave/ui
            </p>
            <p className="mt-1 text-gray-400"># Add components</p>
            <p>npx genui add metric-card data-table fallback-message</p>
            <p className="mt-1 text-gray-400"># Or install everything</p>
            <p>npx genui add --all</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-gray-200 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Why GenUI?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-gray-200 p-5"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-b border-gray-200 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            How It Works
          </h2>
          <div className="mt-8 space-y-4">
            {[
              {
                step: "1",
                title: "Register data sources",
                desc: "Define allowlisted handlers in your backend. Each handler returns typed data (revenue, user counts, etc.).",
              },
              {
                step: "2",
                title: "LLM outputs intent",
                desc: "The LLM calls MCP tools matching your component schemas. It outputs { type, props, dataSource } — never raw data.",
              },
              {
                step: "3",
                title: "Backend resolves payload",
                desc: "resolvePayload() validates the intent against Zod schemas, calls the handler, and injects real data.",
              },
              {
                step: "4",
                title: "GenerativeUI renders",
                desc: "The resolved payload is passed to <GenerativeUI> which maps the type to the matching React component.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex gap-4 rounded-lg border border-gray-200 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GenUI Components */}
      <section className="border-b border-gray-200 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            GenUI Components
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            LLM-driven components with Zod schemas and MCP tool definitions.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENUI_COMPONENTS.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section className="border-b border-gray-200 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            44 Primitives
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Monochrome, accessible, tested. The foundation for your UI.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRIMITIVE_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="rounded-lg border border-gray-200 p-4"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {cat.label}
                </h3>
                <ul className="mt-3 space-y-1">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/docs/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-sm text-gray-400">
          <p>Syntave GenUI</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-gray-600">
              Docs
            </Link>
            <Link href="/privacy" className="hover:text-gray-600">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-600">
              Terms
            </Link>
            <a
              href="https://github.com/syntaveai/genui"
              className="hover:text-gray-600"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
