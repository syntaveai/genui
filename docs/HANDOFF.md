# Syntave GenUI — Build Handoff

## Current State
**Build status:** 6/6 packages, 0 type errors, 35/35 tests passing (19 schema + 16 UI), full production build clean.

---

## 1. Repository Structure

```
syntave-genui/
├── docs/                          # 8 specification documents
│   ├── 01_PRODUCT_VISION_AND_ARCHITECTURE.md
│   ├── 02_MONOREPO_AND_TECH_STACK.md
│   ├── 03_COMPONENT_ANATOMY_AND_REGISTRY.md
│   ├── 04_DATA_RESOLUTION_AND_SECURITY.md
│   ├── 05_EDGE_CASES_AND_GRACEFUL_DEGRADATION.md
│   ├── 06_DESIGN_SYSTEM_AND_STYLING_RULES.md
│   ├── 07_EXECUTION_PLAN_AND_QUALITY_GATES.md
│   └── 08_COMPONENT_REGISTRY_SPEC.md
├── apps/
│   ├── registry/                  # Next.js app — genui.syntave.com
│   │   ├── app/                   # App Router pages
│   │   ├── public/r/              # Generated static registry JSON files
│   │   ├── scripts/
│   │   │   └── build-registry.mjs # Generates registry JSON from component source
│   │   ├── tailwind.config.ts
│   │   └── next.config.js
│   └── playground/                # Next.js app — interactive JSON editor + preview
│       ├── app/
│       │   └── page.tsx           # Split-screen: JSON editor | Live preview + resolver sim
│       ├── tailwind.config.ts
│       └── next.config.js
├── packages/
│   ├── schemas/                   # Zod schemas — the "Golden Rules"
│   │   └── src/
│   │       ├── index.ts
│   │       ├── metric-card.ts     # MetricCardLLMSchema + MetricCardPropsSchema
│   │       ├── data-table.ts      # DataTableLLMSchema + DataTablePropsSchema
│   │       ├── fallback-message.ts # FallbackMessageLLMSchema + FallbackMessagePropsSchema
│   │       └── __tests__/
│   │           └── schemas.test.ts # 19 tests
│   ├── ui/                        # React components — source of truth
│   │   └── src/
│   │       ├── index.ts
│   │       ├── lib/utils.ts       # cn() utility (clsx + tailwind-merge)
│   │       ├── metric-card.tsx     # GenUI component
│   │       ├── data-table.tsx      # GenUI component
│   │       ├── fallback-message.tsx # GenUI component
│   │       ├── card.tsx            # Base primitive
│   │       ├── table.tsx           # Base primitive
│   │       ├── separator.tsx       # Base primitive
│   │       ├── text.tsx            # Base primitive
│   │       ├── badge.tsx           # Base primitive
│   │       ├── skeleton.tsx        # Base primitive
│   │       ├── button.tsx          # Base primitive
│   │       ├── input.tsx           # Base primitive
│   │       └── icon.tsx            # Base primitive
│   ├── runtime/                   # npm package: @syntave/generative-ui
│   │   └── src/
│   │       ├── index.tsx          # GenerativeUI mapper + exports
│   │       └── resolver.ts        # Backend Data Resolver
│   └── cli/                       # CLI: npx genui add <component>
│       └── src/
│           └── index.ts           # add command, fetches registry, writes files
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── tsconfig.json
├── .prettierrc
└── .gitignore
```

---

## 2. Package Details

### `@syntave/schemas`
- **Dual-schema pattern:** Each component has two schemas
  - `*LLMSchema` — what the LLM outputs (intent-only: `title`, `dataSource`, `dataSourceParams`)
  - `*PropsSchema` — what React renders (resolved: `value`, `data`, `isEmpty`, `fallbackMessage`)
- Every Zod property has `.describe()` for MCP auto-generation
- 19 Vitest tests covering valid/invalid/edge-case states

### `@syntave/ui`
**GenUI Components (3):**
| Component | Props | Edge States |
|-----------|-------|-------------|
| `MetricCard` | title, value, description?, trend?, isEmpty?, fallbackMessage?, className? | empty state with dashed border |
| `DataTable` | columns[], data[], isEmpty?, fallbackMessage?, className? | empty state + `accessorKey`-based access |
| `FallbackMessage` | message, variant? (empty\|error\|info), className? | 3 visual variants with distinct icons/colors |

**Base Primitives (9):** Card, Table, Separator, Text, Badge, Skeleton, Button, Input (textarea via `as` prop), Icon — all use `cn()` for className merging.

All GenUI components refactored to use base primitives (e.g., MetricCard wraps Card, DataTable wraps Table).

