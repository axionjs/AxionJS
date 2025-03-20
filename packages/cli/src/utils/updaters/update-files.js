import { existsSync, promises as fs } from "fs";
import path, { basename } from "path";
import { getProjectInfo } from "../get-project-info.js";
import { highlighter } from "../highlighter.js";
import { logger } from "../logger.js";
import {
  getRegistryBaseColor,
  getRegistryItemFileTargetPath,
} from "../registry/index.js";
import { spinner } from "../spinner.js";
import { transform } from "../transformers/index.js";
import { transformCssVars } from "../transformers/transform-css-vars.js";
import { transformIcons } from "../transformers/transform-icons.js";
import { transformImport } from "../transformers/transform-import.js";
import { transformRsc } from "../transformers/transform-rsc.js";
import { transformTwPrefixes } from "../transformers/transform-tw-prefix.js";
import { confirm } from "@clack/prompts";

export function resolveTargetDir(projectInfo, config, target) {
  if (target.startsWith("~/")) {
    return path.join(config.resolvedPaths.cwd, target.replace("~/", ""));
  }
  return projectInfo?.isSrcDir
    ? path.join(config.resolvedPaths.cwd, "src", target)
    : path.join(config.resolvedPaths.cwd, target);
}

export async function updateFiles(files, config, options) {
  if (!files?.length) {
    return;
  }

  options = {
    overwrite: false,
    force: false,
    silent: false,
    ...options,
  };
  const filesCreatedSpinner = spinner(`Updating files.`, {
    silent: options.silent,
  })?.start();

  const [projectInfo, baseColor] = await Promise.all([
    getProjectInfo(config.resolvedPaths.cwd),
    getRegistryBaseColor(config.tailwind.baseColor),
  ]);

  const filesCreated = [];
  const filesUpdated = [];
  const filesSkipped = [];

  for (const file of files) {
    if (!file.content) {
      continue;
    }

    let targetDir = getRegistryItemFileTargetPath(file, config);
    const fileName = basename(file.path);
    let filePath = path.join(targetDir, fileName);

    if (file.target) {
      filePath = resolveTargetDir(projectInfo, config, file.target);
      targetDir = path.dirname(filePath);
    }

    if (!config.tsx) {
      filePath = filePath.replace(/\.tsx?$/, (match) =>
        match === ".tsx" ? ".jsx" : ".js"
      );
    }

    const existingFile = existsSync(filePath);
    if (existingFile && !options.overwrite) {
      filesCreatedSpinner.stop();

      const overwrite = await confirm({
        message: `The file ${highlighter.info(
          fileName
        )} already exists. Would you like to overwrite?`,
        initialValue: false,
      });

      if (!overwrite) {
        filesSkipped.push(path.relative(config.resolvedPaths.cwd, filePath));
        continue;
      }
      filesCreatedSpinner?.start();
    }

    // Create the target directory if it doesn't exist.
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    // Run our transformers.
    const content = await transform(
      {
        filename: filePath,
        raw: file.content,
        config,
        baseColor,
        transformJsx: !config.tsx,
      },
      [
        transformImport,
        transformRsc,
        transformCssVars,
        transformTwPrefixes,
        transformIcons,
      ]
    );

    await fs.writeFile(filePath, content, "utf-8");
    existingFile
      ? filesUpdated.push(path.relative(config.resolvedPaths.cwd, filePath))
      : filesCreated.push(path.relative(config.resolvedPaths.cwd, filePath));
  }

  const hasUpdatedFiles = filesCreated.length || filesUpdated.length;
  if (!hasUpdatedFiles && !filesSkipped.length) {
    filesCreatedSpinner?.info("No files updated.");
  }

  if (filesCreated.length) {
    filesCreatedSpinner?.succeed(
      `Created ${filesCreated.length} ${
        filesCreated.length === 1 ? "file" : "files"
      }:`
    );
    if (!options.silent) {
      for (const file of filesCreated) {
        logger.log(`  - ${file}`);
      }
    }
  } else {
    filesCreatedSpinner?.stop();
  }

  if (filesUpdated.length) {
    spinner(
      `Updated ${filesUpdated.length} ${
        filesUpdated.length === 1 ? "file" : "files"
      }:`,
      {
        silent: options.silent,
      }
    )?.info();
    if (!options.silent) {
      for (const file of filesUpdated) {
        logger.log(`  - ${file}`);
      }
    }
  }

  if (filesSkipped.length) {
    spinner(
      `Skipped ${filesSkipped.length} ${
        filesUpdated.length === 1 ? "file" : "files"
      }:`,
      {
        silent: options.silent,
      }
    )?.info();
    if (!options.silent) {
      for (const file of filesSkipped) {
        logger.log(`  - ${file}`);
      }
    }
  }

  if (!options.silent) {
    logger.break();
  }
}
