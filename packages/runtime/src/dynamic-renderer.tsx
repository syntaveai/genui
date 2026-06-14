import React from "react";
import type { DynamicElement } from "@syntave/schemas";

function resolveField(data: unknown, path: string): string {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return `{${path}}`;
    const obj = current as Record<string, unknown>;
    if (Object.hasOwn(obj, part)) {
      current = obj[part];
    } else {
      return `{${path}}`;
    }
  }
  return String(current ?? "");
}

function renderNode(
  el: DynamicElement,
  data: unknown,
  key: number,
): React.ReactElement {
  const children: React.ReactNode[] = [];

  if (el.textContent) {
    children.push(el.textContent);
  }

  if (el.dataField) {
    children.push(resolveField(data, el.dataField));
  }

  if (el.children) {
    el.children.forEach((child: DynamicElement, i: number) => {
      children.push(renderNode(child, data, i));
    });
  }

  return React.createElement(
    el.tag,
    { key, className: el.className || undefined },
    ...(children.length > 0 ? children : []),
  );
}

export interface DynamicRendererProps {
  title: string;
  root?: DynamicElement;
  data?: unknown;
  isEmpty?: boolean;
  fallbackMessage?: string;
  className?: string;
}

export function DynamicRenderer({
  title,
  root,
  data,
  isEmpty,
  fallbackMessage,
  className,
}: DynamicRendererProps) {
  if (isEmpty) {
    return (
      <div
        className={`rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500 ${className ?? ""}`}
      >
        {fallbackMessage || "No data available."}
      </div>
    );
  }

  if (!root) return null;

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      {title && (
        <h3 className="text-sm font-semibold tracking-tight text-gray-900">
          {title}
        </h3>
      )}
      {renderNode(root, data, 0)}
    </div>
  );
}