### `@syntave/runtime`
**Dual sub-path exports:**
- `@syntave/runtime` (client) — **`<GenerativeUI payload componentMap? />`** maps JSON type to React component
  - Missing component → renders "not installed" message with CLI install hint
  - Null payload → renders nothing
- `@syntave/runtime/server` (server-only) — **`resolvePayload(llmPayload, allowedDataSources)`** resolver
  - Validates `dataSource` against allowlist
  - Injects real data from registered handlers
  - Returns `isEmpty` flag for null/empty results
  - Returns `FallbackMessage` on errors or disallowed sources

### `@syntave/cli`
- `npx genui add <component>` — fetches registry JSON, writes files to the correct output dir
- Resolves **output directory** from `tsconfig.json` `compilerOptions.paths` (e.g., `@/components/ui` → `src/components/ui/`)
- Falls back to `components.json` schema if no `tsconfig.json` alias found
- **Dependency auto-install**: detects missing packages and runs `npm/pnpm/yarn add` automatically
- Registry URL: `https://genui.syntave.com/r/[name].json`
- Finds project root by walking up for `package.json`

### `apps/registry`
- Static registry JSON generated by `scripts/build-registry.mjs`
- Reads TSX from `packages/ui/src/`, generates JSON with embedded source + MCP tool definitions (GenUI components only; primitives omit MCP)
- **Import path transformation:** `./lib/utils` → `@/lib/utils` for consumer compatibility
- Output: `public/r/{metric-card,data-table,fallback-message,card,table,separator,text,badge,skeleton,button,input,icon}.json` (12 entries)
- Registry build runs before `next build`

### `apps/playground`
- Split-screen: JSON editor (textarea) + live preview via `<GenerativeUI />`
- "Simulate Backend Resolver" dropdown: No Resolver | Mock Data | Empty Response | Simulate Error
- Reset button restores default MetricCard example

---

## 3. Architecture Patterns

### Data Flow
```
User Prompt → LLM Outputs Intent (LLMSchema) → Backend Resolver → Resolved Props (PropsSchema) → <GenerativeUI /> → React Component
```

### Schema-First
- LLM schemas define the contract; components are visual renderers
- No component is written before its schema + tests exist

### Security
- LLM never generates data — only `dataSource` references
- Backend resolver validates against a developer-defined allowlist
- `dataSourceParams` validated against per-source Zod schemas

### Design System
- **Colors:** Syntave monochrome palette only (gray-50→gray-900, white, black)
- **Typography:** Inter (UI) + JetBrains Mono (code)
- **Styling:** Tailwind utility classes only. No CSS modules, no inline styles.
- **Class merging:** `cn()` utility required on every component

---

## 4. Quality Gates

| Gate | Status |
|------|--------|
| Zero `any` in public APIs | Enforced via `strict: true` in tsconfig |
| Design system compliance | No hardcoded hex values outside palette |
| Empty states implemented | Every data component handles `isEmpty` |
| MCP compatibility | Every Zod property has `.describe()` |
| TypeScript strict mode | Root tsconfig has `strict: true` |
| 35 passing tests | 19 schema + 16 UI (Vitest + RTL) |

### Audit Remediations Completed
- **Runtime split:** `@syntave/runtime` (client) and `@syntave/runtime/server` (server) — separate entry points via sub-path exports
- **CLI hardening:** tsconfig alias resolution + dependency auto-install
- **Import transformation:** Registry build rewrites `./lib/utils` → `@/lib/utils`
- **UI tests:** 16 RTL tests across all 3 GenUI components

---

## 5. Next Steps / Unbuilt

| Item | Status |
|------|--------|
| Registry docs pages visual design | Not started |
| CLI full shadcn fork | MVP wrapper built, full fork pending |
| Deploy to Vercel | DNS + Vercel project setup needed |
| Registry hosted at genui.syntave.com | Domain + Vercel deployment required |
| Additional components (Chart, StatGroup, List) | Locked out of MVP scope |
| Husky + lint-staged pre-commit hooks | Config files not created yet |
| CI/CD GitHub Actions | Pipeline YAML not written yet |
| E2E Playwright tests | Not started |
| Runtime bundle size optimization (externalize @syntave/ui) | 1.13 MB bundle — needs peer dep setup |

---

## 6. Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install all workspace deps |
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Full production build (all packages) |
| `pnpm typecheck` | TypeScript typecheck across monorepo |
| `pnpm test` | Run all tests |
| `pnpm --filter @syntave/schemas test` | Schema tests only (19 Vitest) |
| `pnpm --filter @syntave/ui test` | UI component tests only (16 RTL) |
| `pnpm --filter playground dev` | Run playground in dev mode |
| `pnpm --filter registry dev` | Run registry in dev mode |
| `node apps/registry/scripts/build-registry.mjs` | Regenerate registry JSON files |
