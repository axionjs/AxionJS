import { handleError } from "./handle-error.js";
import { logger } from "./logger.js";
import { registryResolveItemsTree } from "./registry/index.js";
import { spinner } from "./spinner.js";
import { updateCssVars } from "./updaters/update-css-vars.js";
import { updateDependencies } from "./updaters/update-dependencies.js";
import { updateFiles } from "./updaters/update-files.js";
import { updateTailwindConfig } from "./updaters/update-tailwind-config.js";

export async function addComponents(components, config, options) {
  options = {
    overwrite: false,
    silent: false,
    isNewProject: false,
    ...options,
  };

  const registrySpinner = spinner(`Checking registry.`, {
    silent: options.silent,
  })?.start();
  const tree = await registryResolveItemsTree(components, config);
  if (!tree) {
    registrySpinner?.fail();
    return handleError(new Error("Failed to fetch components from registry."));
  }
  registrySpinner?.succeed();

  await updateTailwindConfig(tree.tailwind?.config, config, {
    silent: options.silent,
  });
  await updateCssVars(tree.cssVars, config, {
    cleanupDefaultNextStyles: options.isNewProject,
    silent: options.silent,
  });

  await updateDependencies(tree.dependencies, config, {
    silent: options.silent,
  });
  //files=>path,type(mainly)
  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  });

  if (tree.docs) {
    logger.info(tree.docs);
  }
}
