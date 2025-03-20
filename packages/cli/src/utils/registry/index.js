import path from "path";
import { handleError } from "../handle-error.js";
import { highlighter } from "../highlighter.js";
import { logger } from "../logger.js";
import {
  iconsSchema,
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemSchema,
  registryResolvedItemsTreeSchema,
  stylesSchema,
} from "./schema.js";
import { buildTailwindThemeColorsFromCssVars } from "../updaters/update-tailwind-config.js";
import deepmerge from "deepmerge";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { z } from "zod";

const REGISTRY_URL = process.env.REGISTRY_URL ?? "http://localhost:3001/r";

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndex(category) {
  try {
    const [result] = await fetchRegistry(["index.json"], category);
    const index = registryIndexSchema.parse(result);
    return category
      ? index.filter((item) => item.type === `registry:${category}`)
      : index;
  } catch (error) {
    logger.error("\n");
    handleError(error);
  }
}

export async function getRegistryStyles() {
  try {
    const [result] = await fetchRegistry(["styles/index.json"]);

    return stylesSchema.parse(result);
  } catch (error) {
    logger.error("\n");
    handleError(error);
    return [];
  }
}

export async function getRegistryIcons() {
  try {
    const [result] = await fetchRegistry(["icons/index.json"]);
    return iconsSchema.parse(result);
  } catch (error) {
    handleError(error);
    return {};
  }
}

export async function getRegistryItem(name, style, category) {
  try {
    if (category === "auth") {
      const [result] = await fetchRegistry([
        isUrl(name) ? name : `auth/${name}.json`,
      ]);
      return registryItemSchema.parse(result);
    } else {
      const [result] = await fetchRegistry([
        isUrl(name) ? name : `styles/${style}/${name}.json`,
        category,
      ]);

      return registryItemSchema.parse(result);
    }
  } catch (error) {
    logger.break();
    handleError(error);
    return null;
  }
}

export async function getRegistryBaseColors() {
  return [
    {
      name: "neutral",
      label: "Neutral",
    },
    {
      name: "gray",
      label: "Gray",
    },
    {
      name: "zinc",
      label: "Zinc",
    },
    {
      name: "stone",
      label: "Stone",
    },
    {
      name: "slate",
      label: "Slate",
    },
  ];
}

export async function getRegistryBaseColor(baseColor) {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`]);

    return registryBaseColorSchema.parse(result);
  } catch (error) {
    handleError(error);
  }
}

export async function resolveTree(index, names) {
  const tree = [];

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name);

    if (!entry) {
      continue;
    }

    tree.push(entry);

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies);
      tree.push(...dependencies);
    }
  }

  return tree.filter(
    (component, index, self) =>
      self.findIndex((c) => c.name === component.name) === index
  );
}

export async function fetchTree(style, tree) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`);
    const result = await fetchRegistry(paths);
    return registryIndexSchema.parse(result);
  } catch (error) {
    handleError(error);
  }
}

export async function getItemTargetPath(config, item, override) {
  if (override) {
    return override;
  }

  if (item.type === "registry:ui") {
    return config.resolvedPaths.ui ?? config.resolvedPaths.components;
  }

  const [parent, type] = item.type?.split(":") ?? [];
  if (!(parent in config.resolvedPaths)) {
    return null;
  }

  return path.join(config.resolvedPaths[parent], type);
}

export async function fetchRegistry(paths, category) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const url = getRegistryUrl(path, category);
        const response = await fetch(url, { agent });

        if (!response.ok) {
          const errorMessages = {
            400: "Bad request",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not found",
            500: "Internal server error",
          };

          if (response.status === 401) {
            throw new Error(
              `You are not authorized to access the component at ${highlighter.info(
                url
              )}.\nIf this is a remote registry, you may need to authenticate.`
            );
          }

          if (response.status === 404) {
            throw new Error(
              `The component at ${highlighter.info(
                url
              )} was not found.\nIt may not exist at the registry. Please make sure it is a valid component.`
            );
          }

          if (response.status === 403) {
            throw new Error(
              `You do not have access to the component at ${highlighter.info(
                url
              )}.\nIf this is a remote registry, you may need to authenticate or a token.`
            );
          }

          const result = await response.json();
          const message =
            result && typeof result === "object" && "error" in result
              ? result.error
              : response.statusText || errorMessages[response.status];
          throw new Error(
            `Failed to fetch from ${highlighter.info(url)}.\n${message}`
          );
        }

        return response.json();
      })
    );

    return results;
  } catch (error) {
    logger.error("\n");
    handleError(error);
    return [];
  }
}

