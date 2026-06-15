# Syntave GenUI: Component Registry Reference

**Total: 49 components** (5 GenUI + 44 Primitives)

All components follow the monochrome design system: `gray-50` through `gray-900`, no shadows, standard Tailwind spacing, `cn()` utility for class merging.

---

## 1. GenUI Components (LLM-driven with Zod schemas)

These have MCP tool definitions auto-generated from Zod schemas. The LLM calls them via tool calling.

| Component           | LLM Schema                 | Props Schema                 | Description                                 |
| ------------------- | -------------------------- | ---------------------------- | ------------------------------------------- |
| **MetricCard**      | `MetricCardLLMSchema`      | `MetricCardPropsSchema`      | Single KPI card with title, value, trend    |
| **DataTable**       | `DataTableLLMSchema`       | `DataTablePropsSchema`       | Structured table with columns and data rows |
| **FallbackMessage** | `FallbackMessageLLMSchema` | `FallbackMessagePropsSchema` | Empty/error/info state messages             |
| **PieChart**        | `PieChartLLMSchema`        | `PieChartPropsSchema`        | Monochrome SVG pie chart with segments      |
| **ProgressBar**     | `ProgressBarLLMSchema`     | `ProgressBarPropsSchema`     | Horizontal progress bar with label          |

Each GenUI component:

- Has a `dataSource` field for the LLM to reference an allowlisted data source
- Uses `resolvePayload()` from `@syntave/runtime/server` to inject real data
- Has empty/error state handling via `isEmpty` + `fallbackMessage` props

---

## 2. Layout & Container Primitives

| Component       | Sub-components                                                                             | Base Classes                                 |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Card**        | `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter`                    | `rounded-lg border border-gray-200 bg-white` |
| **Table**       | `Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption` | `w-full`                                     |
| **Separator**   | —                                                                                          | `bg-gray-200`                                |
| **ScrollArea**  | —                                                                                          | `overflow-y-auto`                            |
| **AspectRatio** | —                                                                                          | Maintains ratio via padding-bottom           |
| **Resizable**   | `ResizablePanelGroup`                                                                      | Draggable panel divider                      |

---

## 3. Navigation Primitives

