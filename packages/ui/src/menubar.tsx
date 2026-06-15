"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { cn } from "./lib/utils";
import { ChevronRight } from "lucide-react";

interface MenubarCtxValue {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
}
const MenubarCtx = createContext<MenubarCtxValue>({
  openMenu: null,
  setOpenMenu: () => {},
});

export function Menubar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <MenubarCtx.Provider value={{ openMenu, setOpenMenu }}>
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1",
          className,
        )}
      >
        {children}
      </div>
    </MenubarCtx.Provider>
  );
}

export function MenubarMenu({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  const { openMenu, setOpenMenu } = useContext(MenubarCtx);
  const isOpen = openMenu === label;
  return (
    <div className="relative">
      <button
        onClick={() => setOpenMenu(isOpen ? null : label)}
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          isOpen
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50",
        )}
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[10rem] rounded-lg border border-gray-200 bg-white py-1 shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
}

export function MenubarItem({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const { setOpenMenu } = useContext(MenubarCtx);
  return (
    <button
      onClick={() => {
        onClick?.();
        setOpenMenu(null);
      }}
      className="flex w-full items-center px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function MenubarSeparator() {
  return <div className="my-1 border-t border-gray-200" />;
}
