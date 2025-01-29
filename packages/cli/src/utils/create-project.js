import path from "path";
import { getPackageManager } from "./get-package-manager.js";
import { highlighter } from "./highlighter.js";
import { logger } from "./logger.js";
// import { spinner } from "../utils/spinner.js";
import { execa } from "execa";
import { handleError } from "./handle-error.js";
import { fetchRegistry } from "./registry/index.js";
import fs from "fs-extra";
import { z } from "zod";
// import prompts from "prompts";
import { text, confirm, spinner, intro, outro } from "@clack/prompts";
export async function createProject(options) {
  options = {
    srcDir: false,
    ...options,
  };
  // handling the version of the next.js project
  let projectName = "my-app";
  let nextVersion = "15.1.0";

  if (!options.force) {
    const proceed = await confirm({
      message: `The path ${highlighter.info(
        options.cwd
      )} does not contain a package.json file. Would you like to start a new ${highlighter.info(
        "Next.js"
      )} project?`,
      initialValue: true,
    });

    if (!proceed) {
      return {
        projectPath: null,
        projectName: null,
      };
    }
  }

  const packageManager = await getPackageManager(options.cwd, {
    withFallback: true,
  });
  intro("Welcome to the Next.js project generator");
  projectName = await text({
    message: `What is your project named?`,
    initialValue: "my-app",
    placeholder: "my-app",
    validate: (value) =>
      value.length > 128
        ? `Name should be less than 128 characters.`
        : undefined,
  });
  const name = projectName.toString().trim();
  const projectPath = `${options.cwd}/${name}`;

  // Check if path is writable.
  try {
    await fs.access(options.cwd, fs.constants.W_OK);
  } catch (error) {
    logger.break();
    logger.error(`The path ${highlighter.info(options.cwd)} is not writable.`);
    logger.error(
      `It is likely you do not have write permissions for this folder or the path ${highlighter.info(
        options.cwd
      )} does not exist.`
    );
    logger.break();
    process.exit(1);
  }

  if (fs.existsSync(path.resolve(options.cwd, name, "package.json"))) {
    logger.break();
    logger.error(
      `A project with the name ${highlighter.info(name)} already exists.`
    );
    logger.error(`Please choose a different name and try again.`);
    logger.break();
    process.exit(1);
  }

  await createNextProject(projectPath, {
    version: nextVersion,
    cwd: options.cwd,
    packageManager,
    srcDir: !!options.srcDir,
  });

  async function createNextProject(projectPath, options) {
    const createSpinner = spinner();
    createSpinner.start(
      `Creating a new Next.js project. This may take a few minutes.`
    );

    // Note: pnpm fails here. Fallback to npx with --use-PACKAGE-MANAGER.
    const args = [
      "--tailwind",
      "--eslint",
      "--typescript",
      "--app",
      options.srcDir ? "--src-dir" : "--no-src-dir",
      "--no-import-alias",
      `--use-${packageManager}`,
    ];

    if (nextVersion.startsWith("15")) {
      args.push("--turbopack");
    }

    try {
      await execa(
        "npx",
        [
          `create-next-app@${options.version}`,
          projectPath,
          "--silent",
          ...args,
        ],
        {
          cwd: options.cwd,
        }
      );
    } catch (error) {
      logger.break();
      logger.error(
        `Something went wrong creating a new Next.js project. Please try again.`
      );
      process.exit(1);
    }

    createSpinner?.stop("Created a new Next.js project.");
  }
  outro("Next.js project created successfully");
  return {
    projectPath,
    projectName,
  };
}
