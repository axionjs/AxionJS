import { promises as fs } from "fs";
import path from "path";
import { highlighter } from "../highlighter.js";
import { spinner } from "../spinner.js";
import postcss from "postcss";
import AtRule from "postcss/lib/at-rule";
import { getProjectTailwindVersionFromConfig } from "../get-project-info.js";
export async function updateCssVars(tree, config, options) {
  let cssVars = tree.cssVars || {};
  let cssVarsV4 = tree.cssVarsV4 || {};
  if (!config.resolvedPaths.tailwindCss) {
    return;
  }

  // Fix: Get the actual project version
  const projectTailwindVersion =
    await getProjectTailwindVersionFromConfig(config);

  options = {
    cleanupDefaultNextStyles: false,
    silent: false,
    tailwindVersion: projectTailwindVersion === "v4" ? "v4" : "v3",
    overwriteCssVars: true, // Fix: Always overwrite for theme changes
    initIndex: true,
    ...options,
  };

  const cssFilepath = config.resolvedPaths.tailwindCss;
  const cssFilepathRelative = path.relative(
    config.resolvedPaths.cwd,
    cssFilepath
  );
  const cssVarsSpinner = spinner(
    `Updating CSS variables in ${highlighter.info(cssFilepathRelative)}`,
    { silent: options.silent }
  ).start();

  const raw = await fs.readFile(cssFilepath, "utf8");
  // Fix: Use the correct CSS vars based on version
  const resolvedCssVars =
    options.tailwindVersion === "v4" && cssVarsV4 ? cssVarsV4 : cssVars || {};
  let output = await transformCssVars(raw, resolvedCssVars, config, {
    cleanupDefaultNextStyles: options.cleanupDefaultNextStyles,
    tailwindVersion: options.tailwindVersion,
    tailwindConfig: options.tailwindConfig,
    overwriteCssVars: options.overwriteCssVars,
    initIndex: options.initIndex,
  });

  await fs.writeFile(cssFilepath, output, "utf8");
  cssVarsSpinner.succeed();
}

