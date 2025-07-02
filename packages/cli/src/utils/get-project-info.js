import path from "path";
import { FRAMEWORKS } from "./frameworks.js";
import { getConfig, resolveConfigPaths } from "./get-config.js";
import { getPackageInfo } from "./get-package-info.js";
import fg from "fast-glob";
import fs from "fs-extra";
import { z } from "zod";
import { loadConfig } from "tsconfig-paths";

const PROJECT_SHARED_IGNORE = [
  "**/node_modules/**",
  ".next",
  "public",
  "dist",
  "build",
];

const TS_CONFIG_SCHEMA = z.object({
  compilerOptions: z.object({
    paths: z.record(z.string().or(z.array(z.string()))),
  }),
});

export async function getProjectInfo(cwd) {
  const [
    configFiles,
    isSrcDir,
    isTsx,
    tailwindConfigFile,
    tailwindCssFile,
    tailwindVersion,
    aliasPrefix,
  ] = await Promise.all([
    fg.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json", {
      cwd,
      deep: 3,
      ignore: PROJECT_SHARED_IGNORE,
    }),
    fs.pathExists(path.resolve(cwd, "src")),
    isTypeScriptProject(cwd),
    getTailwindConfigFile(cwd),
    getTailwindCssFile(cwd),
    getTailwindVersion(cwd),
    getTsConfigAliasPrefix(cwd),
    getPackageInfo(cwd, false),
  ]);

  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isSrcDir ? "src/" : ""}app`)
  );

  const type = {
    framework: FRAMEWORKS["manual"],
    isSrcDir,
    isRSC: false,
    isTsx,
    tailwindConfigFile,
    tailwindCssFile,
    tailwindVersion,
    aliasPrefix,
  };

  // Next.js.
  if (configFiles.find((file) => file.startsWith("next.config."))?.length) {
    type.framework = isUsingAppDir
      ? FRAMEWORKS["next-app"]
      : FRAMEWORKS["next-pages"];
    type.isRSC = isUsingAppDir;
    return type;
  }

  return type;
}

export async function getTailwindVersion(cwd) {
  const packageInfo = getPackageInfo(cwd);

  if (
    !packageInfo?.dependencies?.tailwindcss &&
    !packageInfo?.devDependencies?.tailwindcss
  ) {
    return null;
  }

  if (
    /^(?:\^|~)?3(?:\.\d+)*(?:-.*)?$/.test(
      packageInfo?.dependencies?.tailwindcss ||
        packageInfo?.devDependencies?.tailwindcss ||
        ""
    )
  ) {
    return "v3";
  }

  return "v4";
}

export async function getTailwindCssFile(cwd) {
  const [files, tailwindVersion] = await Promise.all([
    fg.glob(["**/*.css", "**/*.scss"], {
      cwd,
      deep: 5,
      ignore: PROJECT_SHARED_IGNORE,
    }),
    getTailwindVersion(cwd),
  ]);

  if (!files.length) {
    return null;
  }

  const needle =
    tailwindVersion === "v4" ? `@import "tailwindcss"` : "@tailwind base";

  for (const file of files) {
    const contents = await fs.readFile(path.resolve(cwd, file), "utf8");
    if (
      contents.includes(`@import "tailwindcss"`) ||
      contents.includes(`@import 'tailwindcss'`) ||
      contents.includes(`@tailwind base`)
    ) {
      return file;
    }
  }

  return null;
}

export async function getTailwindConfigFile(cwd) {
  const files = await fg.glob("tailwind.config.*", {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  });

  if (!files.length) {
    return null;
  }

  return files[0];
}

export async function getTsConfigAliasPrefix(cwd) {
  const tsConfig = await loadConfig(cwd);

  if (
    tsConfig?.resultType === "failed" ||
    !Object.entries(tsConfig?.paths).length
  ) {
    return null;
  }

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (
      paths.includes("./*") ||
      paths.includes("./src/*") ||
      paths.includes("./app/*") ||
      paths.includes("./resources/js/*") // Laravel.
    ) {
      return alias.replace(/\/\*$/, "") ?? null;
    }
  }

  // Use the first alias as the prefix.
  return Object.keys(tsConfig?.paths)?.[0].replace(/\/\*$/, "") ?? null;
}

export async function isTypeScriptProject(cwd) {
  const files = await fg.glob("tsconfig.*", {
    cwd,
    deep: 1,
    ignore: PROJECT_SHARED_IGNORE,
  });

  return files.length > 0;
}

export async function getTsConfig(cwd) {
  for (const fallback of [
    "tsconfig.json",
    "tsconfig.web.json",
    "tsconfig.app.json",
  ]) {
    const filePath = path.resolve(cwd, fallback);
    if (!(await fs.pathExists(filePath))) {
      continue;
    }

    // We can't use fs.readJSON because it doesn't support comments.
    const contents = await fs.readFile(filePath, "utf8");
    const cleanedContents = contents.replace(/\/\*\s*\*\//g, "");
    const result = TS_CONFIG_SCHEMA.safeParse(JSON.parse(cleanedContents));

    if (result.error) {
      continue;
    }

    return result.data;
  }

  return null;
}

export async function getProjectConfig(cwd, defaultProjectInfo = null) {
  // Check for existing component config.
  const [existingConfig, projectInfo] = await Promise.all([
    getConfig(cwd),
    !defaultProjectInfo
      ? getProjectInfo(cwd)
      : Promise.resolve(defaultProjectInfo),
  ]);

  if (existingConfig) {
    return existingConfig;
  }

  if (
    !projectInfo ||
    !projectInfo.tailwindCssFile ||
    (projectInfo.tailwindVersion === "v3" && !projectInfo.tailwindConfigFile)
  ) {
    return null;
  }

  const config = {
    $schema: "https://www.axionjs.com/schema.json",
    rsc: projectInfo.isRSC,
    tsx: projectInfo.isTsx,
    style: "new-york",
    tailwind: {
      config: projectInfo.tailwindConfigFile ?? "",
      baseColor: "default",
      css: projectInfo.tailwindCssFile,
      cssVariables: true,
      prefix: "",
    },
    iconLibrary: "lucide",
    aliases: {
      components: `${projectInfo.aliasPrefix}/components`,
      ui: `${projectInfo.aliasPrefix}/components/ui`,
      hooks: `${projectInfo.aliasPrefix}/hooks`,
      lib: `${projectInfo.aliasPrefix}/lib`,
      utils: `${projectInfo.aliasPrefix}/lib/utils`,
      auth: `${projectInfo.aliasPrefix}/auth`,
      actions: `${projectInfo.aliasPrefix}/actions`,
      middleware: `${projectInfo.aliasPrefix}/middleware`,
      schemas: `${projectInfo.aliasPrefix}/schemas`,
      auth_comp: `${projectInfo.aliasPrefix}/components/auth`,
      api: `${projectInfo.aliasPrefix}/app/api`,
      email: `${projectInfo.aliasPrefix}/emails`,
    },
  };

  return await resolveConfigPaths(cwd, config);
}

export async function getProjectTailwindVersionFromConfig(config) {
  if (!config.resolvedPaths?.cwd) {
    return "v3";
  }

  const projectInfo = await getProjectInfo(config.resolvedPaths.cwd);

  if (!projectInfo?.tailwindVersion) {
    return null;
  }

  return projectInfo.tailwindVersion;
}
