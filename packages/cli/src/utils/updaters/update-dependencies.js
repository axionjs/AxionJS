import { getPackageInfo } from "../get-package-info.js";
import { getPackageManager } from "../get-package-manager.js";
import { logger } from "../logger.js";
import { spinner } from "../spinner.js";
import { execa } from "execa";
import { select } from "@clack/prompts";

export async function updateDependencies(dependencies, config, options) {
  dependencies = Array.from(new Set(dependencies));
  if (!dependencies?.length) {
    return;
  }

  options = {
    silent: false,
    ...options,
  };

  const dependenciesSpinner = spinner(`Installing dependencies.`, {
    silent: options.silent,
  })?.start();
  const packageManager = await getPackageManager(config.resolvedPaths.cwd);

  // Offer to use --force or --legacy-peer-deps if using React 19 with npm.
  let flag = "";
  if (isUsingReact19(config) && packageManager === "npm") {
    dependenciesSpinner.stopAndPersist();
    logger.warn(
      "\nIt looks like you are using React 19. \nSome packages may fail to install due to peer dependency issues in npm.\n"
    );
    const confirmation = await select({
      message: "How would you like to proceed?",
      options: [
        { label: "Use --force", value: "force" },
        { label: "Use --legacy-peer-deps", value: "legacy-peer-deps" },
      ],
    });

    if (confirmation) {
      flag = confirmation.toString();
    }
  }

  dependenciesSpinner?.start();

  await execa(
    packageManager,
    [
      packageManager === "npm" ? "install" : "add",
      ...(packageManager === "npm" && flag ? [`--${flag}`] : []),
      ...dependencies,
    ],
    {
      cwd: config.resolvedPaths.cwd,
    }
  );
  dependenciesSpinner?.succeed();
}

function isUsingReact19(config) {
  const packageInfo = getPackageInfo(config.resolvedPaths.cwd);

  if (!packageInfo?.dependencies?.react) {
    return false;
  }

  return /^(?:\^|~)?19(?:\.\d+)*(?:-.*)?$/.test(packageInfo.dependencies.react);
}
