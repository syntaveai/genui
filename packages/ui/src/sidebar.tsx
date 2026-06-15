"use client";

import { useState } from "react";
import { cn } from "./lib/utils";
import { ChevronLeft, Menu } from "lucide-react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  items?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  defaultCollapsed?: boolean;
}

export function Sidebar({
  items,
  className,
  defaultCollapsed = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  };

  const renderItems = (sidebarItems: SidebarItem[], depth = 0) => {
    return sidebarItems.map((item) => (
      <div key={item.label}>
        {item.items ? (
          <div>
            <button
              onClick={() => toggleSection(item.label)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
                item.active ? "bg-gray-100 text-gray-900" : "text-gray-600",
                collapsed && "justify-center",
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && (
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    expandedSections.includes(item.label) && "-rotate-90",
                  )}
                />
              )}
            </button>
            {!collapsed && expandedSections.includes(item.label) && (
              <div className="ml-4 mt-1 space-y-1">
                {renderItems(item.items, depth + 1)}
              </div>
            )}
          </div>
        ) : (
          <a
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
              item.active ? "bg-gray-100 text-gray-900" : "text-gray-600",
              collapsed && "justify-center",
            )}
            title={collapsed ? item.label : undefined}
          >
            {item.icon}
            {!collapsed && item.label}
          </a>
        )}
      </div>
    ));
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-gray-200 bg-white transition-all",
        collapsed ? "w-16" : "w-60",
        className,
      )}
    >
      <div className="flex items-center justify-end border-b border-gray-200 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {renderItems(items)}
      </nav>
    </div>
  );
}
