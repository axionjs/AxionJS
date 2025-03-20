import { z } from "zod";
import path from "path";
import { cosmiconfig } from "cosmiconfig";
import { highlighter } from "./highlighter.js";
import { resolveImport } from "./resolve-import.js";
import { loadConfig } from "tsconfig-paths";
import { getProjectInfo } from "./get-project-info.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "@/components";
export const DEFAULT_UTILS = "@/lib/utils";
export const DEFAULT_AUTH = "@/auth";
export const DEFAULT_API = "@/api";
export const DEFAULT_TAILWIND_CSS = "app/globals.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";

const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"],
});

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    rsc: z.coerce.boolean().default(false),
    tsx: z.coerce.boolean().default(true),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().default("").optional(),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional(),
      lib: z.string().optional(),
      hooks: z.string().optional(),
      auth: z.string().optional(),
      actions: z.string().optional(),
      middleware: z.string().optional(),
      schemas: z.string().optional(),
      pages: z.string().optional(),
      auth_comp: z.string().optional(),
      api: z.string().optional(),
      email: z.string().optional(),
    }),
    iconLibrary: z.string().optional(),
  })
  .strict();

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    cwd: z.string(),
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    lib: z.string(),
    hooks: z.string(),
    ui: z.string(),
    auth: z.string(),
    actions: z.string(),
    middleware: z.string(),
    schemas: z.string().optional(),
    pages: z.string().optional(),
    auth_comp: z.string().optional(),
    api: z.string().optional(),
    email: z.string().optional(),
  }),
});

export async function getConfig(cwd) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  // Set default icon library if not provided.
  if (!config.iconLibrary) {
    config.iconLibrary = config.style === "new-york" ? "radix" : "lucide";
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(cwd, config) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd);

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim()
    );
  }

  const projectInfo = await getProjectInfo(cwd);
  return configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components: await resolveImport(config.aliases["components"], tsConfig),
      ui: config.aliases["ui"]
        ? await resolveImport(config.aliases["ui"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["components"], tsConfig)) ??
              cwd,
            "ui"
          ),
      // TODO: Make this configurable.
      // For now, we assume the lib and hooks directories are one level up from the components directory.
      lib: config.aliases["lib"]
        ? await resolveImport(config.aliases["lib"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["utils"], tsConfig)) ?? cwd,
            ".."
          ),
      hooks: config.aliases["hooks"]
        ? await resolveImport(config.aliases["hooks"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["components"], tsConfig)) ??
              cwd,
            "..",
            "hooks"
          ),
      auth: config.aliases["auth"]
        ? await resolveImport(config.aliases["auth"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["components"], tsConfig)) ??
              cwd,
            "..",
            "auth"
          ),
      actions: config.aliases["actions"]
        ? await resolveImport(config.aliases["actions"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["components"], tsConfig)) ??
              cwd,
            "..",
            "actions"
          ),
      middleware: projectInfo.isSrcDir
        ? path.resolve(cwd, "src")
        : path.resolve(cwd),
      schemas: config.aliases["schemas"]
        ? await resolveImport(config.aliases["schemas"], tsConfig)
        : path.resolve(cwd, "schemas"),
      pages: config.aliases["pages"]
        ? await resolveImport(config.aliases["pages"], tsConfig)
        : path.resolve(cwd, "app"),
      auth_comp: config.aliases["auth_comp"]
        ? await resolveImport(config.aliases["auth_comp"], tsConfig)
        : path.resolve(cwd, "components", "auth"),

      api: config.aliases["api"]
        ? await resolveImport(config.aliases["api"], tsConfig)
        : path.resolve(cwd, "app", "api"),

      email: config.aliases["email"]
        ? await resolveImport(config.aliases["email"], tsConfig)
        : path.resolve(cwd, "emails"),
    },
  });
}

export async function getRawConfig(cwd) {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    const componentPath = `${cwd}/components.json`;
    throw new Error(
      `Invalid configuration found in ${highlighter.info(componentPath)}.`
    );
  }
}
