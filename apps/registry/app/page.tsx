import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Layers,
  Shield,
  Cpu,
  Terminal,
  Lock,
  ChevronRight,
  Github,
  BookOpen,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "LLM-Driven UI",
    desc: "Components with Zod schemas that LLMs call via tool calling. Structured intent output, no hallucinated data.",
  },
  {
    icon: Layers,
    title: "49 Components",
    desc: "5 GenUI components + 44 primitives. All monochrome, accessible, and comprehensively tested.",
  },
  {
    icon: Cpu,
    title: "Data Resolution",
    desc: "Allowlisted data sources. The LLM outputs intent, your backend injects real data via resolvePayload().",
  },
  {
    icon: Zap,
    title: "Multi-LLM Support",
    desc: "OpenAI, Anthropic Claude, DeepSeek, OpenRouter, Groq — any OpenAI-compatible or Anthropic provider.",
  },
  {
    icon: Terminal,
    title: "CLI Tool",
    desc: "Install components with npx genui add. Supports batch install, --all, and component listing.",
  },
  {
    icon: Lock,
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

const STEPS = [
  {
    step: "01",
    title: "Register data sources",
    desc: "Define allowlisted handlers in your backend. Each handler returns typed data (revenue, user counts, etc.).",
  },
  {
    step: "02",
    title: "LLM outputs intent",
    desc: "The LLM calls MCP tools matching your component schemas. It outputs { type, props, dataSource } — never raw data.",
  },
  {
    step: "03",
    title: "Backend resolves payload",
    desc: "resolvePayload() validates the intent against Zod schemas, calls the handler, and injects real data.",
  },
  {
    step: "04",
    title: "GenerativeUI renders",
    desc: "The resolved payload is passed to <GenerativeUI> which maps the type to the matching React component.",
  },
];

function Header() {
  return (
    <header className="bg-syntave-950/80 fixed left-0 right-0 top-0 z-50 border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <div className="text-syntave-950 flex h-6 w-6 items-center justify-center rounded bg-white">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
          </div>
          Syntave GenUI
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="/docs/installation"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Install
          </Link>
          <a
            href="https://github.com/syntaveai/genui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function RegistryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-syntave-950 relative overflow-hidden pt-14">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            v1.0 — Now with 57 components
          </div>
          <h1
            className="animate-slide-up mt-8 text-5xl font-semibold tracking-tight text-white sm:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            AI-native UI,
            <br />
            <span className="text-white/40">built for engineers.</span>
          </h1>
          <p
            className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50"
            style={{ animationDelay: "0.2s" }}
          >
            A component registry and runtime for building AI-driven user
            interfaces. LLMs output structured intent — your backend resolves
            data, our components render it.
          </p>
          <div
            className="animate-slide-up mt-10 flex items-center justify-center gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/docs/installation"
              className="text-syntave-950 group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium transition-all hover:bg-white/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              <BookOpen className="h-4 w-4" />
              Documentation
            </Link>
          </div>

          <div
            className="animate-scale-in mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="ml-2 text-xs text-white/30">terminal</span>
            </div>
            <div className="px-5 py-5 text-left font-mono text-sm leading-relaxed">
              <p className="text-white/30"># Install in your project</p>
              <p className="mt-1 text-white/70">
                npm install @syntave/schemas @syntave/runtime @syntave/cli
                @syntave/ui
              </p>
              <p className="mt-3 text-white/30"># Add components</p>
              <p className="mt-1 text-white/70">
                npx genui add metric-card data-table fallback-message
              </p>
              <p className="mt-3 text-white/30"># Or install everything</p>
              <p className="mt-1 text-white/70">npx genui add --all</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-syntave-200 relative border-b py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-syntave-400 text-sm font-semibold uppercase tracking-widest">
              Features
            </h2>
            <p className="text-syntave-900 mt-4 text-3xl font-semibold tracking-tight">
              Everything you need to ship AI interfaces
            </p>
          </div>
          <div className="bg-syntave-200 mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="hover:bg-syntave-50 group bg-white p-8 transition-colors"
              >
                <div className="border-syntave-200 bg-syntave-50 text-syntave-700 group-hover:border-syntave-300 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors group-hover:bg-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-syntave-900 mt-5 text-sm font-semibold">
                  {f.title}
                </h3>
                <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-syntave-200 border-b py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-syntave-400 text-sm font-semibold uppercase tracking-widest">
              Architecture
            </h2>
            <p className="text-syntave-900 mt-4 text-3xl font-semibold tracking-tight">
              How it works
            </p>
            <p className="text-syntave-500 mt-4">
              Four steps from user prompt to rendered UI. Secure, typed, and
              predictable.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className="border-syntave-200 hover:border-syntave-300 group relative flex gap-6 rounded-2xl border bg-white p-8 transition-all hover:shadow-sm"
              >
                <span className="bg-syntave-950 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-syntave-900 text-base font-semibold">
                    {s.title}
                  </h3>
                  <p className="text-syntave-500 mt-2 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GenUI Components */}
      <section className="border-syntave-200 border-b py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-syntave-400 text-sm font-semibold uppercase tracking-widest">
                GenUI Components
              </h2>
              <p className="text-syntave-900 mt-4 text-3xl font-semibold tracking-tight">
                LLM-driven components
              </p>
              <p className="text-syntave-500 mt-2">
                Components with Zod schemas and MCP tool definitions that LLMs
                can call directly.
              </p>
            </div>
            <Link
              href="/docs"
              className="text-syntave-900 hover:text-syntave-600 group inline-flex items-center gap-1 text-sm font-medium transition-colors"
            >
              View all components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENUI_COMPONENTS.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="border-syntave-200 hover:border-syntave-300 group relative flex flex-col rounded-2xl border bg-white p-6 transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-syntave-900 text-sm font-semibold">
                    {c.name}
                  </h3>
                  <ChevronRight className="text-syntave-300 group-hover:text-syntave-500 h-4 w-4 transition-all group-hover:translate-x-0.5" />
                </div>
                <p className="text-syntave-500 mt-2 text-sm">{c.desc}</p>
                <div className="border-syntave-200 bg-syntave-50 text-syntave-500 mt-4 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  GenUI
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section className="border-syntave-200 border-b py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-syntave-400 text-sm font-semibold uppercase tracking-widest">
              Primitives
            </h2>
            <p className="text-syntave-900 mt-4 text-3xl font-semibold tracking-tight">
              44 accessible primitives
            </p>
            <p className="text-syntave-500 mt-4">
              Monochrome, accessible, tested. The foundation for your UI.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRIMITIVE_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="border-syntave-200 rounded-2xl border bg-white p-6"
              >
                <h3 className="text-syntave-400 text-xs font-semibold uppercase tracking-widest">
                  {cat.label}
                </h3>
                <ul className="mt-4 space-y-1">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/docs/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-syntave-600 hover:bg-syntave-50 hover:text-syntave-900 group flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors"
                      >
                        {item}
                        <ChevronRight className="text-syntave-300 h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-syntave-950 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Ready to build AI-native interfaces?
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Install GenUI in minutes and start shipping components that LLMs can
            render.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/docs/installation"
              className="text-syntave-950 group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium transition-all hover:bg-white/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/syntaveai/genui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-syntave-200 border-t bg-white py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="text-syntave-900 flex items-center gap-2 text-sm font-semibold">
            <div className="bg-syntave-950 flex h-5 w-5 items-center justify-center rounded text-white">
              <Zap className="h-3 w-3" fill="currentColor" />
            </div>
            Syntave GenUI
          </div>
          <div className="text-syntave-500 flex items-center gap-8 text-sm">
            <Link
              href="/docs"
              className="hover:text-syntave-900 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/privacy"
              className="hover:text-syntave-900 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-syntave-900 transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://github.com/syntaveai/genui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-syntave-900 transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-syntave-400 text-xs">
            &copy; {new Date().getFullYear()} Syntave
          </p>
        </div>
      </footer>
    </div>
  );
}
