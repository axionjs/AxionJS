import { type Registry } from "@/registry_v4/schema";
import { lib } from "@/registry_v4/registry-lib";
import { themes } from "@/registry_v4/registry-themes";
import { ui } from "@/registry_v4/registry-ui";
import { hooks } from "@/registry_v4/registry-hooks";
import { blocks } from "@/registry_v4/registry-blocks";
import { dynamicComponents } from "@/registry_v4/registry-dynamic-components";
import { charts } from "@/registry_v4/registry-charts";

export const registry = {
  name: "axionjs",
  homepage: "https://www.axionjs.com",
  items: [
    ...ui,
    ...lib,
    ...themes,
    ...hooks,
    ...blocks,
    ...dynamicComponents,
    ...charts,
  ],
} satisfies Registry;
