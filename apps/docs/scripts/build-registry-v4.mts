import { existsSync, promises as fs } from "fs";
import { tmpdir } from "os";
import path from "path";
import template from "lodash/template";
import { themes } from "../registry_v4/registry-themes";
import { rimraf } from "rimraf";
import {
  Registry,
  registryItemSchema,
  registryItemTypeSchema,
  registrySchema,
} from "../registry_v4/schema";
import { Project, ScriptKind } from "ts-morph";
import { z } from "zod";
import { registry } from "../registry";
import { iconLibraries, icons } from "../registry_v4/registry-icons";
import { styles } from "../registry_v4/registry-styles";

const REGISTRY_PATH = path.join(process.cwd(), "public/r4");

const REGISTRY_INDEX_WHITELIST: z.infer<typeof registryItemTypeSchema>[] = [
  "registry:ui",
  "registry:lib",
  "registry:hook",
  "registry:theme",
  "registry:block",
  "registry:example",
  "registry:internal",
  "registry:dynamic-component",
];

const project = new Project({
  compilerOptions: {},
});

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "axionjs-"));
  return path.join(dir, filename);
}

// ----------------------------------------------------------------------------
// Tailwind v4 Base CSS Templates
// ----------------------------------------------------------------------------
const BASE_STYLES_V4_SIMPLE = `@import "tailwindcss";

/* Base styles for components */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations for components */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes scale-up {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

@keyframes scale-down {
  from { transform: scale(1); }
  to { transform: scale(0.95); }
}
`;

// Base CSS template for Tailwind v4 - inline colors
const BASE_STYLES_V4_INLINE = `@import "tailwindcss";

/* Base styles for components */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
`;

// Base CSS template with CSS variables for v4
const BASE_STYLES_V4_WITH_VARIABLES = `@import "tailwindcss";

/* Base styles for components */
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: 0.5rem;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations for components */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes scale-up {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

@keyframes scale-down {
  from { transform: scale(1); }
  to { transform: scale(0.95); }
}
`;

// ----------------------------------------------------------------------------
// Sync styles for v4
// ----------------------------------------------------------------------------
async function syncStyles() {
  const sourceStyle = "new-york";
  const targetStyle = "default";

  const syncDirectories = [
    "blocks",
    "hooks",
    "internal",
    "lib",
    "charts",
    "dynamic-components",
  ];

  // Clean up sync directories.
  for (const dir of syncDirectories) {
    rimraf.sync(path.join("registry", targetStyle, dir));
  }

  for (const item of registry.items) {
    if (
      !REGISTRY_INDEX_WHITELIST.includes(item.type) &&
      item.type !== "registry:ui"
    ) {
      continue;
    }

    const resolveFiles = item.files?.map(
      (file) =>
        `registry/${sourceStyle}/${typeof file === "string" ? file : file.path}`
    );
    if (!resolveFiles) {
      continue;
    }

    // Copy files to target style if they don't exist.
    for (const file of resolveFiles) {
      const sourcePath = path.join(process.cwd(), file);
      const targetPath = path.join(
        process.cwd(),
        file.replace(sourceStyle, targetStyle)
      );

      if (!existsSync(targetPath)) {
        // Create directory if it doesn't exist.
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.copyFile(sourcePath, targetPath);

        // Replace all @/registry/new-york/ with @/registry/default/.
        const content = await fs.readFile(targetPath, "utf8");
        const fixedContent = content.replace(
          new RegExp(`@/registry/${sourceStyle}/`, "g"),
          `@/registry/${targetStyle}/`
        );
        await fs.writeFile(targetPath, fixedContent, "utf8");
      }
    }
  }
}

