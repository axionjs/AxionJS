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
import { getTargetStyleFromConfig } from "../get-config.js";
import {
  getProjectInfo,
  getProjectTailwindVersionFromConfig,
} from "../get-project-info.js";

import { buildTailwindThemeColorsFromCssVars } from "../updaters/update-tailwind-config.js";
import deepmerge from "deepmerge";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import { z } from "zod";

const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://www.axionjs.com/r";

const agent = process.env.https_proxy
  ? new HttpsProxyAgent(process.env.https_proxy)
  : undefined;

export async function getRegistryIndex(category) {
  try {
    const [result] = await fetchRegistry(["index.json"]);
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
      category: "Modern",
      themes: [
        { name: "modernGradient", label: "Modern Gradient" },
        { name: "modernGlass", label: "Modern Glass" },
        { name: "modernNeon", label: "Modern Neon" },
        { name: "modernTech", label: "Modern Tech" },
        { name: "modernAurora", label: "Modern Aurora" },
      ],
    },
    {
      category: "Minimal",
      themes: [
        { name: "default", label: "Default" },
        { name: "mintFresh", label: "Mint Fresh" },
        { name: "coffeeBrown", label: "Coffee Brown" },
        { name: "lavenderMist", label: "Lavender Mist" },
        { name: "bronzeCopper", label: "Bronze Copper" },
        { name: "sageGreen", label: "Sage Green" },
      ],
    },
    {
      category: "Gaming",
      themes: [
        { name: "cyberNeon", label: "Cyber Neon" },
        { name: "neonLime", label: "Neon Lime" },
        { name: "electricBlue", label: "Electric Blue" },
        { name: "neonPink", label: "Neon Pink" },
      ],
    },
    {
      category: "Corporate",
      themes: [
        { name: "businessBlue", label: "Business Blue" },
        { name: "indigoDeep", label: "Indigo Deep" },
        { name: "slateGray", label: "Slate Gray" },
        { name: "sapphireBlue", label: "Sapphire Blue" },
        { name: "midnightBlue", label: "Midnight Blue" },
        { name: "charcoalDark", label: "Charcoal Dark" },
        { name: "elegantNavy", label: "Elegant Navy" },
      ],
    },
    {
      category: "Creative",
      themes: [
        { name: "creativePurple", label: "Creative Purple" },
        { name: "sunsetOrange", label: "Sunset Orange" },
        { name: "rosePink", label: "Rose Pink" },
        { name: "coralRed", label: "Coral Red" },
        { name: "violetDream", label: "Violet Dream" },
        { name: "royalPurple", label: "Royal Purple" },
        { name: "crimsonFire", label: "Crimson Fire" },
        { name: "cherryBlossom", label: "Cherry Blossom" },
        { name: "sunsetPeach", label: "Sunset Peach" },
        { name: "magentaPop", label: "Magenta Pop" },
        { name: "elegantBurgundy", label: "Elegant Burgundy" },
        { name: "comicPop", label: "Comic Pop" },
        { name: "comicBubble", label: "Comic Bubble" },
        { name: "comicHero", label: "Comic Hero" },
        { name: "comicRainbow", label: "Comic Rainbow" },
      ],
    },
    {
      category: "Monochrome",
      themes: [
        { name: "elegantPlatinum", label: "Elegant Platinum" },
        { name: "arcticFrost", label: "Arctic Frost" },
        { name: "steelGray", label: "Steel Gray" },
      ],
    },
    {
      category: "Vibrant",
      themes: [
        { name: "oceanBlue", label: "Ocean Blue" },
        { name: "forestGreen", label: "Forest Green" },
        { name: "goldenYellow", label: "Golden Yellow" },
        { name: "tealMint", label: "Teal Mint" },
        { name: "emeraldFresh", label: "Emerald Fresh" },
        { name: "amberWarm", label: "Amber Warm" },
        { name: "tropicalCyan", label: "Tropical Cyan" },
      ],
    },
    {
      category: "Unique",
      themes: [
        { name: "elegantGold", label: "Elegant Gold" },
        { name: "elegantEmerald", label: "Elegant Emerald" },
      ],
    },
  ];
}

export async function getRegistryBaseColor(baseColor) {
  try {
    const [result] = await fetchRegistry([`themes/${baseColor}.json`]);

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

export async function fetchRegistry(paths) {
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

  const style = config.resolvedPaths?.cwd
    ? await getTargetStyleFromConfig(config.resolvedPaths.cwd, config.style)
    : config.style;
  async function resolveDependencies(itemUrl) {
    const url = getRegistryUrl(
      isUrl(itemUrl) ? itemUrl : `styles/${style}/${itemUrl}.json`
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
  const [baseColor, tailwindVersion] = await Promise.all([
    getRegistryBaseColor(name),
    getProjectTailwindVersionFromConfig(config),
  ]);
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
      theme: {
        ...baseColor.cssVars.theme,
        ...theme.cssVars.theme,
      },
      light: {
        ...baseColor.cssVars.light,
        ...theme.cssVars.light,
      },
      dark: {
        ...baseColor.cssVars.dark,
        ...theme.cssVars.dark,
      },
    };

    // Update theme to be v4 compatible.
    if (tailwindVersion === "v4" && baseColor.cssVarsV4) {
      theme.cssVars = {
        theme: {
          ...baseColor.cssVarsV4.theme,
          ...theme.cssVars.theme,
        },
        light: {
          radius: "0.625rem",
          ...baseColor.cssVarsV4.light,
        },
        dark: {
          ...baseColor.cssVarsV4.dark,
        },
      };
    }
  }

  return theme;
}

function getRegistryUrl(path) {
  if (isUrl(path)) {
    const url = new URL(path);
    return url.toString();
  }

  return `${REGISTRY_URL}/${path}`;
}

export function isUrl(path) {
  try {
    new URL(path);
    return true;
  } catch (error) {
    return false;
  }
}
