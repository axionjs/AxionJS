// import { handleError } from "../utils/handle-error"
// import { logger } from "../utils/logger"
// import { registryResolveItemsTree } from "../utils/registry"
// import { spinner } from "../utils/spinner"
// import { updateCssVars } from "../utils/updaters/update-css-vars"
// import { updateDependencies } from "../utils/updaters/update-dependencies"
// import { updateFiles } from "../utils/updaters/update-files"
// import { updateTailwindConfig } from "../utils/updaters/update-tailwind-config"

// export async function addComponents(
//   components,
//   config,
//   options: {
//     overwrite
//     silent
//     isNewProject
//   }
// ) {
//   options = {
//     overwrite: false,
//     silent: false,
//     isNewProject: false,
//     ...options,
//   }

//   const registrySpinner = spinner(`Checking registry.`, {
//     silent: options.silent,
//   })?.start()
//   const tree = await registryResolveItemsTree(components, config)
//   if (!tree) {
//     registrySpinner?.fail()
//     return handleError(new Error("Failed to fetch components from registry."))
//   }
//   registrySpinner?.succeed()

//   await updateTailwindConfig(tree.tailwind?.config, config, {
//     silent: options.silent,
//   })
//   await updateCssVars(tree.cssVars, config, {
//     cleanupDefaultNextStyles: options.isNewProject,
//     silent: options.silent,
//   })

//   await updateDependencies(tree.dependencies, config, {
//     silent: options.silent,
//   })
//   await updateFiles(tree.files, config, {
//     overwrite: options.overwrite,
//     silent: options.silent,
//   })

//   if (tree.docs) {
//     logger.info(tree.docs)
//   }
// }