export function getRegistryItemFileTargetPath(file, config, override) {
  if (override) {
    return override;
  }

  if (file.type === "registry:ui") {
    return config.resolvedPaths.ui;
  }

  if (file.type === "registry:lib") {
    return config.resolvedPaths.lib;
  }

  if (file.type === "registry:actions") {
    return config.resolvedPaths.actions;
  }
  if (file.type === "registry:auth") {
    return config.resolvedPaths.auth;
  }
  if (file.type === "registry:schemas") {
    return config.resolvedPaths.schemas;
  }
  if (file.type === "registry:email") {
    return config.resolvedPaths.email;
  }
  if (file.type === "registry:pages") {
    const basePath = config.resolvedPaths.pages; // This should point to the app directory
    const filePath = file.path; // e.g., "pages/dashboard/page.tsx"

    // Extract the folder structure from the file path
    const folderStructure = path.dirname(filePath); // e.g., "pages/dashboard"
    // Construct the full target path
    const targetPath = path.join(
      basePath,
      folderStructure.replace("pages/", "")
    ); // Remove "pages/" prefix
    return targetPath;
  }
  if (file.type === "registry:auth_comp") {
    return config.resolvedPaths.auth_comp;
  }
  if (file.type === "registry:api") {
    return `${config.resolvedPaths.api}/auth/[...nextauth]/`;
  }

  if (file.type === "registry:block" || file.type === "registry:component") {
    return config.resolvedPaths.components;
  }

  if (file.type === "registry:middleware") {
    return config.resolvedPaths.middleware;
  }
  if (file.type === "registry:hook") {
    return config.resolvedPaths.hooks;
  }

  // TODO: we put this in components for now.
  // We should move this to pages as per framework.
  if (file.type === "registry:page") {
    return config.resolvedPaths.components;
  }

  return config.resolvedPaths.components;
}

export async function registryResolveItemsTree(names, config, category) {
  try {
    const index = await getRegistryIndex(category);
    if (!index) {
      return null;
    }
    if (names.includes("index")) {
      names.unshift("index");
    }

    let registryDependencies = [];
    for (const name of names) {
      const itemRegistryDependencies = await resolveRegistryDependencies(
        name,
        config,
        category
      );
      registryDependencies.push(...itemRegistryDependencies);
    }

    const uniqueRegistryDependencies = Array.from(
      new Set(registryDependencies)
    );
    let result = await fetchRegistry(uniqueRegistryDependencies, category);
    const payload = z.array(registryItemSchema).parse(result);
    if (!payload) {
      return null;
    }

    // If we're resolving the index, we want to fetch
    // the theme item if a base color is provided.
    // We do this for index only.
    // Other components will ship with their theme tokens.
    if (names.includes("index")) {
      if (config.tailwind.baseColor) {
        const theme = await registryGetTheme(config.tailwind.baseColor, config);
        if (theme) {
          payload.unshift(theme);
        }
      }
    }

    let tailwind = {};
    payload.forEach((item) => {
      tailwind = deepmerge(tailwind, item.tailwind ?? {});
    });

    let cssVars = {};
    payload.forEach((item) => {
      cssVars = deepmerge(cssVars, item.cssVars ?? {});
    });

    let docs = "";
    payload.forEach((item) => {
      if (item.docs) {
        docs += `${item.docs}\n`;
      }
    });

    return registryResolvedItemsTreeSchema.parse({
      dependencies: deepmerge.all(
        payload.map((item) => item.dependencies ?? [])
      ),
      devDependencies: deepmerge.all(
        payload.map((item) => item.devDependencies ?? [])
      ),
      files: deepmerge.all(payload.map((item) => item.files ?? [])),
      tailwind,
      cssVars,
      docs,
    });
  } catch (error) {
    handleError(error);
    return null;
  }
}

async function resolveRegistryDependencies(url, config, category) {
  const visited = new Set();
  const payload = [];

  async function resolveDependencies(itemUrl) {
    const path =
      category === "auth"
        ? `${itemUrl}.json`
        : `styles/${config.style}/${itemUrl}.json`;

    const url = getRegistryUrl(isUrl(itemUrl) ? itemUrl : path, category);

    if (visited.has(url)) {
      return;
    }

    visited.add(url);

    try {
      const [result] = await fetchRegistry([url], category);
      const item = registryItemSchema.parse(result);
      payload.push(url);

      if (item.registryDependencies) {
        for (const dependency of item.registryDependencies) {
          await resolveDependencies(dependency);
        }
      }
    } catch (error) {
      console.error(
        `Error fetching or parsing registry item at ${itemUrl}:`,
        error
      );
    }
  }

  await resolveDependencies(url);
  return Array.from(new Set(payload));
}

export async function registryGetTheme(name, config) {
  const baseColor = await getRegistryBaseColor(name);
  if (!baseColor) {
    return null;
  }

  // TODO: Move this to the registry i.e registry:theme.
  const theme = {
    name,
    type: "registry:theme",
    tailwind: {
      config: {
        theme: {
          extend: {
            borderRadius: {
              lg: "var(--radius)",
              md: "calc(var(--radius) - 2px)",
              sm: "calc(var(--radius) - 4px)",
            },
            colors: {},
          },
        },
      },
    },
    cssVars: {
      light: {
        radius: "0.5rem",
      },
      dark: {},
    },
  };

  if (config.tailwind.cssVariables) {
    theme.tailwind.config.theme.extend.colors = {
      ...theme.tailwind.config.theme.extend.colors,
      ...buildTailwindThemeColorsFromCssVars(baseColor.cssVars.dark),
    };
    theme.cssVars = {
      light: {
        ...baseColor.cssVars.light,
        ...theme.cssVars.light,
      },
      dark: {
        ...baseColor.cssVars.dark,
        ...theme.cssVars.dark,
      },
    };
  }

  return theme;
}

function getRegistryUrl(path, category) {
  if (isUrl(path)) {
    const url = new URL(path);
    return url.toString();
  }
  // Handle category-specific paths
  if (category === "auth") {
    return `${REGISTRY_URL}/auth/${path.toLowerCase()}`;
  }

  return `${REGISTRY_URL}/${path.toLowerCase()}`;
}

function isUrl(path) {
  try {
    new URL(path);
    return true;
  } catch (error) {
    return false;
  }
}
