import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import remarkSmartypants from "remark-smartypants";
import { remarkTypeScriptToJavaScript } from "fumadocs-docgen";
import { transformerTwoslash } from "fumadocs-twoslash";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const { docs, meta } = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkSmartypants,
      remarkTypeScriptToJavaScript,
      remarkMath,
    ],
    rehypePlugins: [rehypeCode, rehypeKatex],
    rehypeCodeOptions: {
      // Direct Shiki theme configuration
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
        {
          name: "transformers:remove-notation-escape",
          code(hast) {
            for (const line of hast.children) {
              if (line.type !== "element") continue;
              const lastSpan = line.children.findLast(
                (v) => v.type === "element"
              );
              const head = lastSpan?.children[0];
              if (head?.type !== "text") return;
              head.value = head.value.replace(/\[\\!code/g, "[!code");
            }
          },
        },
      ],
    },
  },
});
