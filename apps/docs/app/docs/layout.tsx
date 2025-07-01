import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { source } from "@/lib/source";
import { Provider } from "react-wrap-balancer";
import { RootProvider } from "fumadocs-ui/provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout
        tabMode="navbar"
        tree={source.pageTree}
        sidebar={{
          defaultOpenLevel: 999, // Open all folders by default
        }}
      >
        <Provider>{children}</Provider>
      </DocsLayout>
    </RootProvider>
  );
}