// ----------------------------------------------------------------------------
// Build registry JSON file for v4
// ----------------------------------------------------------------------------
async function buildRegistryJsonFile() {
  const fixedRegistry = {
    ...registry,
    version: "4.0.0", // Mark as v4 compatible
    items: registry.items.map((item) => {
      const files = item.files?.map((file) => {
        return {
          ...file,
          path: `${file.path}`,
        };
      });

      return {
        ...item,
        files,
        // Add v4 compatibility flag
        tailwindVersion: "4.0.0",
      };
    }),
  };

  rimraf.sync(path.join(process.cwd(), `public/registryV4.json`));

  const registryJson = JSON.stringify(fixedRegistry, null, 2);

  await fs.writeFile(
    path.join(process.cwd(), `public/registryV4.json`),
    registryJson
  );
}

// ----------------------------------------------------------------------------
// Build registry styles for v4 (no config.js needed)
// ----------------------------------------------------------------------------
async function buildStylesIndex() {
  for (const style of styles) {
    const targetPath = path.join(REGISTRY_PATH, "styles", style.name);

    // Create directory if it doesn't exist.
    if (!existsSync(targetPath)) {
      await fs.mkdir(targetPath, { recursive: true });
    }

    const payload: z.infer<typeof registryItemSchema> = {
      name: style.name,
      type: "registry:style",
      dependencies: [
        "tailwindcss@next", // Use v4 beta/canary
        "class-variance-authority",
        "lucide-react",
      ],
      registryDependencies: ["utils"],
      // Use CSS field for v4
      tailwind: {
        css: BASE_STYLES_V4_SIMPLE,
      },
      cssVars: {
        light: {
          background: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
          card: "hsl(0 0% 100%)",
          "card-foreground": "hsl(222.2 84% 4.9%)",
          popover: "hsl(0 0% 100%)",
          "popover-foreground": "hsl(222.2 84% 4.9%)",
          primary: "hsl(222.2 47.4% 11.2%)",
          "primary-foreground": "hsl(210 40% 98%)",
          secondary: "hsl(210 40% 96%)",
          "secondary-foreground": "hsl(222.2 84% 4.9%)",
          muted: "hsl(210 40% 96%)",
          "muted-foreground": "hsl(215.4 16.3% 46.9%)",
          accent: "hsl(210 40% 96%)",
          "accent-foreground": "hsl(222.2 84% 4.9%)",
          destructive: "hsl(0 84.2% 60.2%)",
          "destructive-foreground": "hsl(210 40% 98%)",
          border: "hsl(214.3 31.8% 91.4%)",
          input: "hsl(214.3 31.8% 91.4%)",
          ring: "hsl(222.2 84% 4.9%)",
        },
        dark: {
          background: "hsl(222.2 84% 4.9%)",
          foreground: "hsl(210 40% 98%)",
          card: "hsl(222.2 84% 4.9%)",
          "card-foreground": "hsl(210 40% 98%)",
          popover: "hsl(222.2 84% 4.9%)",
          "popover-foreground": "hsl(210 40% 98%)",
          primary: "hsl(210 40% 98%)",
          "primary-foreground": "hsl(222.2 47.4% 11.2%)",
          secondary: "hsl(217.2 32.6% 17.5%)",
          "secondary-foreground": "hsl(210 40% 98%)",
          muted: "hsl(217.2 32.6% 17.5%)",
          "muted-foreground": "hsl(215 20.2% 65.1%)",
          accent: "hsl(217.2 32.6% 17.5%)",
          "accent-foreground": "hsl(210 40% 98%)",
          destructive: "hsl(0 62.8% 30.6%)",
          "destructive-foreground": "hsl(210 40% 98%)",
          border: "hsl(217.2 32.6% 17.5%)",
          input: "hsl(217.2 32.6% 17.5%)",
          ring: "hsl(212.7 26.8% 83.9%)",
        },
      },
      files: [],
    };

    await fs.writeFile(
      path.join(targetPath, "index.json"),
      JSON.stringify(payload, null, 2),
      "utf8"
    );
  }
}

