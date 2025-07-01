import { Command } from "commander";
import { z } from "zod";
import fs from "fs-extra";
import path from "path";
import { highlighter } from "../utils/highlighter.js";
import { logger } from "../utils/logger.js";
import { handleError } from "../utils/handle-error.js";
import * as ERRORS from "../utils/errors.js";
import { preFlightInit } from "../preflights/preflight-init.js";
import { createProject } from "../utils/create-project.js";
import {
  getProjectConfig,
  getProjectInfo,
  getProjectTailwindVersionFromConfig,
} from "../utils/get-project-info.js";
import {
  DEFAULT_COMPONENTS,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from "../utils/get-config.js";
import { addComponents } from "../utils/add-components.js";
import {
  getRegistryBaseColors,
  getRegistryItem,
  getRegistryStyles,
  isUrl,
} from "../utils/registry/index.js";
import { updateTailwindContent } from "../utils/updaters/update-tailwind-content.js";
import { text, select, intro, confirm, spinner } from "@clack/prompts";
import kleur from "kleur";

export const initOptionsSchema = z.object({
  cwd: z.string(),
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  defaults: z.boolean(),
  force: z.boolean(),
  silent: z.boolean(),
  isNewProject: z.boolean(),
  srcDir: z.boolean().optional(),
  cssVariables: z.boolean(),
  style: z.string(),
});

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .argument(
    "[components...]",
    "the components to add or a url to the component."
  )
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-d, --defaults,", "use default configuration.", false)
  .option("-f, --force", "force overwrite of existing configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-s, --silent", "mute output.", false)
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .option(
    "--no-src-dir",
    "do not use the src directory when creating a new project."
  )
  .option("--css-variables", "use css variables for theming.", true)
  .option("--no-css-variables", "do not use css variables for theming.")
  .action(async (components, opts) => {
    try {
      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        isNewProject: false,
        components,
        style: "index",
        ...opts,
      });

      // We need to check if we're initializing with a new style.
      // We fetch the payload of the first item.
      // This is okay since the request is cached and deduped.
      if (components.length > 0 && isUrl(components[0])) {
        const item = await getRegistryItem(components[0], "");

        // Skip base color if style.
        // We set a default and let the style override it.
        if (item?.type === "registry:style") {
          options.style = item.extends ?? "index";
        }
      }
      intro(kleur.green("Welcome to ⍺xion.js CLI"));

      await runInit(options);

      logger.log(
        `${highlighter.success(
          "Success!"
        )} Project initialization completed.\nYou may now add components.`
      );
      logger.break();
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });

export async function runInit(options) {
  let projectInfo;
  if (!options.skipPreflight) {
    const preflight = await preFlightInit(options);
    if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
      const { projectPath } = await createProject(options);
      if (!projectPath) {
        process.exit(1);
      }
      options.cwd = projectPath;
      options.isNewProject = true;
    }
    projectInfo = preflight.projectInfo;
  } else {
    projectInfo = await getProjectInfo(options.cwd);
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo);
  const config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : await promptForConfig(await getConfig(options.cwd));

  if (!options.yes) {
    const proceed = await confirm({
      message: `Write configuration to ${highlighter.info(
        "components.json"
      )}. Proceed?`,
      initialValue: true,
    });

    if (!proceed) {
      process.exit(0);
    }
  }

  // Write components.json.
  const componentSpinner = spinner();
  componentSpinner.start("Writing components.json");
  try {
    const targetPath = path.resolve(options.cwd, "components.json");
    await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8");
    componentSpinner.stop("components.json written successfully.");
  } catch (error) {
    componentSpinner.stop("Failed to write components.json.");
    throw error;
  }

  // Add components.
  const fullConfig = await resolveConfigPaths(options.cwd, config);
  const components = [
    ...(options.style === "none" ? [] : [options.style]),
    ...(options.components ?? []),
  ];
  await addComponents(components, fullConfig, {
    // Init will always overwrite files.
    overwrite: true,
    silent: options.silent,
    style: options.style,
    isNewProject:
      options.isNewProject || projectInfo?.framework.name === "next-app",
    cwd: options.cwd,
  });

  // If a new project is using src dir, let's update the tailwind content config.
  // TODO: Handle this per framework.
  if (options.isNewProject && options.srcDir) {
    await updateTailwindContent(
      ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
      fullConfig,
      {
        silent: options.silent,
      }
    );
  }

  return fullConfig;
}

