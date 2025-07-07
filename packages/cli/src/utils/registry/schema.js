import { z } from "zod";

// TODO: Extract this to a shared package.
export const registryItemTypeSchema = z.enum([
  "registry:style",
  "registry:lib",
  "registry:example",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:theme",
  "registry:page",
  "registry:auth",
  "registry:auth_comp",
  "registry:middleware",
  "registry:actions",
  "registry:schemas",
  "registry:utils",
  "registry:api",
  "registry:email",
  "registry:file",
  "registry:dynamic-component",
]);

export const registryItemFileSchema = z.discriminatedUnion("type", [
  // Target is required for registry:file and registry:page
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: z.enum(["registry:file", "registry:page"]),
    target: z.string(),
  }),
  z.object({
    path: z.string(),
    content: z.string().optional(),
    type: registryItemTypeSchema.exclude(["registry:file", "registry:page"]),
    target: z.string().optional(),
  }),
]);

export const registryItemTailwindSchema = z.object({
  config: z
    .object({
      content: z.array(z.string()).optional(),
      theme: z.record(z.string(), z.any()).optional(),
      plugins: z.array(z.string()).optional(),
    })
    .optional(),
});

export const registryItemCssVarsSchema = z.object({
  theme: z.record(z.string(), z.string()).optional(),
  light: z.record(z.string(), z.string()).optional(),
  dark: z.record(z.string(), z.string()).optional(),
});

export const registryItemCssSchema = z.record(
  z.string(),
  z.lazy(() =>
    z.union([
      z.string(),
      z.record(
        z.string(),
        z.union([z.string(), z.record(z.string(), z.string())])
      ),
    ])
  )
);

export const registryItemSchema = z.object({
  $schema: z.string().optional(),
  extends: z.string().optional(),
  name: z.string(),
  type: registryItemTypeSchema,
  title: z.string().optional(),
  author: z.string().min(2).optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  cssVarsV4: registryItemCssVarsSchema.optional(),
  css: registryItemCssSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const registryIndexSchema = z.array(registryItemSchema);

export const stylesSchema = z.array(
  z.object({
    name: z.string(),
    label: z.string(),
  })
);

export const iconsSchema = z.record(
  z.string(),
  z.record(z.string(), z.string())
);

export const registryBaseColorSchema = z.object({
  cssVars: registryItemCssVarsSchema,
  cssVarsV4: registryItemCssVarsSchema.optional(),
  inlineColorsTemplate: z.string(),
  cssVarsTemplate: z.string(),
});

export const registryResolvedItemsTreeSchema = registryItemSchema.pick({
  dependencies: true,
  devDependencies: true,
  files: true,
  tailwind: true,
  cssVars: true,
  cssVarsV4: true,
  css: true,
  docs: true,
});
