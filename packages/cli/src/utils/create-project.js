import path from "path";
import { getPackageManager } from "../utils/get-package-manager.js";
import { highlighter } from "../utils/highlighter.js";
import { logger } from "../utils/logger.js";
// import { spinner } from "../utils/spinner.js";
import { execa } from "execa";
import fs from "fs-extra";
// import prompts from "prompts";
import { text, confirm, spinner, intro, outro } from "@clack/prompts";
export async function createProject(options) {
  options = {
    srcDir: false,
    ...options,
  };

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
  const projectName = await text({
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

  try {
    await execa(
      "npx",
      ["create-next-app@14.2.16", projectPath, "--silent", ...args],
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
  outro("Next.js project created successfully");
  return {
    projectPath,
    projectName: name,
  };
}