// ----------------------------------------------------------------------------
// Build registry/styles/[style]/[name].json.
// ----------------------------------------------------------------------------
async function buildStyles(registry: Registry) {
  for (const style of styles) {
    const targetPath = path.join(REGISTRY_PATH, "styles", style.name);

    // Create directory if it doesn't exist.
    if (!existsSync(targetPath)) {
      await fs.mkdir(targetPath, { recursive: true });
    }

    for (const item of registry.items) {
      if (!REGISTRY_INDEX_WHITELIST.includes(item.type)) {
        continue;
      }

      let files;
      if (item.files) {
        files = await Promise.all(
          item.files.map(async (_file) => {
            const file =
              typeof _file === "string"
                ? {
                    path: _file,
                    type: item.type,
                    content: "",
                    target: "",
                  }
                : _file;

            let content: string;
            try {
              content = await fs.readFile(
                path.join(process.cwd(), "registry_v4", style.name, file.path),
                "utf8"
              );
            } catch (error) {
              return;
            }

            const tempFile = await createTempSourceFile(file.path);
            const sourceFile = project.createSourceFile(tempFile, content, {
              scriptKind: ScriptKind.TSX,
            });

            sourceFile.getVariableDeclaration("iframeHeight")?.remove();
            sourceFile.getVariableDeclaration("containerClassName")?.remove();
            sourceFile.getVariableDeclaration("description")?.remove();

            let target = file.target || "";

            if ((!target || target === "") && item.name.startsWith("v0-")) {
              const fileName = file.path.split("/").pop();
              if (
                file.type === "registry:block" ||
                file.type === "registry:component" ||
                file.type === "registry:example"
              ) {
                target = `components/${fileName}`;
              }

              if (file.type === "registry:ui") {
                target = `components/ui/${fileName}`;
              }

              if (file.type === "registry:hook") {
                target = `hooks/${fileName}`;
              }

              if (file.type === "registry:lib") {
                target = `lib/${fileName}`;
              }
            }

            return {
              path: file.path,
              type: file.type,
              content: sourceFile.getText(),
              target,
            };
          })
        );
      }

      const payload = registryItemSchema.safeParse({
        $schema: "https://www.axionjs.com/schema/registry-item.json",
        author: "axionjs (https://www.axionjs.com)",
        ...item,
        files,
      });

      if (payload.success) {
        await fs.writeFile(
          path.join(targetPath, `${item.name}.json`),
          JSON.stringify(payload.data, null, 2),
          "utf8"
        );
      }
    }
  }

  // ----------------------------------------------------------------------------
  // Build registry/styles/index.json.
  // ----------------------------------------------------------------------------
  const stylesJson = JSON.stringify(styles, null, 2);
  await fs.writeFile(
    path.join(REGISTRY_PATH, "styles/index.json"),
    stylesJson,
    "utf8"
  );
}

