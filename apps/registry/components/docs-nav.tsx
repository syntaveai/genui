"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_GROUPS = [
  {
    label: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
    ],
  },
  {
    label: "GenUI Components",
    items: [
      { href: "/docs/metric-card", label: "MetricCard" },
      { href: "/docs/data-table", label: "DataTable" },
      { href: "/docs/fallback-message", label: "FallbackMessage" },
      { href: "/docs/pie-chart", label: "PieChart" },
      { href: "/docs/progress-bar", label: "ProgressBar" },
    ],
  },
  {
    label: "Layout",
    items: [
      { href: "/docs/card", label: "Card" },
      { href: "/docs/table", label: "Table" },
      { href: "/docs/separator", label: "Separator" },
      { href: "/docs/scroll-area", label: "ScrollArea" },
      { href: "/docs/aspect-ratio", label: "AspectRatio" },
      { href: "/docs/resizable", label: "Resizable" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { href: "/docs/accordion", label: "Accordion" },
      { href: "/docs/tabs", label: "Tabs" },
      { href: "/docs/breadcrumb", label: "Breadcrumb" },
      { href: "/docs/pagination", label: "Pagination" },
      { href: "/docs/navigation-menu", label: "NavigationMenu" },
      { href: "/docs/menubar", label: "Menubar" },
      { href: "/docs/sidebar", label: "Sidebar" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { href: "/docs/dialog", label: "Dialog" },
      { href: "/docs/alert-dialog", label: "AlertDialog" },
      { href: "/docs/sheet", label: "Sheet" },
      { href: "/docs/drawer", label: "Drawer" },
      { href: "/docs/popover", label: "Popover" },
      { href: "/docs/tooltip", label: "Tooltip" },
      { href: "/docs/hover-card", label: "HoverCard" },
      { href: "/docs/dropdown-menu", label: "DropdownMenu" },
      { href: "/docs/context-menu", label: "ContextMenu" },
      { href: "/docs/command", label: "Command" },
    ],
  },
  {
    label: "Forms",
    items: [
      { href: "/docs/button", label: "Button" },
      { href: "/docs/button-group", label: "ButtonGroup" },
      { href: "/docs/input", label: "Input" },
      { href: "/docs/input-group", label: "InputGroup" },
      { href: "/docs/input-otp", label: "InputOTP" },
      { href: "/docs/select", label: "Select" },
      { href: "/docs/native-select", label: "NativeSelect" },
      { href: "/docs/combobox", label: "Combobox" },
      { href: "/docs/checkbox", label: "Checkbox" },
      { href: "/docs/switch", label: "Switch" },
      { href: "/docs/radio-group", label: "RadioGroup" },
      { href: "/docs/slider", label: "Slider" },
      { href: "/docs/toggle", label: "Toggle" },
      { href: "/docs/toggle-group", label: "ToggleGroup" },
      { href: "/docs/label", label: "Label" },
      { href: "/docs/field", label: "Field" },
      { href: "/docs/calendar", label: "Calendar" },
      { href: "/docs/date-picker", label: "DatePicker" },
    ],
  },
  {
    label: "Display",
    items: [
      { href: "/docs/text", label: "Text" },
      { href: "/docs/badge", label: "Badge" },
      { href: "/docs/avatar", label: "Avatar" },
      { href: "/docs/skeleton", label: "Skeleton" },
      { href: "/docs/spinner", label: "Spinner" },
      { href: "/docs/icon", label: "Icon" },
      { href: "/docs/kbd", label: "Kbd" },
      { href: "/docs/toast", label: "Toast" },
      { href: "/docs/alert", label: "Alert" },
      { href: "/docs/collapsible", label: "Collapsible" },
      { href: "/docs/carousel", label: "Carousel" },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          &larr; Back to Registry
        </Link>
      </div>
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-6">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {group.label}
          </h4>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
