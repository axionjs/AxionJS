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

const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://ui.shadcn.com/r";

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(["index.json"]);

    return registryIndexSchema.parse(result);
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

export async function getRegistryItem(name, style) {
  try {
    const [result] = await fetchRegistry([
      isUrl(name) ? name : `styles/${style}/${name}.json`,
    ]);

    return registryItemSchema.parse(result);
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

async function fetchRegistry(paths) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const url = getRegistryUrl(path);
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

  if (file.type === "registry:block" || file.type === "registry:component") {
    return config.resolvedPaths.components;
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

export async function registryResolveItemsTree(names, config) {
  try {
    const index = await getRegistryIndex();
    if (!index) {
      return null;
    }

    // If we're resolving the index, we want it to go first.
    if (names.includes("index")) {
      names.unshift("index");
    }

    let registryDependencies = [];
    for (const name of names) {
      const itemRegistryDependencies = await resolveRegistryDependencies(
        name,
        config
      );
      registryDependencies.push(...itemRegistryDependencies);
    }

    const uniqueRegistryDependencies = Array.from(
      new Set(registryDependencies)
    );
    let result = await fetchRegistry(uniqueRegistryDependencies);
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

async function resolveRegistryDependencies(url, config) {
  const visited = new Set();
  const payload = [];

  async function resolveDependencies(itemUrl) {
    const url = getRegistryUrl(
      isUrl(itemUrl) ? itemUrl : `styles/${config.style}/${itemUrl}.json`
    );

    if (visited.has(url)) {
      return;
    }

    visited.add(url);

    try {
      const [result] = await fetchRegistry([url]);
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

function getRegistryUrl(path) {
  if (isUrl(path)) {
    const url = new URL(path);
    return url.toString();
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
