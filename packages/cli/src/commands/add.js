import path from "path";
import { preFlightAdd } from "../preflights/preflight-add.js";
import { addComponents } from "../utils/add-components.js";
import { createProject } from "../utils/create-project.js";
import * as ERRORS from "../utils/errors.js";
import { handleError } from "../utils/handle-error.js";
import { highlighter } from "../utils/highlighter.js";
import { logger } from "../utils/logger.js";
import {
  getRegistryIndex,
  getRegistryItem,
  isUrl,
} from "../utils/registry/index.js";
import { Command } from "commander";
import { confirm, multiselect, intro } from "@clack/prompts";
import { z } from "zod";
import { addHookCommand } from "./add-hook.js";
import { runInit } from "./init.js";

export const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional(),
  silent: z.boolean(),
  srcDir: z.boolean().optional(),
  cssVariables: z.boolean(),
});

export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .addCommand(addHookCommand)
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
  .option(
    "--no-src-dir",
    "do not use the src directory when creating a new project."
  )
  .option("--css-variables", "use css variables for theming.", true)
  .option("--no-css-variables", "do not use css variables for theming.")
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        cwd: path.resolve(opts.cwd),
        ...opts,
      });

      let itemType;

      if (components.length > 0 && isUrl(components[0])) {
        const item = await getRegistryItem(components[0], "");
        itemType = item?.type;
      }

      if (
        !options.yes &&
        (itemType === "registry:style" || itemType === "registry:theme")
      ) {
        logger.break();
        const confirmResult = await confirm({
          message: highlighter.warn(
            `You are about to install a new ${itemType.replace(
              "registry:",
              ""
            )} \nExisting CSS variables will be overwritten. Continue?`
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
          style: "index",
          cssVariables: options.cssVariables,
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
          style: "index",
          cssVariables: options.cssVariables,
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
