"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Zap, ChevronDown, Search, X } from "lucide-react";

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

function NavGroup({
  group,
  pathname,
}: {
  group: (typeof NAV_GROUPS)[number];
  pathname: string;
}) {
  const hasActive = group.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(hasActive);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="text-syntave-400 hover:text-syntave-600 flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors"
      >
        {group.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="mt-1 space-y-px">
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-1.5 text-sm transition-all ${
                    isActive
                      ? "bg-syntave-950 font-medium text-white shadow-sm"
                      : "text-syntave-500 hover:bg-syntave-50 hover:text-syntave-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function DocsNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allItems = NAV_GROUPS.flatMap((g) => g.items);
  const filteredItems = searchQuery
    ? allItems.filter((i) =>
        i.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <>
      {/* Mobile toggle */}
      <div className="border-syntave-200 fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          className="text-syntave-900 flex items-center gap-2 text-sm font-semibold"
        >
          <div className="bg-syntave-950 flex h-6 w-6 items-center justify-center rounded text-white">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
          </div>
          Syntave GenUI
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-syntave-500 hover:bg-syntave-50 hover:text-syntave-900 rounded-lg p-2"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`border-syntave-200 fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto border-r bg-white px-5 py-6 transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-syntave-900 flex items-center gap-2 text-sm font-semibold"
          >
            <div className="bg-syntave-950 flex h-6 w-6 items-center justify-center rounded text-white">
              <Zap className="h-3.5 w-3.5" fill="currentColor" />
            </div>
            Syntave GenUI
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-syntave-400 hover:bg-syntave-50 hover:text-syntave-600 rounded-lg p-1.5 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="text-syntave-400 absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-syntave-200 bg-syntave-50 text-syntave-900 placeholder:text-syntave-400 focus:border-syntave-400 focus:ring-syntave-400 w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition-all focus:bg-white focus:ring-1"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-syntave-400 hover:text-syntave-600 absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search results */}
        {searchQuery ? (
          <div className="space-y-1">
            {filteredItems.length === 0 ? (
              <p className="text-syntave-400 px-3 py-2 text-sm">
                No results found
              </p>
            ) : (
              filteredItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-all ${
                      isActive
                        ? "bg-syntave-950 font-medium text-white"
                        : "text-syntave-500 hover:bg-syntave-50 hover:text-syntave-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          NAV_GROUPS.map((group) => (
            <NavGroup key={group.label} group={group} pathname={pathname} />
          ))
        )}
      </nav>
    </>
  );
}
