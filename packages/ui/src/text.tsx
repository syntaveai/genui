import * as React from "react";
import { cn } from "./lib/utils";

const variantClasses = {
  h1: "font-inter text-3xl font-semibold tracking-tight text-gray-900",
  h2: "font-inter text-2xl font-semibold text-gray-900",
  h3: "font-inter text-xl font-semibold text-gray-900",
  body: "font-inter text-sm text-gray-900",
  muted: "font-inter text-sm text-gray-500",
  code: "font-mono text-sm text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded",
} as const;

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof variantClasses;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

function Text({ className, variant = "body", as: Component = "p", ...props }: TextProps) {
  return (
    <Component className={cn(variantClasses[variant], className)} {...props} />
  );
}
Text.displayName = "Text";

export { Text };
