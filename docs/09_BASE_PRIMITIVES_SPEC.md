# Syntave GenUI: Base UI Primitives Specification

**To the AI Engineering Agent:**
Before building the high-level GenUI components, you must build the foundational UI primitives. These are the atomic building blocks. 

**The Rule of Minimalism:** Do not build components we do not need. If a primitive is not used by `MetricCard`, `DataTable`, `FallbackMessage`, or the `Playground`, do not build it. Zero bloat.

## 1. The Syntave Primitive Philosophy
1. **Composition over Configuration:** Instead of adding 20 props to a `Card` component, we break it into `Card`, `CardHeader`, `CardContent`. Developers compose them.
2. **Strict Design System Enforcement:** Primitives enforce the monochrome palette and typography rules. Developers shouldn't have to remember if secondary text is `gray-500` or `gray-600`. The `Typography` primitive handles it.
3. **Zero Inheritance Leaks:** Every primitive must accept a `className` prop and use the `cn()` utility to merge it. No primitive should accidentally override a developer's custom spacing.

---

## 2. The Essential Primitives (The "Syntave Base")

### A. Layout & Containers
These are the structural wrappers for our GenUI components.

#### 1. Card
Used as the base container for `MetricCard`.
*   **Sub-components:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
*   **Design Rules:** 
    *   Background: `bg-white`.
    *   Border: `border border-gray-200`.
    *   Radius: `rounded-lg`.
    *   **NO DROP SHADOWS.** We use borders to define boundaries (Doc 6).
*   **Code Pattern:**
    ```tsx
    const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
      <div ref={ref} className={cn("rounded-lg border border-gray-200 bg-white text-gray-900 shadow-none", className)} {...props} />
    ))
    ```

#### 2. Table
Used as the base container for `DataTable`.
*   **Sub-components:** `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.
*   **Design Rules:**
    *   `TableHead`: `text-xs font-medium text-gray-500 uppercase tracking-wider`.
    *   `TableCell`: `text-sm text-gray-900 font-inter py-3`.
    *   `TableRow` border: `border-b border-gray-100`.

#### 3. Separator
A simple horizontal or vertical divider.
*   **Design Rules:** `bg-gray-200`, `h-[1px]` (horizontal) or `w-[1px]` (vertical).

---

### B. Data Display & Typography
These enforce the visual consistency of text and status indicators.

#### 4. Typography (Text)
Instead of writing `text-sm text-gray-500` everywhere, developers use the `Text` primitive. This enforces the design system.
*   **Variants:**
    *   `h1`: `text-3xl font-semibold tracking-tight text-gray-900`
    *   `h2`: `text-2xl font-semibold text-gray-900`
    *   `h3`: `text-xl font-semibold text-gray-900`
    *   `body`: `text-sm text-gray-900 font-inter` (Default)
    *   `muted`: `text-sm text-gray-500 font-inter`
    *   `code`: `text-sm font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded`
*   **Usage:** `<Text variant="muted">Total Revenue</Text>`

#### 5. Badge
Used for tags, status, and secondary metadata.
*   **Variants (Strictly Monochrome + Status):**
    *   `default`: `bg-gray-900 text-white` (Primary tags)
    *   `secondary`: `bg-gray-100 text-gray-900` (Secondary tags)
    *   `outline`: `border border-gray-200 text-gray-900` (Neutral)
    *   `success`: `bg-green-50 text-green-700 border border-green-200` (Exclusively for positive metrics/trends)
    *   `destructive`: `bg-red-50 text-red-700 border border-red-200` (Exclusively for negative metrics/errors)
*   **Design Rules:** `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors`.

#### 6. Skeleton
Crucial for AI/async data loading states.
*   **Design Rules:** `bg-gray-100 rounded-md animate-pulse`. (We use a very subtle pulse, no flashy shimmer effects).

---

### C. Actions & Inputs (Playground & Docs Only)
These are needed to build the interactive Playground and Documentation pages. They are **not** intended for the LLM to generate via GenUI.

#### 7. Button
*   **Variants:**
    *   `default`: `bg-gray-900 text-white hover:bg-gray-800`
    *   `secondary`: `bg-gray-100 text-gray-900 hover:bg-gray-200`
    *   `outline`: `border border-gray-200 bg-white hover:bg-gray-50 text-gray-900`
    *   `ghost`: `hover:bg-gray-100 text-gray-900`
*   **Design Rules:** `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900`. Height: `h-9 px-4 py-2`.

#### 8. Input & Textarea
Used in the Playground's JSON editor and settings.
*   **Design Rules:** `flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900`.

#### 9. Icon (Lucide Wrapper)
A standardized wrapper for `lucide-react` icons to ensure consistent sizing.
*   **Props:** `name` (string), `size` (number, default 16), `className`.
*   **Design Rules:** Defaults to `text-gray-500` unless overridden.

---

## 3. How Primitives Map to GenUI Components

The AI agent must use these primitives to build the high-level components. Do not rewrite the base styles.

| GenUI Component | Primitives Used |
| :--- | :--- |
| **MetricCard** | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Text` (variants: `muted`, `h2`), `Badge` (for trend: `success`/`destructive`). |
| **DataTable** | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `Text` (variant: `muted` for empty state). |
| **FallbackMessage** | `Card` (with `border-dashed` override), `Icon` (AlertCircle/AlertTriangle), `Text` (variant: `muted`). |

---

## 4. Registry & CLI Handling for Primitives

### The "Dependency Graph" Rule
When a developer runs `npx genui add metric-card`, the CLI must understand that `MetricCard` depends on `Card`, `Text`, and `Badge`. 

1. **Auto-Resolution:** The CLI must check if `Card`, `Text`, and `Badge` exist in the user's `src/components/ui/` folder.
2. **Silent Installation:** If they are missing, the CLI must automatically fetch and install them from the registry *before* installing `metric-card`.
3. **No Duplicates:** The CLI must never overwrite an existing primitive file unless the user explicitly passes a `--overwrite` flag.

### Registry JSON Structure for Primitives
The registry JSON for primitives looks identical to GenUI components, but they lack the `mcp_tool_definition` in the `meta` block (because the LLM doesn't call `render_button`, it just uses the React component).

```json
{
  "name": "card",
  "type": "registry:ui",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [
    { "path": "ui/card.tsx", "content": "[RAW_TSX_CONTENT]", "type": "registry:ui" }
  ],
  "meta": {
    "description": "A foundational container component with header, content, and footer sections."
  }
}
```

---

## 5. Agent Execution Rules for Primitives

1. **Build Order:** You must build the Base Primitives (Doc 9) *before* the GenUI Components (Doc 8). The GenUI components import from the primitives.
2. **No Inline Styles:** If you find yourself writing `style={{ color: '#737373' }}` inside a primitive, stop. Use `text-gray-500`.
3. **Export Strategy:** All primitives must be exported from a single `packages/ui/src/index.ts` barrel file, but the CLI will still download them as individual files to the user's project to allow tree-shaking and local modification.
