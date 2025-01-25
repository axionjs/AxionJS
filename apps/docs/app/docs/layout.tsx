import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Provider } from "react-wrap-balancer";
import Navbar from "@/components/ui/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      <Provider>{children}</Provider>
    </DocsLayout>
  );
}
