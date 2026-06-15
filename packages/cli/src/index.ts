#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { z } from "zod";

const REGISTRY_BASE = "https://genui.syntave.com/r";

const ALL_COMPONENTS: { name: string; description: string }[] = [
  // GenUI (LLM-driven)
  {
    name: "metric-card",
    description: "A single KPI metric card with optional trend",
  },
  {
    name: "data-table",
    description: "Structured table with columns and data rows",
  },
  {
    name: "fallback-message",
    description: "Empty, error, or info state messages",
  },
  {
    name: "pie-chart",
    description: "Monochrome SVG pie chart with labeled segments",
  },
  {
    name: "progress-bar",
    description: "Horizontal progress bar with label and percentage",
  },
  // Primitives
  { name: "accordion", description: "Vertically stacked expandable sections" },
  {
    name: "alert",
    description: "Callout banners for info, success, warning, error",
  },
  {
    name: "alert-dialog",
    description: "Modal confirmation dialog with cancel/action",
  },
  { name: "aspect-ratio", description: "Content container locked to a ratio" },
  { name: "avatar", description: "User avatar image with text fallback" },
  { name: "badge", description: "Inline label with variants" },
  { name: "breadcrumb", description: "Navigation path with separators" },
  { name: "button", description: "Action button with variants and sizes" },
  { name: "button-group", description: "Group related buttons edge-to-edge" },
  { name: "calendar", description: "Month grid date picker" },
  {
    name: "card",
    description: "Container with header, content, footer sections",
  },
  {
    name: "carousel",
    description: "Image/content slideshow with nav controls",
  },
  { name: "checkbox", description: "Binary toggle control" },
  { name: "collapsible", description: "Expand/collapse panel" },
  {
    name: "combobox",
    description: "Autocomplete input with filtered dropdown",
  },
  { name: "command", description: "Search palette with keyboard navigation" },
  { name: "context-menu", description: "Right-click action menu" },
  { name: "date-picker", description: "Calendar popover date selector" },
  { name: "dialog", description: "Modal overlay with header/content/footer" },
  { name: "drawer", description: "Bottom slide-up panel with drag handle" },
  { name: "dropdown-menu", description: "Click-triggered action menu" },
  {
    name: "field",
    description: "Form field wrapper with label, description, error",
  },
  { name: "hover-card", description: "Hover-triggered preview popup" },
  { name: "icon", description: "Lucide icon wrapper with consistent sizing" },
  { name: "input", description: "Text input and textarea" },
  {
    name: "input-group",
    description: "Input with addons and buttons attached",
  },
  { name: "input-otp", description: "One-time password digit boxes" },
  { name: "kbd", description: "Keyboard key display" },
  { name: "label", description: "Form label with accessibility" },
  { name: "menubar", description: "Desktop-style menu bar with dropdowns" },
  { name: "native-select", description: "Styled native HTML select" },
  {
    name: "navigation-menu",
    description: "Link navigation with optional flyouts",
  },
  { name: "pagination", description: "Page navigation with prev/next" },
  { name: "popover", description: "Click-triggered content overlay" },
  { name: "radio-group", description: "Radio button group, single select" },
  { name: "resizable", description: "Draggable panel splitter" },
  { name: "scroll-area", description: "Scrollable content container" },
  { name: "select", description: "Custom dropdown select" },
  { name: "separator", description: "Horizontal or vertical divider" },
  { name: "sheet", description: "Slide-in side panel" },
  { name: "sidebar", description: "Collapsible app sidebar with nav items" },
  { name: "skeleton", description: "Loading placeholder" },
  { name: "slider", description: "Range slider input" },
  { name: "spinner", description: "Loading spinner indicator" },
  { name: "switch", description: "Toggle switch control" },
  {
    name: "table",
    description: "Table with header, body, row, cell components",
  },
  { name: "tabs", description: "Tabbed content panels" },
  {
    name: "text",
    description: "Typography with h1/h2/h3/body/muted/code variants",
  },
  { name: "toast", description: "Transient notification with auto-dismiss" },
  { name: "toggle", description: "Two-state press button" },
  { name: "toggle-group", description: "Grouped toggle buttons" },
  { name: "tooltip", description: "Hover text popup" },
];

const COMPONENT_NAMES = new Set(ALL_COMPONENTS.map((c) => c.name));