| Component          | Sub-components                                                 | Description                                  |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------- |
| **Breadcrumb**     | —                                                              | Path hierarchy with chevron/slash separators |
| **NavigationMenu** | —                                                              | Link nav with optional dropdown flyouts      |
| **Menubar**        | `Menubar, MenubarMenu, MenubarItem, MenubarSeparator`          | Desktop-style menu bar                       |
| **Pagination**     | —                                                              | Page buttons with prev/next and ellipsis     |
| **Sidebar**        | —                                                              | Collapsible sidebar with nested sections     |
| **Tabs**           | `Tabs, TabsList, TabsTrigger, TabsContent`                     | Tabbed content panels                        |
| **Accordion**      | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` | Stacked expandable sections                  |

---

## 4. Overlay & Modal Primitives

| Component        | Sub-components                                                                                                                                                              | Trigger                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **Dialog**       | `Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter`                                                                          | Button click                      |
| **AlertDialog**  | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction` | Button click                      |
| **Sheet**        | `Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription`                                                                                              | Button click (slides from side)   |
| **Drawer**       | `Drawer, DrawerTrigger, DrawerContent`                                                                                                                                      | Button click (slides from bottom) |
| **Popover**      | `Popover, PopoverTrigger, PopoverContent`                                                                                                                                   | Button click                      |
| **HoverCard**    | —                                                                                                                                                                           | Mouse hover (with delay)          |
| **Tooltip**      | —                                                                                                                                                                           | Mouse hover (with delay)          |
| **DropdownMenu** | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator`                                                                           | Button click                      |
| **ContextMenu**  | —                                                                                                                                                                           | Right-click                       |
| **Command**      | —                                                                                                                                                                           | Search palette with keyboard nav  |

---

## 5. Form & Input Primitives

| Component        | Sub-components                 | Description                                                                |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------- |
| **Button**       | —                              | Variants: default, secondary, outline, ghost. Sizes: default, sm, lg, icon |
| **ButtonGroup**  | —                              | Groups buttons edge-to-edge                                                |
| **Input**        | `Input, Textarea`              | Text input and multi-line textarea                                         |
| **InputGroup**   | `InputGroup, InputGroupAddon`  | Input with addons attached                                                 |
| **InputOTP**     | —                              | One-time password digit boxes                                              |
| **Select**       | —                              | Custom dropdown with option list                                           |
| **NativeSelect** | —                              | Styled native HTML select                                                  |
| **Combobox**     | —                              | Autocomplete with search filtering                                         |
| **Checkbox**     | —                              | Binary toggle                                                              |
| **Switch**       | —                              | Toggle switch                                                              |
| **RadioGroup**   | `RadioGroup, RadioGroupItem`   | Single-select radio buttons                                                |
| **Slider**       | —                              | Range slider with mouse/keyboard                                           |
| **Toggle**       | —                              | Two-state press button                                                     |
| **ToggleGroup**  | `ToggleGroup, ToggleGroupItem` | Grouped toggle buttons                                                     |
| **Label**        | —                              | Form label with accessibility                                              |
| **Field**        | —                              | Form field wrapper with label, description, error                          |
| **Calendar**     | —                              | Month grid date picker                                                     |
| **DatePicker**   | —                              | Calendar popover date selector                                             |

---

## 6. Display Primitives

| Component       | Sub-components                                        | Description                                                       |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| **Text**        | —                                                     | Variants: h1, h2, h3, body, muted, code                           |
| **Badge**       | —                                                     | Variants: default, secondary, outline, success, destructive       |
| **Avatar**      | —                                                     | Image with text fallback, sizes: sm, md, lg                       |
| **Skeleton**    | —                                                     | Loading placeholder with pulse animation                          |
| **Spinner**     | —                                                     | Animated loading spinner                                          |
| **Icon**        | —                                                     | Lucide icon wrapper                                               |
| **Kbd**         | —                                                     | Keyboard key display                                              |
| **Toast**       | —                                                     | Transient notification with auto-dismiss, uses `toast()` function |
| **Alert**       | `Alert, AlertTitle, AlertDescription`                 | Variants: info, success, warning, error                           |
| **Collapsible** | `Collapsible, CollapsibleTrigger, CollapsibleContent` | Expand/collapse panel                                             |
| **Carousel**    | —                                                     | Slideshow with prev/next and dot nav                              |
| **Direction**   | `DirectionProvider, useDirection`                     | RTL/LTR context provider                                          |

---

## 7. CLI Usage

```bash
# Install packages
npm install @syntave/schemas @syntave/runtime @syntave/cli @syntave/ui

# Add components
npx genui add metric-card data-table    # Install multiple
npx genui add --all                     # Install all 49
npx genui list                          # List components
npx genui init                          # Regenerate genui.ts

# Available GenUI components:
#   metric-card, data-table, fallback-message, pie-chart, progress-bar
# Available primitives:
#   card, table, separator, text, badge, skeleton, button, input, icon,
#   accordion, alert, alert-dialog, aspect-ratio, avatar, breadcrumb,
#   button-group, calendar, carousel, checkbox, collapsible, combobox,
#   command, context-menu, date-picker, dialog, drawer, dropdown-menu,
#   field, hover-card, icon, input-group, input-otp, kbd, label, menubar,
#   native-select, navigation-menu, pagination, popover, radio-group,
#   resizable, scroll-area, select, sheet, sidebar, slider, spinner,
#   switch, tabs, toast, toggle, toggle-group, tooltip
```

## 8. Architecture Rules

1. **No eval() or dynamic component generation — ever.** All components are pre-built in the registry. The LLM only selects which to render.
2. **Every component must accept `className`** via the `cn()` utility. Consumer classes always override defaults.
3. **MCP tool definitions** are auto-generated from Zod schemas via `zod-to-json-schema` during `apps/registry/scripts/build-registry.mjs`.
4. **Primitives have no Zod schemas** — only GenUI components (MetricCard, DataTable, FallbackMessage, PieChart, ProgressBar) have LLM schemas.
5. **The `resolvePayload()` function** in `@syntave/runtime/server` handles the data resolution: strips `dataSource`, calls the handler, spreads objects into props, wraps arrays in `data`.
