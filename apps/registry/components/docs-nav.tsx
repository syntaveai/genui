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
    ],
  },
  {
    label: "Base Primitives",
    items: [
      { href: "/docs/card", label: "Card" },
      { href: "/docs/table", label: "Table" },
      { href: "/docs/separator", label: "Separator" },
      { href: "/docs/text", label: "Text" },
      { href: "/docs/badge", label: "Badge" },
      { href: "/docs/skeleton", label: "Skeleton" },
      { href: "/docs/button", label: "Button" },
      { href: "/docs/input", label: "Input" },
      { href: "/docs/icon", label: "Icon" },
    ],
  },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 border-r border-gray-200 bg-white p-6">
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
