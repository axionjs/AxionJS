import { promises as fs } from "fs";
import path from "path";
import { highlighter } from "../highlighter.js";
import { spinner } from "../spinner.js";
import postcss from "postcss";
import AtRule from "postcss/lib/at-rule";

export async function updateCssVars(cssVars, config, options) {
  if (
    !cssVars ||
    !Object.keys(cssVars).length ||
    !config.resolvedPaths.tailwindCss
  ) {
    return;
  }

  options = {
    cleanupDefaultNextStyles: false,
    silent: false,
    ...options,
  };
  const cssFilepath = config.resolvedPaths.tailwindCss;
  const cssFilepathRelative = path.relative(
    config.resolvedPaths.cwd,
    cssFilepath
  );
  const cssVarsSpinner = spinner(
    `Updating ${highlighter.info(cssFilepathRelative)}`,
    {
      silent: options.silent,
    }
  ).start();
  const raw = await fs.readFile(cssFilepath, "utf8");
  let output = await transformCssVars(raw, cssVars, config, {
    cleanupDefaultNextStyles: options.cleanupDefaultNextStyles,
  });
  await fs.writeFile(cssFilepath, output, "utf8");
  cssVarsSpinner.succeed();
}

export async function transformCssVars(input, cssVars, config, options) {
  options = {
    cleanupDefaultNextStyles: false,
    ...options,
  };

  const plugins = [updateCssVarsPlugin(cssVars)];
  if (options.cleanupDefaultNextStyles) {
    plugins.push(cleanupDefaultNextStylesPlugin());
  }

  // Only add the base layer plugin if we're using css variables.
  if (config.tailwind.cssVariables) {
    plugins.push(updateBaseLayerPlugin());
  }

  const result = await postcss(plugins).process(input, {
    from: undefined,
  });

  return result.css;
}

function updateBaseLayerPlugin() {
  return {
    postcssPlugin: "update-base-layer",
    Once(root) {
      const requiredRules = [
        { selector: "*", apply: "border-border" },
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
