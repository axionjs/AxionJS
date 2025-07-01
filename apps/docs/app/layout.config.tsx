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
      active: "url",
    },

    {
      text: "Charts",
      url: "/charts",
      active: "url",
    },
    {
      text: "Blocks",
      url: "/blocks",
      active: "url",
    },
    {
      text: "Theme",
      url: "/theme",
      active: "url",
    },
  ],
};
