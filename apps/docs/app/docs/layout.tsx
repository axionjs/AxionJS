import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

import { source } from "@/lib/source";
import { Provider } from "react-wrap-balancer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      // the position of navbar

      nav={{ ...baseOptions.nav, mode: "top" }}
      // the position of Sidebar Tabs
      tabMode="navbar"
      tree={source.pageTree}
    >
      <Provider>{children}</Provider>
    </DocsLayout>
  );
}
