"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { cn } from "./lib/utils";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface SonnerToast {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

let addToastGlobal: ((t: Omit<SonnerToast, "id">) => void) | null = null;
let sonnerId = 0;

export function sonner(config: Omit<SonnerToast, "id">) {
  if (addToastGlobal) addToastGlobal(config);
}

export function SonnerProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<SonnerToast[]>([]);

  const add = useCallback((t: Omit<SonnerToast, "id">) => {
    const id = String(++sonnerId);
    setToasts((prev) => [...prev, { ...t, id }]);
    const dur = t.duration ?? 4000;
    if (dur > 0)
      setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), dur);
  }, []);

  useEffect(() => {
    addToastGlobal = add;
    return () => {
      addToastGlobal = null;
    };
  }, [add]);

  const icon = (type?: string) =>
    type === "success" ? (
      <CheckCircle2 className="h-5 w-5 text-green-600" />
    ) : type === "error" ? (
      <AlertCircle className="h-5 w-5 text-red-600" />
    ) : (
      <Info className="h-5 w-5 text-blue-600" />
    );

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex w-72 items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all",
            )}
          >
            {icon(t.type)}
            <div className="flex-1 space-y-1">
              {t.title && (
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
              )}
              {t.description && (
                <p className="text-sm text-gray-500">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
              className="shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