// ----------------------------------------------------------------------------
// Build themes for v4 (CSS-based approach with templates)
// ----------------------------------------------------------------------------
async function buildThemes() {
  const themesTargetPath = path.join(REGISTRY_PATH, "themes");
  const colorsTargetPath = path.join(REGISTRY_PATH, "colors");

  // Clean up existing directories
  rimraf.sync(themesTargetPath);
  rimraf.sync(colorsTargetPath);

  // Create fresh directories
  await fs.mkdir(themesTargetPath, { recursive: true });
  await fs.mkdir(colorsTargetPath, { recursive: true });

  // Generate theme CSS for v4
  let themeCSS = `/* Auto-generated themes for Tailwind v4 */
@import "tailwindcss";

`;

  // Process each theme
  for (const theme of themes) {
    const { name, cssVars, cssVarsV4 } = theme;

    // Create v4 theme CSS
    const themeV4CSS = generateThemeV4CSS(name, cssVars);
    themeCSS += themeV4CSS;

    // Create theme JSON with v4 structure including templates
    const themeJson = {
      type: "registry:theme",
      name,
      label: theme.label,
      activeColor: theme.activeColor,
      version: "4.0.0",
      cssVars,
      cssVarsV4,
      // V4 uses CSS-based themes
      css: themeV4CSS,
      // Add templates like in v3
      inlineColorsTemplate: template(BASE_STYLES_V4_INLINE)({}),
      cssVarsTemplate: template(BASE_STYLES_V4_WITH_VARIABLES)({
        colors: cssVars,
      }),
      // Remove config-based approach
      tailwindConfig: null,
    };

    // Write theme JSON file
    await fs.writeFile(
      path.join(themesTargetPath, `${name}.json`),
      JSON.stringify(themeJson, null, 2),
      "utf8"
    );

    // Create color JSON file
    const colorJson = {
      name,
      cssVars,
      cssVarsV4,
      version: "4.0.0",
    };

    await fs.writeFile(
      path.join(colorsTargetPath, `${name}.json`),
      JSON.stringify(colorJson, null, 2),
      "utf8"
    );
  }

  // Write combined themes CSS for v4
  await fs.writeFile(path.join(REGISTRY_PATH, "themes.css"), themeCSS, "utf8");

  // Create theme indices
  const themesIndex = {
    version: "4.0.0",
    themes: themes.map((theme) => ({
      name: theme.name,
      label: theme.label,
      activeColor: theme.activeColor,
    })),
  };

  await fs.writeFile(
    path.join(themesTargetPath, "index.json"),
    JSON.stringify(themesIndex, null, 2),
    "utf8"
  );

  await fs.writeFile(
    path.join(colorsTargetPath, "index.json"),
    JSON.stringify(themesIndex, null, 2),
    "utf8"
  );
}

// ----------------------------------------------------------------------------
// Generate Tailwind v4 theme CSS
// ----------------------------------------------------------------------------
function generateThemeV4CSS(themeName: string, cssVars: any) {
  return `
/* Theme: ${themeName} */
@theme reference {
  --color-${themeName}-background: ${cssVars.light.background};
  --color-${themeName}-foreground: ${cssVars.light.foreground};
  --color-${themeName}-card: ${cssVars.light.card};
  --color-${themeName}-card-foreground: ${cssVars.light["card-foreground"]};
  --color-${themeName}-popover: ${cssVars.light.popover};
  --color-${themeName}-popover-foreground: ${cssVars.light["popover-foreground"]};
  --color-${themeName}-primary: ${cssVars.light.primary};
  --color-${themeName}-primary-foreground: ${cssVars.light["primary-foreground"]};
  --color-${themeName}-secondary: ${cssVars.light.secondary};
  --color-${themeName}-secondary-foreground: ${cssVars.light["secondary-foreground"]};
  --color-${themeName}-muted: ${cssVars.light.muted};
  --color-${themeName}-muted-foreground: ${cssVars.light["muted-foreground"]};
  --color-${themeName}-accent: ${cssVars.light.accent};
  --color-${themeName}-accent-foreground: ${cssVars.light["accent-foreground"]};
  --color-${themeName}-destructive: ${cssVars.light.destructive};
  --color-${themeName}-destructive-foreground: ${cssVars.light["destructive-foreground"]};
  --color-${themeName}-border: ${cssVars.light.border};
  --color-${themeName}-input: ${cssVars.light.input};
  --color-${themeName}-ring: ${cssVars.light.ring};
}

.theme-${themeName} {
  --color-background: var(--color-${themeName}-background);
  --color-foreground: var(--color-${themeName}-foreground);
  --color-card: var(--color-${themeName}-card);
  --color-card-foreground: var(--color-${themeName}-card-foreground);
  --color-popover: var(--color-${themeName}-popover);
  --color-popover-foreground: var(--color-${themeName}-popover-foreground);
  --color-primary: var(--color-${themeName}-primary);
  --color-primary-foreground: var(--color-${themeName}-primary-foreground);
  --color-secondary: var(--color-${themeName}-secondary);
  --color-secondary-foreground: var(--color-${themeName}-secondary-foreground);
  --color-muted: var(--color-${themeName}-muted);
  --color-muted-foreground: var(--color-${themeName}-muted-foreground);
  --color-accent: var(--color-${themeName}-accent);
  --color-accent-foreground: var(--color-${themeName}-accent-foreground);
  --color-destructive: var(--color-${themeName}-destructive);
  --color-destructive-foreground: var(--color-${themeName}-destructive-foreground);
  --color-border: var(--color-${themeName}-border);
  --color-input: var(--color-${themeName}-input);
  --color-ring: var(--color-${themeName}-ring);
}

@media (prefers-color-scheme: dark) {
  .theme-${themeName} {
    --color-background: ${cssVars.dark.background};
    --color-foreground: ${cssVars.dark.foreground};
    --color-card: ${cssVars.dark.card};
    --color-card-foreground: ${cssVars.dark["card-foreground"]};
    --color-popover: ${cssVars.dark.popover};
    --color-popover-foreground: ${cssVars.dark["popover-foreground"]};
    --color-primary: ${cssVars.dark.primary};
    --color-primary-foreground: ${cssVars.dark["primary-foreground"]};
    --color-secondary: ${cssVars.dark.secondary};
    --color-secondary-foreground: ${cssVars.dark["secondary-foreground"]};
    --color-muted: ${cssVars.dark.muted};
    --color-muted-foreground: ${cssVars.dark["muted-foreground"]};
    --color-accent: ${cssVars.dark.accent};
    --color-accent-foreground: ${cssVars.dark["accent-foreground"]};
    --color-destructive: ${cssVars.dark.destructive};
    --color-destructive-foreground: ${cssVars.dark["destructive-foreground"]};
    --color-border: ${cssVars.dark.border};
    --color-input: ${cssVars.dark.input};
    --color-ring: ${cssVars.dark.ring};
  }
}

`;
}

