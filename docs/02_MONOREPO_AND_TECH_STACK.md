# Syntave GenUI: Monorepo Structure & Tech Stack

## 1. Repository Topology
We use a **Turborepo + pnpm** monorepo. This ensures "Synthesis over Complexity" by keeping the CLI, UI components, schemas, and docs in one place.

```text
syntave-genui/
├── apps/
│   ├── registry/       # Next.js app hosting genui.syntave.com (Docs + Registry API)
│   └── playground/     # Next.js app for interactive component testing
├── packages/
│   ├── ui/             # Source of truth for React components (Tailwind + shadcn style)
│   ├── schemas/        # Zod schemas and MCP tool definitions (The "Golden Rules")
│   ├── cli/            # The `npx genui` CLI tool (forked/wrapped from shadcn CLI)
│   └── runtime/        # The `@syntave/generative-ui` npm package (Frontend mapper)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 2. Strict Tech Stack Constraints
Do not deviate from these technologies. They are chosen for enterprise reliability and developer experience.

*   **Language:** TypeScript (Strict mode `strict: true` enabled everywhere. Zero `any` types allowed in public APIs).
*   **Frontend Framework:** React 18+, Next.js 14+ (App Router).
*   **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`. **No CSS modules. No styled-components.**
*   **Validation:** Zod (Absolute requirement for all LLM payloads and API contracts).
*   **Icons:** `lucide-react` (Standardized across all components).
*   **Package Manager:** pnpm (Workspaces).
*   **Build System:** Turborepo.

## 3. Package Responsibilities
*   **`packages/ui`**: Contains the raw React components. These are copied to the user's local `src/components/ui/` directory when they run the CLI.
*   **`packages/schemas`**: Contains the Zod schemas. These are the "Golden Rules" that define exactly what JSON the AI is allowed to output.
*   **`packages/cli`**: The command-line interface. It reads the registry JSON and downloads files into the developer's project.
*   **`packages/runtime`**: The lightweight npm package (`@syntave/generative-ui`) installed by the end-user. It contains the `<GenerativeUI />` mapper.
