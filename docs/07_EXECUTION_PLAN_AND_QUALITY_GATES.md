# Syntave GenUI: Execution Plan & Quality Gates

## 1. Phased Execution Plan
Execute the following phases in strict order. Do not proceed to the next phase until the current one passes TypeScript compilation and linting.

### Phase 1: Scaffolding & Configuration
1. Initialize the Turborepo monorepo with pnpm.
2. Configure `tsconfig.json` with `strict: true` across all packages.
3. Setup Tailwind CSS with the exact Syntave Monochrome palette and configure `Inter` / `JetBrains Mono` fonts globally.
4. Setup the `cn()` utility in `packages/ui/lib/utils.ts`.

### Phase 2: Core Packages (`schemas`, `ui`, `runtime`)
1. Build `packages/schemas`: Create base Zod schemas for `MetricCard`, `DataTable`, and `FallbackMessage`. Ensure every property has a `.describe()` tag.
2. Build `packages/ui`: Implement the React components. Ensure they accept `isEmpty` and `fallbackMessage` props where applicable.
3. Build `packages/runtime`: Create the `<GenerativeUI />` mapper component. Export it as `@syntave/generative-ui`.

### Phase 3: The Registry & CLI
1. Build `apps/registry`: Create a Next.js API route at `/api/r/[name]` that reads local JSON files and serves them with correct CORS headers.
2. Build `packages/cli`: Fork/wrap the shadcn CLI. Configure its default registry URL to `https://genui.syntave.com/r`.

### Phase 4: The Playground & Documentation
1. Build `apps/playground`: Create a split-screen UI. Left: JSON editor. Right: `<GenerativeUI />` renderer. Include a "Simulate Backend Resolver" toggle.
2. Build `apps/registry` (Docs section): Create visual documentation for each component showing the React code, Zod schema, and MCP tool definition.

## 2. Quality Gates (Definition of Done)
Before submitting any code or considering a task complete, verify the following:

- [ ] **Zero `any` types in public APIs:** All LLM payloads are strictly validated via Zod before reaching the UI. (Internal implementation details may use `any` only if strictly necessary and documented).
- [ ] **Design System Compliance:** No hardcoded hex colors outside the Syntave palette. No custom CSS outside of Tailwind utility classes.
- [ ] **Empty States Implemented:** Every component that accepts `data` has a beautifully styled `isEmpty` fallback using the `bg-gray-50` and `border-dashed` patterns.
- [ ] **MCP Compatibility:** Every component in `packages/schemas` has `.describe()` strings on *every single Zod property* for MCP compatibility.
- [ ] **Documentation First:** No component is merged into `packages/ui` unless its corresponding schema and registry JSON are fully documented.

## 3. Syntave Culture Check
As you write code, ask yourself:
*   *Is this Synthesis over Complexity?* Did I add a configuration toggle when I could have just picked the right default?
*   *Is this Developer-First?* If I were installing this via `npx genui add`, would the DX be frictionless?
*   *Is this Relentless Quality?* Did I handle the edge case where the database returns an empty array?

**Begin execution at Phase 1.**