const KNOWN_PRIMITIVES = new Set([
  "card",
  "table",
  "separator",
  "text",
  "badge",
  "skeleton",
  "button",
  "input",
  "icon",
]);

type RegistryFile = { path: string; content: string; type: string };

type RegistryManifest = {
  name: string;
  type: string;
  dependencies: string[];
  files: RegistryFile[];
  meta?: Record<string, unknown>;
};

const RegistryManifestSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  dependencies: z.array(z.string()).default([]),
  files: z
    .array(
      z.object({
        path: z.string().min(1),
        content: z.string(),
        type: z.string(),
      }),
    )
    .min(1),
  meta: z.record(z.unknown()).optional(),
});

async function fetchRegistry(name: string): Promise<RegistryManifest> {
  const url = `${REGISTRY_BASE}/${name}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`  Component "${name}" not found (${response.status}).`);
    process.exit(1);
  }
  const raw = await response.json();
  try {
    return RegistryManifestSchema.parse(raw);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  Invalid registry manifest for "${name}": ${msg}`);
    process.exit(1);
  }
}

function resolveProjectRoot(): string {
  let dir = process.cwd();
  while (dir !== resolve(dir, "..")) {
    if (existsSync(resolve(dir, "package.json"))) return dir;
    dir = resolve(dir, "..");
  }
  console.error("No package.json found in current or parent directories.");
  process.exit(1);
}

