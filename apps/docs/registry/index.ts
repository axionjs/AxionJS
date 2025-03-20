import { type Registry } from "@/registry/schema";
import { lib } from "@/registry/registry-lib";
import { themes } from "@/registry/registry-themes";
import { ui } from "@/registry/registry-ui";
import { authRegistry } from "@/registry/registry-auth";

export const registry = {
  name: "axionjs",
  homepage: "https://www.axionjs.com",
  items: [...ui, ...lib, ...themes, ...authRegistry],
} satisfies Registry;
