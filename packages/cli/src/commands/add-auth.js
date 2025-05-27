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
import { getProjectInfo } from "../utils/get-project-info.js";

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
      const cwd = path.resolve(opts.cwd);
      const projectInfo = await getProjectInfo(cwd);

      // Check if the framework is Next.js App Router
      if (projectInfo.framework.name !== "next-app") {
        logger.error(
          "❌ The `add auth` command is only available for Next.js App Router projects."
        );
        process.exit(1);
      }

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
          style: "index",
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
