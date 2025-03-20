export const transformImport = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = updateImportAliases(
      importDeclaration.getModuleSpecifierValue(),
      config
    );

    importDeclaration.setModuleSpecifier(moduleSpecifier);

    // Replace `import { cn } from "@/lib/utils"`
    if (moduleSpecifier == "@/lib/utils") {
      const namedImports = importDeclaration.getNamedImports();
      const cnImport = namedImports.find((i) => i.getName() === "cn");
      if (cnImport) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/lib\/utils/, config.aliases.utils)
        );
      }
    }
  }

  return sourceFile;
};

function updateImportAliases(moduleSpecifier, config) {
  // Not a local import.
  if (!moduleSpecifier.startsWith("@/")) {
    return moduleSpecifier;
  }

  // Not a registry import.
  if (!moduleSpecifier.startsWith("@/registry/")) {
    // We fix the alias and return.
    const alias = config.aliases.components.split("/")[0];
    return moduleSpecifier.replace(/^@\//, `${alias}/`);
  }

  if (moduleSpecifier.match(/^@\/registry\/(.+)\/ui/)) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/ui/,
      config.aliases.ui ?? `${config.aliases.components}/ui`
    );
  }

  if (
    config.aliases.auth_comp &&
    moduleSpecifier.startsWith("@/registry/auth/components/")
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/auth\/components/,
      config.aliases.auth_comp
    );
  }
  if (
    config.aliases.auth_comp &&
    moduleSpecifier.startsWith("@/registry/auth/emails/")
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/auth\/emails/,
      config.aliases.email
    );
  }

  if (
    config.aliases.components &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/components/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/components/,
      config.aliases.components
    );
  }

  if (config.aliases.lib && moduleSpecifier.match(/^@\/registry\/(.+)\/lib/)) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/lib/,
      config.aliases.lib
    );
  }
  if (
    config.aliases.lib &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/routes/)
  ) {
    return moduleSpecifier.replace(/^@\/registry\/auth/, config.aliases.lib);
  }

  if (
    config.aliases.hooks &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/hooks/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/hooks/,
      config.aliases.hooks
    );
  }

  if (
    config.aliases.actions &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/actions/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/actions/,
      config.aliases.actions
    );
  }

  if (
    config.aliases.middleware &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/middleware/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/middleware/,
      config.aliases.middleware
    );
  }
  if (
    config.aliases.schemas &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/schemas/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/schemas/,
      config.aliases.schemas
    );
  }

  if (
    config.aliases.auth &&
    moduleSpecifier.match(/^@\/registry\/(.+)\/auth/)
  ) {
    return moduleSpecifier.replace(
      /^@\/registry\/(.+)\/auth/,
      config.aliases.auth
    );
  }

  return moduleSpecifier.replace(
    /^@\/registry\/[^/]+/,
    config.aliases.components
  );
}
