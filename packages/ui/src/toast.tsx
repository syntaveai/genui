"use client";

import {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "./lib/utils";
import { X } from "lucide-react";

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
}

type AddToastFn = (t: Omit<ToastData, "id">) => void;

let addToastGlobal: AddToastFn | null = null;

let toastId = 0;

export function toast(config: Omit<ToastData, "id">) {
  if (addToastGlobal) addToastGlobal(config);
}

const ToastContext = createContext<{
  toasts: ToastData[];
  removeToast: (id: string) => void;
}>({
  toasts: [],
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((t: Omit<ToastData, "id">) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { ...t, id }]);
    const dur = t.duration ?? 5000;
    if (dur > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, dur);
    }
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => {
      addToastGlobal = null;
    };
  }, [addToast]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const variantClass = (v?: string) =>
    v === "success"
      ? "border-green-200 bg-green-50"
      : v === "error"
        ? "border-red-200 bg-red-50"
        : "border-gray-200 bg-white";

  return (
    <ToastContext.Provider value={{ toasts, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={cn(
              "flex w-80 items-start gap-3 rounded-lg border p-4 shadow-sm",
              variantClass(t.variant),
            )}
          >
            <div className="flex-1 space-y-1">
              {t.title && (
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
              )}
              {t.description && (
                <p className="text-sm text-gray-500">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