function detectPackageManager(projectRoot: string): string {
  if (existsSync(resolve(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(resolve(projectRoot, "yarn.lock"))) return "yarn";
  return "npm";
}

function readProjectConfig(projectRoot: string): {
  aliases: Record<string, string>;
  existingComponents: string[];
} {
  const aliases: Record<string, string> = {};
  let existingComponents: string[] = [];

  const tsconfigPath = resolve(projectRoot, "tsconfig.json");
  const jsconfigPath = resolve(projectRoot, "jsconfig.json");
  const configPath = existsSync(tsconfigPath)
    ? tsconfigPath
    : existsSync(jsconfigPath)
      ? jsconfigPath
      : null;

  if (configPath) {
    try {
      const paths = JSON.parse(readFileSync(configPath, "utf-8"))
        .compilerOptions?.paths;
      if (paths) {
        for (const [alias, targets] of Object.entries(paths)) {
          const clean = alias.replace("/*", "");
          const target = (targets as string[])[0]?.replace("/*", "") ?? "";
          aliases[clean] = resolve(dirname(configPath), target);
        }
      }
    } catch {
      /* ignore */
    }
  }

  const componentsJsonPath = resolve(projectRoot, "components.json");
  if (existsSync(componentsJsonPath)) {
    try {
      existingComponents =
        JSON.parse(readFileSync(componentsJsonPath, "utf-8"))
          .installedComponents ?? [];
    } catch {
      /* ignore */
    }
  }

  return { aliases, existingComponents };
}

function resolveOutputDir(
  projectRoot: string,
  aliases: Record<string, string>,
): string {
  const uiAlias =
    aliases["@/components/ui"] || aliases["~/components/ui"] || aliases["@"];
  if (uiAlias) {
    const p = resolve(projectRoot, uiAlias, "ui");
    if (existsSync(p)) return p;
    return resolve(projectRoot, uiAlias, "ui");
  }
  const srcDir = resolve(projectRoot, "src", "components", "ui");
  if (existsSync(srcDir)) return srcDir;
  const appDir = resolve(projectRoot, "app", "components", "ui");
  if (existsSync(appDir)) return appDir;
  return resolve(projectRoot, "src", "components", "ui");
}

function writeComponentFile(outputDir: string, file: RegistryFile) {
  const fullPath = resolve(outputDir, file.path.replace("ui/", ""));
  const dir = resolve(fullPath, "..");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (existsSync(fullPath)) {
    console.log(`  Skipped (exists): ${file.path}`);
    return;
  }
  writeFileSync(fullPath, file.content, "utf-8");
  console.log(`  Created: ${file.path}`);
}

function updateComponentsJson(projectRoot: string, name: string) {
  const filePath = resolve(projectRoot, "components.json");
  let config: Record<string, unknown> = {};
  if (existsSync(filePath)) {
    try {
      config = JSON.parse(readFileSync(filePath, "utf-8"));
    } catch {
      /* ignore */
    }
  }
  const installed = ((config as any).installedComponents ?? []) as string[];
  if (!installed.includes(name)) installed.push(name);
  const updated = {
    $schema: "https://genui.syntave.com/schema.json",
    registry: REGISTRY_BASE,
    installedComponents: installed,
    ...config,
  };
  writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
}

async function installDependencies(
  projectRoot: string,
  deps: string[],
  existingDeps: string[],
) {
  const missing = deps.filter((d) => !existingDeps.includes(d));
  if (missing.length === 0) return;
  const pm = detectPackageManager(projectRoot);
  const cmd = pm === "pnpm" ? "pnpm" : pm === "yarn" ? "yarn" : "npm";
  const installArg = pm === "yarn" ? "add" : "install";
  console.log(`  Installing missing deps: ${missing.join(", ")}`);
  try {
    const result = spawnSync(cmd, [installArg, ...missing], {
      cwd: projectRoot,
      stdio: "pipe",
    });
    if (result.status === 0) {
      console.log(`  Dependencies installed.`);
    } else {
      console.log(
        `  Manual install: ${cmd} ${installArg} ${missing.join(" ")}`,
      );
    }
  } catch {
    console.log(`  Manual install: ${cmd} ${installArg} ${missing.join(" ")}`);
  }
}

function readPackageDeps(projectRoot: string): string[] {
  const pkgPath = resolve(projectRoot, "package.json");
  if (!existsSync(pkgPath)) return [];
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    return [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ];
  } catch {
    return [];
  }
}

async function ensureUtils(
  projectRoot: string,
  aliases: Record<string, string>,
  existingDeps: string[],
) {
  const libAlias =
    aliases["@"] || aliases["~"] || aliases["@/*"] || aliases["~/*"];
  const libDir = libAlias
    ? resolve(projectRoot, libAlias.replace("/*", ""), "lib")
    : resolve(projectRoot, "src", "lib");
  const utilsPath = resolve(libDir, "utils.ts");
  if (existsSync(utilsPath)) return;
  console.log("\n  lib/utils.ts not found. Installing from registry...");
  const response = await fetch(`${REGISTRY_BASE}/utils.json`);
  if (!response.ok) {
    console.log("  Warning: Could not fetch utils.json");
    return;
  }
  const manifest: RegistryManifest = await response.json();
  for (const file of manifest.files) {
    const fullPath = resolve(libDir, file.path.replace("lib/", ""));
    const dir = resolve(fullPath, "..");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(fullPath, file.content, "utf-8");
    console.log(`  Created: ${file.path}`);
  }
  await installDependencies(projectRoot, manifest.dependencies, existingDeps);
}

async function installComponent(
  projectRoot: string,
  componentName: string,
  aliases: Record<string, string>,
  existingComponents: string[],
  existingDeps: string[],
  depth = 0,
) {
  if (depth > 10) {
    console.error("  Circular dependency detected.");
    return;
  }
  if (existingComponents.includes(componentName)) {
    console.log(`  Already installed: ${componentName}`);
    return;
  }
  const manifest = await fetchRegistry(componentName);
  const outputDir = resolveOutputDir(projectRoot, aliases);
  if (KNOWN_PRIMITIVES.has(componentName)) {
    await installDependencies(
      projectRoot,
      manifest.dependencies ?? [],
      existingDeps,
    );
  }
  for (const file of manifest.files) writeComponentFile(outputDir, file);
  updateComponentsJson(projectRoot, componentName);
}

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function generateGenuiFile(
  projectRoot: string,
  aliases: Record<string, string>,
  installed: string[],
) {
  const genuiDir = resolve(projectRoot, "src", "components");
  const genuiPath = resolve(genuiDir, "genui.ts");
  if (!existsSync(genuiDir)) mkdirSync(genuiDir, { recursive: true });
  const prefix =
    aliases["@/components"] || aliases["~/components"] || "@/components";
  const imports = installed
    .map((n) => `import { ${kebabToPascal(n)} } from "${prefix}/ui/${n}";`)
    .join("\n");
  const entries = installed
    .map(
      (n) =>
        `  ${kebabToPascal(n)}: ${kebabToPascal(n)} as unknown as React.ComponentType<Record<string, unknown>>,`,
    )
    .join("\n");
  const content = `import type { ComponentMap } from "@syntave/runtime";
import React from "react";
${imports}

export const componentMap: ComponentMap = {
${entries}
};
`;
  writeFileSync(genuiPath, content, "utf-8");
  console.log(`  Generated: src/components/genui.ts`);
}

function printHelp() {
  console.log(`
Syntave GenUI CLI — Add Generative UI components to your project.

Usage:
  npx genui add <name> [name2 ...]   Install one or more components
  npx genui add --all                Install all components
  npx genui list                     List all available components
  npx genui init                     Generate genui.ts from components.json
  npx genui --help                   Show this help

Examples:
  npx genui add metric-card data-table
  npx genui add --all
  npx genui add dialog toast         Install multiple at once
`);
}

function printList() {
  const installed = new Set<string>();
  const projectRoot = existsSync(resolve(process.cwd(), "package.json"))
    ? resolveProjectRoot()
    : null;
  if (projectRoot) {
    try {
      const raw = readFileSync(
        resolve(projectRoot, "components.json"),
        "utf-8",
      );
      const cfg = JSON.parse(raw);
      (cfg.installedComponents ?? []).forEach((n: string) => installed.add(n));
    } catch {
      /* ignore */
    }
  }

  console.log(`\n📋 GenUI Components (${ALL_COMPONENTS.length} available)\n`);
  console.log("  GENUI COMPONENTS (LLM-driven):");
  const genui = ALL_COMPONENTS.filter((c) =>
    [
      "metric-card",
      "data-table",
      "fallback-message",
      "pie-chart",
      "progress-bar",
    ].includes(c.name),
  );
  for (const c of genui) {
    const mark = installed.has(c.name) ? "✓" : " ";
    console.log(`  [${mark}] ${c.name.padEnd(20)} ${c.description}`);
  }
  console.log("\n  PRIMITIVES:");
  const primitives = ALL_COMPONENTS.filter((c) => !genui.includes(c));
  for (const c of primitives) {
    const mark = installed.has(c.name) ? "✓" : " ";
    console.log(`  [${mark}] ${c.name.padEnd(20)} ${c.description}`);
  }
  console.log(
    `\n  Total: ${ALL_COMPONENTS.length} components (${installed.size} installed)\n`,
  );
}

async function initCommand() {
  const projectRoot = resolveProjectRoot();
  const { aliases, existingComponents } = readProjectConfig(projectRoot);
  if (existingComponents.length === 0) {
    console.log(
      "\n  No components found in components.json. Use `npx genui add` first.\n",
    );
    return;
  }
  console.log(
    `\n  Found ${existingComponents.length} installed components. Regenerating genui.ts...\n`,
  );
  generateGenuiFile(projectRoot, aliases, existingComponents);
  console.log(`  ✅ genui.ts updated.\n`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    process.exit(0);
  }

  const command = args[0];

  if (command === "list") {
    printList();
    process.exit(0);
  }

  if (command === "init") {
    await initCommand();
    process.exit(0);
  }

  if (command !== "add") {
    console.error(
      `Unknown command: "${command}". Use "add", "list", "init", or "--help".`,
    );
    process.exit(1);
  }

  const names = args.slice(1);
  if (names.length === 0) {
    console.error(
      "Usage: npx genui add <name> [name2 ...]  or  npx genui add --all",
    );
    process.exit(1);
  }

  const installAll = names.includes("--all") || names.includes("*");
  const toInstall = installAll ? ALL_COMPONENTS.map((c) => c.name) : names;

  // Validate component names
  const unknown = toInstall.filter((n) => !COMPONENT_NAMES.has(n));
  if (unknown.length > 0) {
    console.error(`\nUnknown components: ${unknown.join(", ")}`);
    console.error(`Run "npx genui list" to see all available components.\n`);
    process.exit(1);
  }

  const projectRoot = resolveProjectRoot();
  const { aliases, existingComponents } = readProjectConfig(projectRoot);
  const existingDeps = readPackageDeps(projectRoot);

  await ensureUtils(projectRoot, aliases, existingDeps);

  console.log(`\n📦 Installing ${toInstall.length} component(s)...\n`);

  for (const name of toInstall) {
    console.log(`  → ${name}`);
    await installComponent(
      projectRoot,
      name,
      aliases,
      existingComponents,
      existingDeps,
    );
    if (!existingComponents.includes(name)) existingComponents.push(name);
  }

  const { existingComponents: updatedInstalled } =
    readProjectConfig(projectRoot);
  generateGenuiFile(projectRoot, aliases, updatedInstalled);

  console.log(
    `\n✅ ${toInstall.length} component(s) installed successfully.\n`,
  );
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