async function promptForConfig(defaultConfig = null) {
  const [styles, baseColors] = await Promise.all([
    getRegistryStyles(),
    getRegistryBaseColors(),
  ]);

  logger.info("");

  // Prompt for category
  const selectedCategory = await select({
    message: `Select a color category:`,
    options: baseColors.map((cat) => ({
      label: cat.category,
      value: cat.category,
    })),
  });

  // Prompt for theme within the selected category
  const selectedTheme = await select({
    message: `Select a theme:`,
    options: baseColors
      .find((cat) => cat.category === selectedCategory)
      .themes.map((theme) => ({
        label: theme.label,
        value: theme.name,
      })),
  });

  const options = {
    typescript: await confirm({
      message: `Would you like to use ${highlighter.info(
        "TypeScript"
      )} (recommended)?`,
      initialValue: defaultConfig?.tsx ?? true,
      active: "yes",
      inactive: "no",
    }),
    tailwindCategory: selectedCategory,
    tailwindBaseColor: selectedTheme,
    tailwindCss: await text({
      message: `Where is your ${highlighter.info("global CSS")} file?`,
      initialValue: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    }),
    tailwindCssVariables: typeof opts.cssVariables === "boolean"
      ? opts.cssVariables
      : await confirm({
          message: `Would you like to use ${highlighter.info("CSS variables")} for theming?`,
          initialValue: defaultConfig?.tailwind.cssVariables ?? true,
          active: "yes",
          inactive: "no",
        }),
    tailwindPrefix: await text({
      message: `Are you using a custom ${highlighter.info(
        "tailwind prefix eg. tw-"
      )}? (Leave blank if not)`,
      initialValue: "",
    }),
    tailwindConfig: await text({
      message: `Where is your ${highlighter.info(
        "tailwind.config.js"
      )} located?`,
      initialValue: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    }),
    components: await text({
      message: `Configure the import alias for ${highlighter.info(
        "components"
      )}:`,
      initialValue: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
    }),
    utils: await text({
      message: `Configure the import alias for ${highlighter.info("utils")}:`,
      initialValue: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
    }),
    rsc: await confirm({
      message: `Are you using ${highlighter.info("React Server Components")}?`,
      initialValue: defaultConfig?.rsc ?? true,
      active: "yes",
      inactive: "no",
    }),
  };

  return rawConfigSchema.parse({
    $schema: "http://localhost:3001/schema.json",
    style: "new-york",
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      baseColor: options.tailwindBaseColor,
      cssVariables: options.tailwindCssVariables,
      prefix: options.tailwindPrefix,
    },
    rsc: options.rsc,
    tsx: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
      // TODO: fix this.
      lib: options.components.replace(/\/components$/, "lib"),
      hooks: options.components.replace(/\/components$/, "hooks"),
      auth: options.components.replace(/\/components$/, "auth"),
      actions: options.components.replace(/\/components$/, "actions"),
      middleware: options.components.replace(/\/components$/, ""),
      schemas: options.components.replace(/\/components$/, "schemas"),
      auth_comp: options.components.replace(/\/components$/, "components/auth"),
      api: options.components.replace(/\/components$/, "api"),
      email: options.components.replace(/\/components$/, "email"),
    },
  });
}

async function promptForMinimalConfig(defaultConfig, opts) {
  let style = defaultConfig.style;
  let baseColor = defaultConfig.tailwind.baseColor;
  let cssVariables = defaultConfig.tailwind.cssVariables;

  if (!opts.defaults) {
    const [styles, baseColors, tailwindVersion] = await Promise.all([
      getRegistryStyles(),
      getRegistryBaseColors(),
      getProjectTailwindVersionFromConfig(defaultConfig),
    ]);
    const options = {};
    options.style = "new-york";

    // ---- Category → Theme selection for base color ----
    const selectedCategory = await select({
      message: `Select a color category:`,
      options: baseColors.map((cat) => ({
        label: cat.category,
        value: cat.category,
      })),
    });

    const selectedTheme = await select({
      message: `Select a theme:`,
      options: baseColors
        .find((cat) => cat.category === selectedCategory)
        .themes.map((theme) => ({
          label: theme.label,
          value: theme.name,
        })),
    });
    options.tailwindBaseColor = selectedTheme;
    // ---------------------------------------------------

    // Handle CSS variables toggle (respect CLI flag)
    options.tailwindCssVariables = typeof opts.cssVariables === "boolean"
      ? opts.cssVariables
      : await confirm({
          message: `Would you like to use ${highlighter.info("CSS variables")} for theming?`,
          initialValue: defaultConfig?.tailwind.cssVariables,
        });

    // Assign results
    style = options.style;
    baseColor = options.tailwindBaseColor;
    cssVariables = options.tailwindCssVariables;
  }

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style,
    tailwind: {
      ...defaultConfig?.tailwind,
      baseColor,
      cssVariables,
    },
    rsc: defaultConfig?.rsc,
    tsx: defaultConfig?.tsx,
    aliases: defaultConfig?.aliases,
    iconLibrary: defaultConfig?.iconLibrary,
  });
}
