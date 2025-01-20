import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Docslogo from "@/app/components/ui/Docslogo";
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
  ],
};
