import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Docslogo from "@/registry/new-york/ui/Docslogo";
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Docslogo />,
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },

    {
      text: "Charts",
      url: "/charts",
      active: "nested-url",
    },
    {
      text: "UI Blocks",
      url: "/blocks",
      active: "nested-url",
    },
  ],
};
