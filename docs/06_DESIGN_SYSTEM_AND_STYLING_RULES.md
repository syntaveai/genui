# Syntave GenUI: Design System & Styling Rules

All UI components must strictly adhere to the Syntave Press Kit and Monochrome Design System. "Relentless Quality" means UI elements snap to a consistent grid, margins are exact, and spacing is intentional.

## 1. Color Palette (Strict Enforcement)
Do not use arbitrary hex codes. Use only the following Tailwind-compatible classes or exact hex values:

| Color Name | Hex Code | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| Black | `#000000` | `text-black` | Logo, primary text (rarely used for body) |
| Gray 900 | `#171717` | `text-gray-900` | Darkest surfaces, primary headings |
| Gray 800 | `#262626` | `text-gray-800` | Dark surfaces, secondary headings |
| Gray 500 | `#737373` | `text-gray-500` | Secondary text, labels, descriptions |
| Gray 200 | `#E5E5E5` | `border-gray-200` | Borders, dividers |
| Gray 100 | `#F5F5F5` | `bg-gray-100` | Surface fills, hover states |
| Gray 50 | `#FAFAFA` | `bg-gray-50` | Lightest backgrounds, empty states |
| White | `#FFFFFF` | `bg-white` | Card backgrounds, negative space |

*Note: For status indicators (like trends), `text-green-600` and `text-red-600` are permitted exclusively for up/down metrics.*

## 2. Typography
*   **Sans-Serif (UI & Body):** `Inter`. Apply via `font-inter` class. Use `tracking-tight` for large headings (text-3xl+).
*   **Monospace (Code & Data):** `JetBrains Mono`. Apply via `font-mono` class. Used strictly for code blocks, technical IDs, or raw data values.

## 3. Styling Rules & Constraints
1.  **Utility-First:** Use Tailwind utility classes exclusively. **No CSS modules, no styled-components, no inline `style={}` objects.**
2.  **Class Merging:** Always use the `cn()` utility (combining `clsx` and `tailwind-merge`) to handle conditional classes and prevent Tailwind conflicts.
    ```tsx
    import { cn } from "@/lib/utils";
    <div className={cn("p-4 bg-white", isActive && "bg-gray-50")} />
    ```
3.  **Spacing & Layout:** Use standard Tailwind spacing scales (multiples of 4: `p-4`, `m-2`, `gap-4`). Do not use arbitrary values like `p-[13px]`.
4.  **Borders:** Use `border-gray-200` for standard container borders. Use `border-dashed border-gray-200` for empty states or drop zones.
5.  **Shadows:** Avoid heavy drop shadows. Use subtle borders (`border`) to define boundaries. If a shadow is absolutely necessary, use `shadow-sm` with `gray-100` tones.
