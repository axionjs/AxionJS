import { type Registry } from "@/registry/schema";
import { lib } from "@/registry/registry-lib";
import { themes } from "@/registry/registry-themes";
import { ui } from "@/registry/registry-ui";
import { authRegistry } from "@/registry/registry-auth";
import { hooks } from "@/registry/registry-hooks";
import { blocks } from "@/registry/registry-blocks";
import { dynamicComponents } from "./registry-dynamic-components";
import { charts } from "./registry-charts";

export const registry = {
  name: "axionjs",
  homepage: "https://www.axionjs.com",
  items: [
    ...ui,
    ...lib,
    ...themes,
    ...hooks,
    ...authRegistry,
    ...blocks,
    ...dynamicComponents,
    ...charts,
  ],
} satisfies Registry;
