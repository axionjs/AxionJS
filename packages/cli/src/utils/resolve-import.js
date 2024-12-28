import { createMatchPath } from "tsconfig-paths"

export async function resolveImport(
  importPath,
  config
) {
  return createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    [".ts", ".tsx", ".js", ".jsx"]
  )
}
