"use client";

import { usePathname } from "next/navigation";

import type { source } from "@/lib/source";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
} from "@/registry/new-york/ui/sidebar";

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
      {...props}
    >
      <SidebarContent className="no-scrollbar px-2 pb-12">
        {/* top spacing */}
        <div className="h-[var(--top-spacing)] shrink-0" />

        {tree.children.map((item) =>
          item.type === "folder" ? (
            <SidebarGroup key={item.$id} title={item.name}>
              {item.children.map((child) =>
                child.type === "page" ? (
                  <SidebarMenuItem
                    key={child.url}
                    href={child.url}
                    active={child.url === pathname}
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium 3xl:fixed:w-full 3xl:fixed:max-w-48"
                  >
                    {child.name}
                  </SidebarMenuItem>
                ) : null
              )}
            </SidebarGroup>
          ) : null
        )}
      </SidebarContent>
    </Sidebar>
  );
}
