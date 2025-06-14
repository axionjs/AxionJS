import { handleError } from "./handle-error.js";
import { logger } from "./logger.js";
import { registryResolveItemsTree } from "./registry/index.js";
import { spinner } from "./spinner.js";
import { updateCssVars } from "./updaters/update-css-vars.js";
import {
  setupPrisma,
  updateDependencies,
} from "./updaters/update-dependencies.js";
import { updateFiles } from "./updaters/update-files.js";
import { updateTailwindConfig } from "./updaters/update-tailwind-config.js";
import {
  getProjectInfo,
  getProjectTailwindVersionFromConfig,
} from "./get-project-info.js";

export async function addComponents(components, config, options) {
  options = {
    overwrite: false,
    silent: false,
    isNewProject: false,
    ...options,
  };

  // List of dynamic components
  const dynamicComponentNames = [
    "contact-form",
    "subscribe-newsletter",
    "simple-crud-table",
    "simple-auth",
    "media-uploader",
    "inventory-manager",
    "multi-step-form",
    "quiz",
    "social-auth",
    "two-factor-form",
  ];
  const projectInfo = await getProjectInfo(options.cwd);

  // if user is asking a dynamic component, we need to show a message that dynamic components are only supported in app router
  if (
    components.some((component) => dynamicComponentNames.includes(component))
  ) {
    // Check if the framework is Next.js App Router
    if (projectInfo.framework.name !== "next-app") {
      logger.error(
        `❌ Dynamic components such as ${dynamicComponentNames} are only supported in Next.js App Router projects.`
      );
      process.exit(1);
    }
  }

  const registrySpinner = spinner(`Checking registry.`, {
    silent: options.silent,
  })?.start();
  const tree = await registryResolveItemsTree(
    components,
    config,
    options.category
  );
  if (!tree) {
    registrySpinner?.fail();
    return handleError(new Error("Failed to fetch components from registry."));
  }
  registrySpinner?.succeed();

  const tailwindVersion = await getProjectTailwindVersionFromConfig(config);

  await updateTailwindConfig(tree.tailwind?.config, config, {
    silent: options.silent,
    tailwindVersion,
  });
  await updateCssVars(tree.cssVars, config, {
    cleanupDefaultNextStyles: options.isNewProject,
    silent: options.silent,
    tailwindVersion,
    tailwindConfig: tree.tailwind?.config,
  });

  await updateDependencies(tree.dependencies, config, {
    silent: options.silent,
  });

  if (options.category === "auth") {
    // Ensure Prisma is initialized and auth models are added
    await setupPrisma(config.resolvedPaths.cwd, "auth");
  }

  // Dynamically ensure Prisma models for each component
  for (const component of components) {
    if (dynamicComponentNames.includes(component)) {
      // Ensure Prisma models for dynamic components
      await setupPrisma(config.resolvedPaths.cwd, component);
    }
  }
  //files=>path,type(mainly)
  await updateFiles(tree.files, config, {
    overwrite: options.overwrite,
    silent: options.silent,
  });

  if (tree.docs) {
    logger.info(tree.docs);
  }
}
