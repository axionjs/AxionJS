import path from "path";
import fs from "fs-extra";

export function getPackageInfo(cwd = "", shouldThrow = true) {
  const packageJsonPath = path.join(cwd, "package.json");

  return fs.readJSONSync(packageJsonPath, {
    throws: shouldThrow,
  });
}
