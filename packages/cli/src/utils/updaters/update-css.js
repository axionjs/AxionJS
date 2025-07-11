import { promises as fs } from "fs";
import path from "path";
import { highlighter } from "../highlighter.js";
import { spinner } from "../spinner.js";
import postcss from "postcss";
export async function updateCss(css, config, options) {
  if (
    !config.resolvedPaths.tailwindCss ||
    !css ||
    Object.keys(css).length === 0
  ) {
    return;
  }

  options = {
    silent: false,
    ...options,
  };

  const cssFilepath = config.resolvedPaths.tailwindCss;
  const cssFilepathRelative = path.relative(
    config.resolvedPaths.cwd,
    cssFilepath
  );
  const cssSpinner = spinner(
    `Updating ${highlighter.info(cssFilepathRelative)}`,
    {
      silent: options.silent,
    }
  ).start();

  const raw = await fs.readFile(cssFilepath, "utf8");
  let output = await transformCss(raw, css);
  await fs.writeFile(cssFilepath, output, "utf8");
  cssSpinner.succeed();
}

export async function transformCss(input, css) {
  const plugins = [updateCssPlugin(css)];

  const result = await postcss(plugins).process(input, {
    from: undefined,
  });

  let output = result.css;
  output = output.replace(/\/\* ---break--- \*\//g, "");
  output = output.replace(/(\n\s*\n)+/g, "\n\n");
  output = output.trimEnd();

  return output;
}

function updateCssPlugin(css) {
  return {
    postcssPlugin: "update-css",
    Once(root) {
      for (const [selector, properties] of Object.entries(css)) {
        if (selector.startsWith("@")) {
          // Handle at-rules (@layer, @utility, etc.)
          const atRuleMatch = selector.match(/@([a-zA-Z-]+)\s*(.*)/);
          if (!atRuleMatch) continue;

          const [, name, params] = atRuleMatch;

          // Special handling for keyframes - place them under @theme inline
          if (name === "keyframes") {
            let themeInline = root.nodes?.find(
              (node) =>
                node.type === "atrule" &&
                node.name === "theme" &&
                node.params === "inline"
            );

            if (!themeInline) {
              themeInline = postcss.atRule({
                name: "theme",
                params: "inline",
                raws: { semicolon: true, between: " ", before: "\n" },
              });
              root.append(themeInline);
              root.insertBefore(
                themeInline,
                postcss.comment({ text: "---break---" })
              );
            }

            const keyframesRule = postcss.atRule({
              name: "keyframes",
              params,
              raws: { semicolon: true, between: " ", before: "\n  " },
            });

            themeInline.append(keyframesRule);

            if (typeof properties === "object") {
              for (const [step, stepProps] of Object.entries(properties)) {
                processRule(keyframesRule, step, stepProps);
              }
            }
          }
          // Special handling for utility classes to preserve property values
          else if (name === "utility") {
            const utilityAtRule = root.nodes?.find(
              (node) =>
                node.type === "atrule" &&
                node.name === name &&
                node.params === params
            );

            if (!utilityAtRule) {
              const atRule = postcss.atRule({
                name,
                params,
                raws: { semicolon: true, between: " ", before: "\n" },
              });

              root.append(atRule);
              root.insertBefore(
                atRule,
                postcss.comment({ text: "---break---" })
              );

              // Add declarations with their values preserved
              if (typeof properties === "object") {
                for (const [prop, value] of Object.entries(properties)) {
                  if (typeof value === "string") {
                    const decl = postcss.decl({
                      prop,
                      value: value,
                      raws: { semicolon: true, before: "\n    " },
                    });
                    atRule.append(decl);
                  } else if (typeof value === "object") {
                    processRule(atRule, prop, value);
                  }
                }
              }
            } else {
              // Update existing utility class
              if (typeof properties === "object") {
                for (const [prop, value] of Object.entries(properties)) {
                  if (typeof value === "string") {
                    const existingDecl = utilityAtRule.nodes?.find(
                      (node) => node.type === "decl" && node.prop === prop
                    );

                    const decl = postcss.decl({
                      prop,
                      value: value,
                      raws: { semicolon: true, before: "\n    " },
                    });

                    existingDecl
                      ? existingDecl.replaceWith(decl)
                      : utilityAtRule.append(decl);
                  } else if (typeof value === "object") {
                    processRule(utilityAtRule, prop, value);
                  }
                }
              }
            }
          } else {
            // Handle other at-rules normally
            processAtRule(root, name, params, properties);
          }
        } else {
          // Handle regular CSS rules
          processRule(root, selector, properties);
        }
      }
    },
  };
}

function processAtRule(root, name, params, properties) {
  // Find or create the at-rule
  let atRule = root.nodes?.find(
    (node) =>
      node.type === "atrule" && node.name === name && node.params === params
  );

  if (!atRule) {
    atRule = postcss.atRule({
      name,
      params,
      raws: { semicolon: true, between: " ", before: "\n" },
    });
    root.append(atRule);
    root.insertBefore(atRule, postcss.comment({ text: "---break---" }));
  }

  // Process children of this at-rule
  if (typeof properties === "object") {
    for (const [childSelector, childProps] of Object.entries(properties)) {
      if (childSelector.startsWith("@")) {
        // Nested at-rule
        const nestedMatch = childSelector.match(/@([a-zA-Z-]+)\s*(.*)/);
        if (nestedMatch) {
          const [, nestedName, nestedParams] = nestedMatch;
          processAtRule(atRule, nestedName, nestedParams, childProps);
        }
      } else {
        // CSS rule within at-rule
        processRule(atRule, childSelector, childProps);
      }
    }
  } else if (typeof properties === "string") {
    // Direct string content for the at-rule
    try {
      // Parse the CSS string with PostCSS
      const parsed = postcss.parse(`.temp{${properties}}`);
      const tempRule = parsed.first;

      if (tempRule && tempRule.nodes) {
        // Create a rule for the at-rule if needed
        const rule = postcss.rule({
          selector: "temp",
          raws: { semicolon: true, between: " ", before: "\n  " },
        });

        // Copy all declarations from the temp rule to our actual rule
        tempRule.nodes.forEach((node) => {
          if (node.type === "decl") {
            const clone = node.clone();
            clone.raws.before = "\n    ";
            rule.append(clone);
          }
        });

        // Only add the rule if it has declarations
        if (rule.nodes?.length) {
          atRule.append(rule);
        }
      }
    } catch (error) {
      console.error("Error parsing at-rule content:", properties, error);
      throw error;
    }
  }
}

function processRule(parent, selector, properties) {
  let rule = parent.nodes?.find(
    (node) => node.type === "rule" && node.selector === selector
  );

  if (!rule) {
    rule = postcss.rule({
      selector,
      raws: { semicolon: true, between: " ", before: "\n  " },
    });
    parent.append(rule);
  }

  if (typeof properties === "object") {
    for (const [prop, value] of Object.entries(properties)) {
      if (typeof value === "string") {
        const decl = postcss.decl({
          prop,
          value: value,
          raws: { semicolon: true, before: "\n    " },
        });

        // Replace existing property or add new one
        const existingDecl = rule.nodes?.find(
          (node) => node.type === "decl" && node.prop === prop
        );

        existingDecl ? existingDecl.replaceWith(decl) : rule.append(decl);
      } else if (typeof value === "object") {
        // Nested selector (including & selectors)
        const nestedSelector = prop.startsWith("&")
          ? selector.replace(/^([^:]+)/, `$1${prop.substring(1)}`)
          : prop; // Use the original selector for other nested elements
        processRule(parent, nestedSelector, value);
      }
    }
  } else if (typeof properties === "string") {
    // Direct string content for the rule
    try {
      // Parse the CSS string with PostCSS
      const parsed = postcss.parse(`.temp{${properties}}`);
      const tempRule = parsed.first;

      if (tempRule && tempRule.nodes) {
        // Copy all declarations from the temp rule to our actual rule
        tempRule.nodes.forEach((node) => {
          if (node.type === "decl") {
            const clone = node.clone();
            clone.raws.before = "\n    ";
            rule?.append(clone);
          }
        });
      }
    } catch (error) {
      console.error("Error parsing rule content:", selector, properties, error);
      throw error;
    }
  }
}
