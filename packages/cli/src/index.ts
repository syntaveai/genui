#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { execSync } from "node:child_process";

const REGISTRY_BASE = "https://genui.syntave.com/r";

type RegistryFile = {
  path: string;
  content: string;
  type: string;
};

type RegistryManifest = {
  name: string;
  type: string;
  dependencies: string[];
  files: RegistryFile[];
  meta: Record<string, unknown>;
};

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

async function fetchRegistry(name: string): Promise<RegistryManifest> {
  const url = `${REGISTRY_BASE}/${name}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      console.error(`Component "${name}" not found in registry.`);
    } else {
      console.error(`Failed to fetch registry (${response.status}).`);
    }
    process.exit(1);
  }

  return response.json() as Promise<RegistryManifest>;
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
  const componentsJsonPath = resolve(projectRoot, "components.json");

  const configPath = existsSync(tsconfigPath)
    ? tsconfigPath
    : existsSync(jsconfigPath)
      ? jsconfigPath
      : null;

  if (configPath) {
    try {
      const raw = readFileSync(configPath, "utf-8");
      const parsed = JSON.parse(raw);
      const paths = parsed.compilerOptions?.paths;
      if (paths) {
        for (const [alias, targets] of Object.entries(paths)) {
          const cleanAlias = alias.replace("/*", "");
          const target = (targets as string[])[0]?.replace("/*", "") ?? "";
          aliases[cleanAlias] = resolve(dirname(configPath), target);
        }
      }
    } catch {
      /* ignore parse errors */
    }
  }

  if (existsSync(componentsJsonPath)) {
    try {
      const raw = readFileSync(componentsJsonPath, "utf-8");
      existingComponents = JSON.parse(raw).installedComponents ?? [];
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
    const fullPath = resolve(projectRoot, uiAlias, "ui");
    if (existsSync(fullPath)) return fullPath;
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

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

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
    const raw = readFileSync(filePath, "utf-8");
    config = JSON.parse(raw);
  }

  const installed = ((config as any).installedComponents ?? []) as string[];
  if (!installed.includes(name)) {
    installed.push(name);
  }

  const updated = {
    $schema: "https://genui.syntave.com/schema.json",
    registry: REGISTRY_BASE,
    installedComponents: installed,
    ...config,
  };

  writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
  console.log(`  Updated: components.json`);
}

async function installDependencies(
  projectRoot: string,
  deps: string[],
  existingDeps: string[],
) {
  const missing = deps.filter((d) => !existingDeps.includes(d));
  if (missing.length === 0) return;

  const pm = detectPackageManager(projectRoot);
  const installCmd =
    pm === "pnpm" ? "pnpm add" : pm === "yarn" ? "yarn add" : "npm install";

  console.log(`\n  Installing missing dependencies: ${missing.join(", ")}`);
  try {
    execSync(`${installCmd} ${missing.join(" ")}`, {
      cwd: projectRoot,
      stdio: "pipe",
    });
    console.log(`  Dependencies installed.`);
  } catch {
    console.log(
      `  Warning: Could not auto-install. Run: ${installCmd} ${missing.join(" ")}`,
    );
  }
}

function readPackageDeps(projectRoot: string): string[] {
  const pkgPath = resolve(projectRoot, "package.json");
  if (!existsSync(pkgPath)) return [];
  try {
    const raw = readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(raw);
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

  let libDir: string;
  if (libAlias) {
    libDir = resolve(projectRoot, libAlias.replace("/*", ""), "lib");
  } else {
    libDir = resolve(projectRoot, "src", "lib");
  }

  const utilsPath = resolve(libDir, "utils.ts");
  if (existsSync(utilsPath)) return;

  console.log("\n  lib/utils.ts not found. Installing from registry...");
  const url = `${REGISTRY_BASE}/utils.json`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log("  Warning: Could not fetch utils.json from registry.");
    return;
  }
  const manifest: RegistryManifest = await response.json();
  for (const file of manifest.files) {
    const fullPath = resolve(libDir, file.path.replace("lib/", ""));
    const dir = resolve(fullPath, "..");
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
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
    console.error("  Error: Circular dependency detected.");
    return;
  }

  if (existingComponents.includes(componentName)) {
    console.log(`  Already installed: ${componentName}`);
    return;
  }

  const manifest = await fetchRegistry(componentName);
  const outputDir = resolveOutputDir(projectRoot, aliases);

  // Install dependency primitives first
  if (KNOWN_PRIMITIVES.has(componentName)) {
    const deps = manifest.dependencies ?? [];
    await installDependencies(projectRoot, deps, existingDeps);
  }

  for (const file of manifest.files) {
    writeComponentFile(outputDir, file);
  }

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

  if (!existsSync(genuiDir)) {
    mkdirSync(genuiDir, { recursive: true });
  }

  const importPrefix =
    aliases["@/components"] || aliases["~/components"] || "@/components";

  const imports = installed
    .map((name) => {
      const pascal = kebabToPascal(name);
      return `import { ${pascal} } from "${importPrefix}/ui/${name}";`;
    })
    .join("\n");

  const entries = installed
    .map((name) => {
      const pascal = kebabToPascal(name);
      return `  ${pascal}: ${pascal} as unknown as React.ComponentType<Record<string, unknown>>,`;
    })
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
  npx genui add <component-name>    Install a GenUI component
  npx genui --help                   Show this help

Examples:
  npx genui add metric-card
  npx genui add data-table
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    process.exit(0);
  }

  const command = args[0];
  if (command !== "add") {
    console.error(`Unknown command: "${command}". Use "add" or "--help".`);
    process.exit(1);
  }

  const componentName = args[1];
  if (!componentName) {
    console.error("Usage: npx genui add <component-name>");
    process.exit(1);
  }

  console.log(`\n📦 Installing ${componentName}...\n`);

  const projectRoot = resolveProjectRoot();
  const { aliases, existingComponents } = readProjectConfig(projectRoot);
  const existingDeps = readPackageDeps(projectRoot);

  await ensureUtils(projectRoot, aliases, existingDeps);

  await installComponent(
    projectRoot,
    componentName,
    aliases,
    existingComponents,
    existingDeps,
  );

  // Re-read installed components (includes the one we just added) and generate genui.ts
  const { existingComponents: updatedInstalled } =
    readProjectConfig(projectRoot);
  generateGenuiFile(projectRoot, aliases, updatedInstalled);

  console.log(`✅ ${componentName} installed successfully.\n`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
