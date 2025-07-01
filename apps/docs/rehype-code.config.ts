// rehype-code.config.ts
import type { RehypeCodeOptions } from "fumadocs-core/mdx-plugins";

export const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "monokai-light",
    dark: "monokai",
  },
  defaultColor: false,
};