// ----------------------------------------------------------------------------
// Build registry with v4 compatibility
// ----------------------------------------------------------------------------
async function buildRegistry(registry: Registry) {
  let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry-v4.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
`;

  for (const style of styles) {
    index += `  "${style.name}": {`;

    for (const item of registry.items) {
      const resolveFiles = item.files?.map(
        (file) =>
          `registry/${style.name}/${
            typeof file === "string" ? file : file.path
          }`
      );
      if (!resolveFiles) {
        continue;
      }

      const type = item.type.split(":")[1];
      let sourceFilename = "";

      if (
        item.type === "registry:block" ||
        item.type === "registry:dynamic-component"
      ) {
        const file = resolveFiles[0];
        const filename = path.basename(file);
        let raw: string;
        try {
          raw = await fs.readFile(file, "utf8");
        } catch (error) {
          continue;
        }
        const tempFile = await createTempSourceFile(filename);
        const sourceFile = project.createSourceFile(tempFile, raw, {
          scriptKind: ScriptKind.TSX,
        });

        sourceFilename = `__registryV4__/${style.name}/${type}/${item.name}.tsx`;

        if (item.files) {
          const files = item.files.map((file) =>
            typeof file === "string"
              ? { type: "registry:page", path: file }
              : file
          );
          if (files?.length) {
            sourceFilename = `__registryV4__/${style.name}/${files[0].path}`;
          }
        }

        const sourcePath = path.join(process.cwd(), sourceFilename);
        if (!existsSync(path.dirname(sourcePath))) {
          await fs.mkdir(path.dirname(sourcePath), { recursive: true });
        }

        rimraf.sync(sourcePath);
        await fs.writeFile(sourcePath, sourceFile.getText());
      }

      let componentPath = `@/registry/${style.name}/${type}/${item.name}`;

      if (item.files) {
        const files = item.files.map((file) =>
          typeof file === "string"
            ? { type: "registry:page", path: file }
            : file
        );
        if (files?.length) {
          componentPath = `@/registry/${style.name}/${files[0].path}`;
        }
      }

      index += `
    "${item.name}": {
      name: "${item.name}",
      description: "${item.description ?? ""}",
      type: "${item.type}",
      version: "4.0.0",
      registryDependencies: ${JSON.stringify(item.registryDependencies)},
      files: [${item.files?.map((file) => {
        const filePath = `registry/${style.name}/${
          typeof file === "string" ? file : file.path
        }`;
        return typeof file === "string"
          ? `"${filePath}"`
          : `{
        path: "${filePath}",
        type: "${file.type}",
        target: "${file.target ?? ""}"
      }`;
      })}],
      categories: ${JSON.stringify(item.categories)},
      component: React.lazy(() => import("${componentPath}")),
      source: "${sourceFilename}",
      meta: ${JSON.stringify(item.meta)},
    },`;
    }

    index += `
  },`;
  }

  index += `
}
`;

  // Write registry index
  const items = registry.items
    .filter((item) => ["registry:ui", "registry:hook"].includes(item.type))
    .map((item) => {
      return {
        ...item,
        version: "4.0.0",
        files: item.files?.map((_file) => {
          const file =
            typeof _file === "string"
              ? {
                  path: _file,
                  type: item.type,
                }
              : _file;
          return file;
        }),
      };
    });

  const registryJson = JSON.stringify(items, null, 2);
  rimraf.sync(path.join(REGISTRY_PATH, "index.json"));
  await fs.writeFile(
    path.join(REGISTRY_PATH, "index.json"),
    registryJson,
    "utf8"
  );

  // Write style index
  rimraf.sync(path.join(process.cwd(), "__registryV4__/index.tsx"));
  await fs.writeFile(
    path.join(process.cwd(), "__registryV4__/index.tsx"),
    index
  );
}

// ----------------------------------------------------------------------------
// Build registry/icons/index.json.
// ----------------------------------------------------------------------------
async function buildIcons() {
  const iconsTargetPath = path.join(REGISTRY_PATH, "icons");
  rimraf.sync(iconsTargetPath);
  if (!existsSync(iconsTargetPath)) {
    await fs.mkdir(iconsTargetPath, { recursive: true });
  }

  const iconsData = icons;

  await fs.writeFile(
    path.join(iconsTargetPath, "index.json"),
    JSON.stringify(iconsData, null, 2),
    "utf8"
  );
}

// ----------------------------------------------------------------------------
// Build __registryV4__/icons.tsx.
// ----------------------------------------------------------------------------
async function buildRegistryIcons() {
  let index = `// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Icons = {
`;

  for (const [icon, libraries] of Object.entries(icons)) {
    index += `  "${icon}": {`;
    for (const [library, componentName] of Object.entries(libraries)) {
      const packageName = iconLibraries[library].package;
      if (packageName) {
        index += `
  ${library}: React.lazy(() => import("${packageName}").then(mod => ({
    default: mod.${componentName}
  }))),`;
      }
    }
    index += `
},`;
  }

  index += `
}
`;

  // Write style index.
  rimraf.sync(path.join(process.cwd(), "__registryV4__/icons.tsx"));
  await fs.writeFile(
    path.join(process.cwd(), "__registryV4__/icons.tsx"),
    index,
    "utf8"
  );
}

try {
  console.log("💽 Building registry for Tailwind v4...");
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await syncStyles();
  await buildRegistry(result.data);
  await buildStylesIndex();
  await buildStyles(result.data);
  await buildRegistryJsonFile();
  await buildRegistryIcons();
  await buildIcons();
  await buildThemes();
  await buildRegistryJsonFile();

  console.log("✅ Tailwind v4 registry build complete!");
} catch (error) {
  console.error(error);
  process.exit(1);
}