export async function transformCssVars(input, cssVars, config, options) {
  options = {
    cleanupDefaultNextStyles: false,
    tailwindVersion: "v3",
    tailwindConfig: undefined,
    overwriteCssVars: false,
    initIndex: true,
    ...options,
  };

  let plugins = [updateCssVarsPlugin(cssVars)];

  if (options.cleanupDefaultNextStyles) {
    plugins.push(cleanupDefaultNextStylesPlugin());
  }

  if (options.tailwindVersion === "v4") {
    plugins = [];

    // // Only add tw-animate-css if project does not have tailwindcss-animate
    // if (config.resolvedPaths?.cwd) {
    //   const packageInfo = getPackageInfo(config.resolvedPaths.cwd);
    //   if (
    //     !packageInfo?.dependencies?.["tailwindcss-animate"] &&
    //     !packageInfo?.devDependencies?.["tailwindcss-animate"] &&
    //     options.initIndex
    //   ) {
    //     plugins.push(addCustomImport({ params: "tw-animate-css" }));
    //   }
    // }

    plugins.push(addCustomVariant({ params: "dark (&:is(.dark *))" }));

    if (options.cleanupDefaultNextStyles) {
      plugins.push(cleanupDefaultNextStylesPlugin());
    }

    plugins.push(
      updateCssVarsPluginV4(cssVars, {
        overwriteCssVars: options.overwriteCssVars,
      })
    );
    plugins.push(updateThemePlugin(cssVars));

    if (options.tailwindConfig) {
      plugins.push(updateTailwindConfigPlugin(options.tailwindConfig));
      plugins.push(updateTailwindConfigAnimationPlugin(options.tailwindConfig));
      plugins.push(updateTailwindConfigKeyframesPlugin(options.tailwindConfig));
    }
  }

  if (config.tailwind.cssVariables && options.initIndex) {
    plugins.push(
      updateBaseLayerPlugin({ tailwindVersion: options.tailwindVersion })
    );
  }

  const result = await postcss(plugins).process(input, {
    from: undefined,
  });

  let output = result.css;

  output = output.replace(/\/\* ---break--- \*\//g, "");

  if (options.tailwindVersion === "v4") {
    output = output.replace(/(\n\s*\n)+/g, "\n\n");
  }

  return output;
}

function updateBaseLayerPlugin({ tailwindVersion }) {
  return {
    postcssPlugin: "update-base-layer",
    Once(root) {
      const requiredRules = [
        {
          selector: "*",
          apply:
            tailwindVersion === "v4"
              ? "border-border outline-ring/50"
              : "border-border",
        },
        { selector: "body", apply: "bg-background text-foreground" },
      ];

      let baseLayer = root.nodes.find(
        (node) =>
          node.type === "atrule" &&
          node.name === "layer" &&
          node.params === "base" &&
          requiredRules.every(({ selector, apply }) =>
            node.nodes?.some(
              (rule) =>
                rule.type === "rule" &&
                rule.selector === selector &&
                rule.nodes.some(
                  (applyRule) =>
                    applyRule.type === "atrule" &&
                    applyRule.name === "apply" &&
                    applyRule.params === apply
                )
            )
          )
      );

      if (!baseLayer) {
        baseLayer = postcss.atRule({
          name: "layer",
          params: "base",
          raws: { semicolon: true, between: " ", before: "\n" },
        });
        root.append(baseLayer);
        root.insertBefore(baseLayer, postcss.comment({ text: "---break---" }));
      }

      requiredRules.forEach(({ selector, apply }) => {
        const existingRule = baseLayer?.nodes?.find(
          (node) => node.type === "rule" && node.selector === selector
        );

        if (!existingRule) {
          baseLayer?.append(
            postcss.rule({
              selector,
              nodes: [
                postcss.atRule({
                  name: "apply",
                  params: apply,
                  raws: { semicolon: true, before: "\n    " },
                }),
              ],
              raws: { semicolon: true, between: " ", before: "\n  " },
            })
          );
        }
      });
    },
  };
}
function updateCssVarsPlugin(cssVars) {
  return {
    postcssPlugin: "update-css-vars",
    Once(root) {
      let baseLayer = root.nodes.find(
        (node) =>
          node.type === "atrule" &&
          node.name === "layer" &&
          node.params === "base"
      );

      if (!(baseLayer instanceof AtRule)) {
        baseLayer = postcss.atRule({
          name: "layer",
          params: "base",
          nodes: [],
          raws: {
            semicolon: true,
            before: "\n",
            between: " ",
          },
        });
        root.append(baseLayer);
        root.insertBefore(baseLayer, postcss.comment({ text: "---break---" }));
      }

      if (baseLayer !== undefined) {
        // Add variables for each key in cssVars
        Object.entries(cssVars).forEach(([key, vars]) => {
          const selector = key === "light" ? ":root" : `.${key}`;
          addOrUpdateVars(baseLayer, selector, vars);
        });
      }
    },
  };
}

function removeConflictVars(root) {
  const rootRule = root.nodes.find(
    (node) => node.type === "rule" && node.selector === ":root"
  );

  if (rootRule) {
    const propsToRemove = ["--background", "--foreground"];

    rootRule.nodes
      .filter(
        (node) => node.type === "decl" && propsToRemove.includes(node.prop)
      )
      .forEach((node) => node.remove());

    if (rootRule.nodes.length === 0) {
      rootRule.remove();
    }
  }
}

function cleanupDefaultNextStylesPlugin() {
  return {
    postcssPlugin: "cleanup-default-next-styles",
    Once(root) {
      const bodyRule = root.nodes.find(
        (node) => node.type === "rule" && node.selector === "body"
      );
      if (bodyRule) {
        // Remove color from the body node.
        bodyRule.nodes
          .find(
            (node) =>
              node.type === "decl" &&
              node.prop === "color" &&
              ["rgb(var(--foreground-rgb))", "var(--foreground)"].includes(
                node.value
              )
          )
          ?.remove();

        // Remove background: linear-gradient.
        bodyRule.nodes
          .find((node) => {
            return (
              node.type === "decl" &&
              node.prop === "background" &&
              // This is only going to run on create project, so all good.
              (node.value.startsWith("linear-gradient") ||
                node.value === "var(--background)")
            );
          })
          ?.remove();

        // Remove font-family: Arial, Helvetica, sans-serif;
        bodyRule.nodes
          .find(
            (node) =>
              node.type === "decl" &&
              node.prop === "font-family" &&
              node.value === "Arial, Helvetica, sans-serif"
          )
          ?.remove();

        // If the body rule is empty, remove it.
        if (bodyRule.nodes.length === 0) {
          bodyRule.remove();
        }
      }

      removeConflictVars(root);

      const darkRootRule = root.nodes.find(
        (node) =>
          node.type === "atrule" &&
          node.params === "(prefers-color-scheme: dark)"
      );

      if (darkRootRule) {
        removeConflictVars(darkRootRule);
        if (darkRootRule.nodes.length === 0) {
          darkRootRule.remove();
        }
      }
    },
  };
}

function addOrUpdateVars(baseLayer, selector, vars) {
  let ruleNode = baseLayer.nodes?.find(
    (node) => node.type === "rule" && node.selector === selector
  );

  if (!ruleNode) {
    if (Object.keys(vars).length > 0) {
      ruleNode = postcss.rule({
        selector,
        raws: { between: " ", before: "\n  " },
      });
      baseLayer.append(ruleNode);
    }
  }

  Object.entries(vars).forEach(([key, value]) => {
    const prop = `--${key.replace(/^--/, "")}`;
    const newDecl = postcss.decl({
      prop,
      value,
      raws: { semicolon: true },
    });

    const existingDecl = ruleNode?.nodes.find(
      (node) => node.type === "decl" && node.prop === prop
    );

    existingDecl
      ? existingDecl.replaceWith(newDecl)
      : ruleNode?.append(newDecl);
  });
}

function updateCssVarsPluginV4(cssVars, options) {
  return {
    postcssPlugin: "update-css-vars-v4",
    Once(root) {
      Object.entries(cssVars).forEach(([key, vars]) => {
        let selector = key === "light" ? ":root" : `.${key}`;

        if (key === "theme") {
          selector = "@theme";
          const themeNode = upsertThemeNode(root);
          Object.entries(vars).forEach(([key, value]) => {
            const prop = `--${key.replace(/^--/, "")}`;
            const newDecl = postcss.decl({
              prop,
              value,
              raws: { semicolon: true },
            });

            const existingDecl = themeNode?.nodes?.find(
              (node) => node.type === "decl" && node.prop === prop
            );

            if (existingDecl) {
              existingDecl.replaceWith(newDecl);
            } else {
              themeNode?.append(newDecl);
            }
          });
          return;
        }

        let ruleNode = root.nodes?.find(
          (node) => node.type === "rule" && node.selector === selector
        );

        if (!ruleNode && Object.keys(vars).length > 0) {
          ruleNode = postcss.rule({
            selector,
            nodes: [],
            raws: { semicolon: true, between: " ", before: "\n" },
          });
          root.append(ruleNode);
          root.insertBefore(ruleNode, postcss.comment({ text: "---break---" }));
        }

        Object.entries(vars).forEach(([key, value]) => {
          let prop = `--${key.replace(/^--/, "")}`;

          if (prop === "--sidebar-background") {
            prop = "--sidebar";
          }

          // Fix: Handle different value types properly
          let finalValue = value;

          // Handle font variables
          if (
            key.includes("font") &&
            !value.startsWith('"') &&
            !value.startsWith("'")
          ) {
            finalValue = `"${value}"`;
          }
          // Handle color values - but don't wrap OKLCH values
          else if (isLocalHSLValue(value) && !value.startsWith("oklch")) {
            finalValue = `hsl(${value})`;
          }
          // For OKLCH, RGB, HSL, and other values, use as-is
          else {
            finalValue = value;
          }

          const newDecl = postcss.decl({
            prop,
            value: finalValue,
            raws: { semicolon: true },
          });

          const existingDecl = ruleNode?.nodes.find(
            (node) => node.type === "decl" && node.prop === prop
          );

          if (existingDecl) {
            existingDecl.replaceWith(newDecl);
          } else {
            ruleNode?.append(newDecl);
          }
        });
      });
    },
  };
}

function updateThemePlugin(cssVars) {
  return {
    postcssPlugin: "update-theme",
    Once(root) {
      // Get all variables from light and dark themes
      const variables = Array.from(
        new Set(
          Object.keys(cssVars).flatMap((key) => Object.keys(cssVars[key] || {}))
        )
      );

      if (!variables.length) {
        return;
      }

      const themeNode = upsertThemeNode(root);

      for (const variable of variables) {
        const value = Object.values(cssVars).find((vars) => vars[variable])?.[
          variable
        ];

        if (!value) {
          continue;
        }

        if (variable === "radius") {
          const radiusVariables = {
            sm: "calc(var(--radius) - 4px)",
            md: "calc(var(--radius) - 2px)",
            lg: "var(--radius)",
            xl: "calc(var(--radius) + 4px)",
          };
          for (const [key, value] of Object.entries(radiusVariables)) {
            const cssVarNode = postcss.decl({
              prop: `--radius-${key}`,
              value,
              raws: { semicolon: true },
            });
            const existingDecl = themeNode?.nodes?.find(
              (node) => node.type === "decl" && node.prop === cssVarNode.prop
            );
            if (!existingDecl) {
              themeNode?.append(cssVarNode);
            }
          }
          continue;
        }

        // Fix: Handle font variables properly
        let prop;
        let propValue;

        if (variable.includes("font")) {
          if (variable === "font-display") {
            prop = "--font-display";
            propValue = "var(--display-family)";
          } else if (variable === "font-text") {
            prop = "--font-text";
            propValue = "var(--text-family)";
          } else {
            prop = `--${variable.replace(/^--/, "")}`;
            propValue = `var(--${variable})`;
          }
        } else {
          prop =
            isLocalHSLValue(value) || isColorValue(value)
              ? `--color-${variable.replace(/^--/, "")}`
              : `--${variable.replace(/^--/, "")}`;
          propValue = `var(--${variable})`;
        }

        if (prop === "--color-sidebar-background") {
          prop = "--color-sidebar";
          propValue = "var(--sidebar)";
        }

        const cssVarNode = postcss.decl({
          prop,
          value: propValue,
          raws: { semicolon: true },
        });

        const existingDecl = themeNode?.nodes?.find(
          (node) => node.type === "decl" && node.prop === cssVarNode.prop
        );

        if (!existingDecl) {
          themeNode?.append(cssVarNode);
        }
      }
    },
  };
}

function upsertThemeNode(root) {
  let themeNode = root.nodes.find(
    (node) =>
      node.type === "atrule" &&
      node.name === "theme" &&
      node.params === "inline"
  );

  if (!themeNode) {
    themeNode = postcss.atRule({
      name: "theme",
      params: "inline",
      nodes: [],
      raws: { semicolon: true, between: " ", before: "\n" },
    });
    root.append(themeNode);
    root.insertBefore(themeNode, postcss.comment({ text: "---break---" }));
  }

  return themeNode;
}

function addCustomVariant({ params }) {
  return {
    postcssPlugin: "add-custom-variant",
    Once(root) {
      const customVariant = root.nodes.find(
        (node) => node.type === "atrule" && node.name === "custom-variant"
      );
      if (!customVariant) {
        // Find all import nodes
        const importNodes = root.nodes.filter(
          (node) => node.type === "atrule" && node.name === "import"
        );
        const variantNode = postcss.atRule({
          name: "custom-variant",
          params,
          raws: { semicolon: true, before: "\n" },
        });

        if (importNodes.length > 0) {
          // Insert after the last import
          const lastImport = importNodes[importNodes.length - 1];
          root.insertAfter(lastImport, variantNode);
        } else {
          // If no imports, insert after the first node
          root.insertAfter(root.nodes[0], variantNode);
        }

        root.insertBefore(
          variantNode,
          postcss.comment({ text: "---break---" })
        );
      }
    },
  };
}

function addCustomImport({ params }) {
  return {
    postcssPlugin: "add-custom-import",
    Once(root) {
      const importNodes = root.nodes.filter(
        (node) => node.type === "atrule" && node.name === "import"
      );

      // Find custom variant node (to ensure we insert before it)
      const customVariantNode = root.nodes.find(
        (node) => node.type === "atrule" && node.name === "custom-variant"
      );

      // Check if our specific import already exists
      const hasImport = importNodes.some(
        (node) => node.params.replace(/["']/g, "") === params
      );

      if (!hasImport) {
        const importNode = postcss.atRule({
          name: "import",
          params: `"${params}"`,
          raws: { semicolon: true, before: "\n" },
        });

        if (importNodes.length > 0) {
          // If there are existing imports, add after the last import
          const lastImport = importNodes[importNodes.length - 1];
          root.insertAfter(lastImport, importNode);
        } else if (customVariantNode) {
          // If no imports but has custom-variant, insert before it
          root.insertBefore(customVariantNode, importNode);
          root.insertBefore(
            customVariantNode,
            postcss.comment({ text: "---break---" })
          );
        } else {
          // If no imports and no custom-variant, insert at the start
          root.prepend(importNode);
          root.insertAfter(
            importNode,
            postcss.comment({ text: "---break---" })
          );
        }
      }
    },
  };
}

function updateTailwindConfigPlugin(tailwindConfig) {
  return {
    postcssPlugin: "update-tailwind-config",
    Once(root) {
      if (!tailwindConfig?.plugins) {
        return;
      }

      const quoteType = getQuoteType(root);
      const quote = quoteType === "single" ? "'" : '"';

      const pluginNodes = root.nodes.filter(
        (node) => node.type === "atrule" && node.name === "plugin"
      );

      const lastPluginNode =
        pluginNodes[pluginNodes.length - 1] || root.nodes[0];

      for (const plugin of tailwindConfig.plugins) {
        const pluginName = plugin.replace(/^require\(["']|["']\)$/g, "");

        // Check if the plugin is already present.
        if (
          pluginNodes.some((node) => {
            return node.params.replace(/["']/g, "") === pluginName;
          })
        ) {
          continue;
        }

        const pluginNode = postcss.atRule({
          name: "plugin",
          params: `${quote}${pluginName}${quote}`,
          raws: { semicolon: true, before: "\n" },
        });
        root.insertAfter(lastPluginNode, pluginNode);
        root.insertBefore(pluginNode, postcss.comment({ text: "---break---" }));
      }
    },
  };
}

function updateTailwindConfigKeyframesPlugin(tailwindConfig) {
  return {
    postcssPlugin: "update-tailwind-config-keyframes",
    Once(root) {
      if (!tailwindConfig?.theme?.extend?.keyframes) {
        return;
      }

      const themeNode = upsertThemeNode(root);
      const existingKeyFrameNodes = themeNode.nodes?.filter(
        (node) => node.type === "atrule" && node.name === "keyframes"
      );

      const keyframeValueSchema = z.record(
        z.string(),
        z.record(z.string(), z.string())
      );

      for (const [keyframeName, keyframeValue] of Object.entries(
        tailwindConfig.theme.extend.keyframes
      )) {
        if (typeof keyframeName !== "string") {
          continue;
        }

        const parsedKeyframeValue =
          keyframeValueSchema.safeParse(keyframeValue);

        if (!parsedKeyframeValue.success) {
          continue;
        }

        if (
          existingKeyFrameNodes?.find(
            (node) =>
              node.type === "atrule" &&
              node.name === "keyframes" &&
              node.params === keyframeName
          )
        ) {
          continue;
        }

        const keyframeNode = postcss.atRule({
          name: "keyframes",
          params: keyframeName,
          nodes: [],
          raws: { semicolon: true, between: " ", before: "\n  " },
        });

        for (const [key, values] of Object.entries(parsedKeyframeValue.data)) {
          const rule = postcss.rule({
            selector: key,
            nodes: Object.entries(values).map(([key, value]) =>
              postcss.decl({
                prop: key,
                value,
                raws: { semicolon: true, before: "\n      ", between: ": " },
              })
            ),
            raws: { semicolon: true, between: " ", before: "\n    " },
          });
          keyframeNode.append(rule);
        }

        themeNode.append(keyframeNode);
        themeNode.insertBefore(
          keyframeNode,
          postcss.comment({ text: "---break---" })
        );
      }
    },
  };
}

function updateTailwindConfigAnimationPlugin(tailwindConfig) {
  return {
    postcssPlugin: "update-tailwind-config-animation",
    Once(root) {
      if (!tailwindConfig?.theme?.extend?.animation) {
        return;
      }

      const themeNode = upsertThemeNode(root);
      const existingAnimationNodes = themeNode.nodes?.filter(
        (node) => node.type === "decl" && node.prop.startsWith("--animate-")
      );

      const parsedAnimationValue = z
        .record(z.string(), z.string())
        .safeParse(tailwindConfig.theme.extend.animation);
      if (!parsedAnimationValue.success) {
        return;
      }

      for (const [key, value] of Object.entries(parsedAnimationValue.data)) {
        const prop = `--animate-${key}`;
        if (existingAnimationNodes?.find((node) => node.prop === prop)) {
          continue;
        }

        const animationNode = postcss.decl({
          prop,
          value,
          raws: { semicolon: true, between: ": ", before: "\n  " },
        });
        themeNode.append(animationNode);
      }
    },
  };
}

function getQuoteType(root) {
  const firstNode = root.nodes[0];
  const raw = firstNode.toString();

  if (raw.includes("'")) {
    return "single";
  }
  return "double";
}

export function isColorValue(value) {
  return (
    value.startsWith("hsl") ||
    value.startsWith("rgb") ||
    value.startsWith("#") ||
    value.startsWith("oklch")
  );
}

// Fix: Update the HSL check to properly exclude OKLCH
export function isLocalHSLValue(value) {
  if (typeof value !== "string") {
    return false;
  }

  // Exclude any value that already has a color function
  if (
    value.startsWith("hsl(") ||
    value.startsWith("rgb(") ||
    value.startsWith("oklch(") ||
    value.startsWith("#") ||
    value.startsWith("var(") ||
    value.includes("calc(") ||
    value.includes("clamp(")
  ) {
    return false;
  }

  // Check if it's a local HSL value (space-separated numbers
  const chunks = value.split(" ");

  return (
    chunks.length === 3 &&
    chunks.slice(1, 3).every((chunk) => chunk.includes("%"))
  );
}
