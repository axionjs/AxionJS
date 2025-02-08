import { type Registry } from "@/registry/schema";
import { lib } from "@/registry/registry-lib";
import { themes } from "@/registry/registry-themes";
import { ui } from "@/registry/registry-ui";

export const registry = {
  name: "axionjs",
  homepage: "https://www.axionjs.com",
  items: [...ui, ...lib, ...themes],
} satisfies Registry;
