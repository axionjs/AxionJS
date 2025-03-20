import { Command } from "commander";
import path from "path";
import { preFlightAdd } from "../preflights/preflight-add.js";
import { highlighter } from "../utils/highlighter.js";
import { logger } from "../utils/logger.js";
import * as ERRORS from "../utils/errors.js";
import { handleError } from "../utils/handle-error.js";
import { addComponents } from "../utils/add-components.js";
import { z } from "zod";
import { confirm } from "@clack/prompts";
import { runInit } from "./init.js";
import { createProject } from "../utils/create-project.js";

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
export const addAuthOptionsSchema = addOptionsSchema.omit({ all: true });

const DEFAULT_AUTH_COMPONENTS = [
  "login",
  "register",
  "change-password",
  "verify",
  "new-password",
  "reset",
  "admin",
  "dashboard",
  "profile",
  "mail",
  "error",
  "middleware",
];

export const addAuthCommand = new Command()
  .name("auth")
  .description("add authentication components to your project")
  .argument("[components...]", "the authentication components to add")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-s, --silent", "mute output.", false)
  .action(async (components, opts) => {
    try {
      const options = addAuthOptionsSchema.parse({
        components:
          components.length > 0 ? components : DEFAULT_AUTH_COMPONENTS, // Use default components if none are provided
        cwd: path.resolve(opts.cwd),
        ...opts,
      });

      let { errors, config } = await preFlightAdd(options);

      if (errors[ERRORS.MISSING_CONFIG]) {
        const proceed = await confirm({
          message: `You need to create a ${highlighter.info(
            "components.json"
          )} file to add components. Proceed?`,
          initialValue: true,
        });
        ``;
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
        category: "auth",
      });
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });
