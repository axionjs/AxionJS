import path from "path";
import { runInit } from "./init.js";
import { preFlightAdd } from "../preflights/preflight-add.js";
import { addComponents } from "../utils/add-components.js";
import { createProject } from "../utils/create-project.js";
import * as ERRORS from "../utils/errors.js";
import { handleError } from "../utils/handle-error.js";
import { highlighter } from "../utils/highlighter.js";
import { logger } from "../utils/logger.js";
import { getRegistryIndex } from "../utils/registry/index.js";
import { Command } from "commander";
import { confirm, multiselect, intro } from "@clack/prompts";
import { z } from "zod";
import { addAuthCommand } from "./add-auth.js";

export const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
  silent: z.boolean(),
  srcDir: z.boolean().optional(),
});

export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .addCommand(addAuthCommand)
  .argument(
    "[components...]",
    "the components to add or a url to the component."
  )
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-s, --silent", "mute output.", false)
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        cwd: path.resolve(opts.cwd),
        ...opts,
      });
      // Confirm if user is installing themes.
      // For now, we assume a theme is prefixed with "theme-".
      const isTheme = options.components?.some((component) =>
        component.includes("theme-")
      );
      if (!options.yes && isTheme) {
        logger.break();
        const confirmResult = await confirm({
          message: highlighter.warn(
            "You are about to install a new theme. \nExisting CSS variables will be overwritten. Continue?"
          ),
          initialValue: false,
        });

        if (typeof confirmResult === "symbol" || !confirmResult) {
          logger.break();
          logger.log("Theme installation cancelled.");
          logger.break();
          process.exit(1);
        }
      }

      if (!options.components?.length) {
        options.components = await promptForRegistryComponents(options);
      }

      let { errors, config } = await preFlightAdd(options);

      // No components.json file. Prompt the user to run init.
      if (errors[ERRORS.MISSING_CONFIG]) {
        const proceed = await confirm({
          message: `You need to create a ${highlighter.info(
            "components.json"
          )} file to add components. Proceed?`,
          initialValue: true,
        });

        if (!proceed) {
          logger.break();
          process.exit(1);
        }

        config = await runInit({
          cwd: options.cwd,
          yes: true,
          force: true,
          defaults: false,
          skipPreflight: false,
          silent: true,
          isNewProject: false,
          srcDir: options.srcDir,
        });
      }

      if (errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
        const { projectPath } = await createProject({
          cwd: options.cwd,
          force: options.overwrite,
          srcDir: options.srcDir,
          components: options.components,
        });
        if (!projectPath) {
          logger.break();
          process.exit(1);
        }
        options.cwd = projectPath;

        config = await runInit({
          cwd: options.cwd,
          yes: true,
          force: true,
          defaults: false,
          skipPreflight: true,
          silent: true,
          isNewProject: true,
          srcDir: options.srcDir,
        });
      }

      if (!config) {
        throw new Error(
          `Failed to read config at ${highlighter.info(options.cwd)}.`
        );
      }
      await addComponents(options.components, config, {
        ...options,
        category: "ui",
      });
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });

async function promptForRegistryComponents(options) {
  const registryIndex = await getRegistryIndex();
  if (!registryIndex) {
    logger.break();
    handleError(new Error("Failed to fetch registry index."));
    return [];
  }

  if (options.all) {
    return registryIndex.map((entry) => entry.name);
  }

  if (options.components?.length) {
    return options.components;
  }
  intro("Add components to your project.");
  const components = await multiselect({
    message: `Which components would you like to add?\n\nHint: Space to select. A to toggle all. Enter to submit.`,
    options: registryIndex
      .filter((entry) => entry.type === "registry:ui")
      .map((entry) => ({
        label: entry.name,
        value: entry.name,
        selected: options.all ? true : options.components?.includes(entry.name),
      })),
    maxItems: 5,
  });

  if (!components?.length) {
    logger.warn("No components selected. Exiting.");
    logger.info("");
    process.exit(1);
  }

  const result = z.array(z.string()).safeParse(components);
  if (!result.success) {
    logger.error("");
    handleError(new Error("Something went wrong. Please try again."));
    return [];
  }
  return result.data;
}
