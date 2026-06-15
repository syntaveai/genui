"use client";

import { useState } from "react";
import { cn } from "./lib/utils";

export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export interface NavigationMenuProps {
  items: NavItem[];
  className?: string;
}

export function NavigationMenu({ items, className }: NavigationMenuProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setActive(item.label)}
          onMouseLeave={() => setActive(null)}
        >
          {item.href ? (
            <a
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </a>
          ) : (
            <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              {item.label}
            </button>
          )}
          {item.children && active === item.label && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-gray-200 bg-white py-2 shadow-sm">
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {child.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
