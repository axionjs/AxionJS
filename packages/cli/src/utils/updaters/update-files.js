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

    let filePath = resolveFilePath(file, config, {
      isSrcDir: projectInfo?.isSrcDir,
      framework: projectInfo?.framework.name,
      commonRoot: findCommonRoot(
        files.map((f) => f.path),
        file.path
      ),
    });

    if (!filePath) {
      continue;
    }

    const fileName = basename(file.path);
    const targetDir = path.dirname(filePath);

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
export function resolvePageTarget(target, framework) {
  if (!framework) {
    return "";
  }

  if (framework === "next-app") {
    return target;
  }

  if (framework === "next-pages") {
    let result = target.replace(/^app\//, "pages/");
    result = result.replace(/\/page(\.[jt]sx?)$/, "$1");

    return result;
  }

  return "";
}

export function resolveNestedFilePath(filePath, targetDir) {
  // Normalize paths by removing leading/trailing slashes
  const normalizedFilePath = filePath.replace(/^\/|\/$/g, "");
  const normalizedTargetDir = targetDir.replace(/^\/|\/$/g, "");

  // Split paths into segments
  const fileSegments = normalizedFilePath.split("/");
  const targetSegments = normalizedTargetDir.split("/");

  // Find the last matching segment from targetDir in filePath
  const lastTargetSegment = targetSegments[targetSegments.length - 1];
  const commonDirIndex = fileSegments.findIndex(
    (segment) => segment === lastTargetSegment
  );

  if (commonDirIndex === -1 || lastTargetSegment === "auth") {
    // Return just the filename if no common directory is found
    return fileSegments[fileSegments.length - 1];
  }
  // Return everything after the common directory
  return fileSegments.slice(commonDirIndex + 1).join("/");
}

export function findCommonRoot(paths, needle) {
  // Remove leading slashes for consistent handling
  const normalizedPaths = paths.map((p) => p.replace(/^\//, ""));
  const normalizedNeedle = needle.replace(/^\//, "");

  // Get the directory path of the needle by removing the file name
  const needleDir = normalizedNeedle.split("/").slice(0, -1).join("/");

  // If needle is at root level, return empty string
  if (!needleDir) {
    return "";
  }

  // Split the needle directory into segments
  const needleSegments = needleDir.split("/");

  // Start from the full path and work backwards
  for (let i = needleSegments.length; i > 0; i--) {
    const testPath = needleSegments.slice(0, i).join("/");
    // Check if this is a common root by verifying if any other paths start with it
    const hasRelatedPaths = normalizedPaths.some(
      (path) => path !== normalizedNeedle && path.startsWith(testPath + "/")
    );
    if (hasRelatedPaths) {
      return "/" + testPath; // Add leading slash back for the result
    }
  }

  // If no common root found with other files, return the parent directory of the needle
  return "/" + needleDir; // Add leading slash back for the result
}
export function resolveFilePath(file, config, options) {
  if (file.target) {
    if (file.target.startsWith("~/")) {
      return path.join(config.resolvedPaths.cwd, file.target.replace("~/", ""));
    }

    let target = file.target;

    // Special handling for public directory - should always be in root
    if (target.startsWith("public/")) {
      return path.join(config.resolvedPaths.cwd, target);
    }

    if (file.type === "registry:page") {
      target = resolvePageTarget(target, options.framework);
      if (!target) {
        return "";
      }
    }

    return options.isSrcDir
      ? path.join(config.resolvedPaths.cwd, "src", target.replace("src/", ""))
      : path.join(config.resolvedPaths.cwd, target.replace("src/", ""));
  }

  const targetDir = getRegistryItemFileTargetPath(file, config);

  const relativePath = resolveNestedFilePath(file.path, targetDir);
  return path.join(targetDir, relativePath);
}
