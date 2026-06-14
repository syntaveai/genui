"use client";

import { useState, useCallback, useMemo, Component } from "react";
import { GenerativeUI } from "@syntave/runtime";
import type { ComponentMap } from "@syntave/runtime";
import { resolvePayload } from "@syntave/runtime/server";
import { AlertCircle, Play, RotateCcw } from "lucide-react";
import { MetricCard, DataTable, FallbackMessage } from "@syntave/ui";

class GenUIErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.error("[Playground] Component render error:", error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center">
          <FallbackMessage
            message="Component render error. Check the JSON payload."
            variant="error"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

const componentMap: ComponentMap = {
  MetricCard: MetricCard as unknown as React.ComponentType<
    Record<string, unknown>
  >,
  DataTable: DataTable as unknown as React.ComponentType<
    Record<string, unknown>
  >,
  FallbackMessage: FallbackMessage as unknown as React.ComponentType<
    Record<string, unknown>
  >,
};

type SimMode = "none" | "mock" | "empty" | "error";

const DEFAULT_JSON = JSON.stringify(
  {
    type: "MetricCard",
    props: {
      title: "Total Revenue",
      value: "$42,000",
      description: "Monthly recurring revenue",
      trend: { value: 12.5, direction: "up" },
    },
  },
  null,
  2,
);

const MOCK_DATA_SOURCES: Record<
  string,
  {
    handler: () => Promise<unknown>;
    paramsSchema?: { parse: (p: unknown) => unknown };
  }
> = {
  get_revenue: {
    handler: async () => [
      { month: "Jan", amount: 38000 },
      { month: "Feb", amount: 42000 },
      { month: "Mar", amount: 45000 },
    ],
  },
  get_mau_by_country: {
    handler: async () => [
      { country: "United States", users: 45000 },
      { country: "India", users: 32000 },
      { country: "Germany", users: 12000 },
    ],
  },
};

export default function PlaygroundPage() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [simMode, setSimMode] = useState<SimMode>("none");
  const [resolvedPayload, setResolvedPayload] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedPayload = useMemo(() => {
    try {
      return JSON.parse(jsonInput);
    } catch {
      return null;
    }
  }, [jsonInput]);

  const handleResolve = useCallback(async () => {
    setError(null);

    if (!parsedPayload) {
      setError("Invalid JSON. Please check your input.");
      return;
    }

    if (simMode === "mock") {
      const result = await resolvePayload(parsedPayload, MOCK_DATA_SOURCES);
      setResolvedPayload(result);
    } else if (simMode === "empty") {
      const result = await resolvePayload(parsedPayload, {
        get_mau_by_country: {
          handler: async () => [],
        },
        get_revenue: {
          handler: async () => [],
        },
      });
      setResolvedPayload(result);
    } else if (simMode === "error") {
      const result = await resolvePayload(parsedPayload, {
        get_mau_by_country: {
          handler: async () => {
            throw new Error("DB connection failed");
          },
        },
        get_revenue: {
          handler: async () => {
            throw new Error("DB connection failed");
          },
        },
      });
      setResolvedPayload(result);
    } else {
      setResolvedPayload(parsedPayload);
    }
  }, [parsedPayload, simMode]);

  const handleReset = useCallback(() => {
    setJsonInput(DEFAULT_JSON);
    setSimMode("none");
    setResolvedPayload(null);
    setError(null);
  }, []);

  return (
    <div className="font-inter flex h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <h1 className="text-lg font-semibold tracking-tight text-gray-900">
          GenUI Playground
        </h1>
        <div className="flex items-center gap-3">
          <select
            value={simMode}
            onChange={(e) => setSimMode(e.target.value as SimMode)}
            className="font-inter rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="none">No Resolver</option>
            <option value="mock">Mock Data</option>
            <option value="empty">Empty Response</option>
            <option value="error">Simulate Error</option>
          </select>
          <button
            onClick={handleResolve}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Play className="h-4 w-4" />
            Resolve
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-1/2 flex-col border-r border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
              JSON Input
            </span>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="flex-1 resize-none bg-gray-50 p-4 font-mono text-sm text-gray-800 focus:outline-none"
            spellCheck={false}
          />
        </div>

        <div className="flex w-1/2 flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Preview
            </span>
            {error && (
              <span className="flex items-center gap-1 text-xs font-medium text-red-600">
                <AlertCircle className="h-3 w-3" />
                {error}
              </span>
            )}
          </div>
          <div className="flex-1 overflow-auto bg-white p-6">
            <GenUIErrorBoundary>
              {resolvedPayload ? (
                <GenerativeUI
                  payload={resolvedPayload as any}
                  componentMap={componentMap}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm font-medium text-gray-500">
                    Click &quot;Resolve&quot; to preview the component
                  </p>
                </div>
              )}
            </GenUIErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
