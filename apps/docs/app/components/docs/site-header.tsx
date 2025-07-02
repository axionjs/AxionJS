import Link from "next/link";

import { source } from "@/lib/source";
import { CommandMenu } from "@/app/components/docs/command-menu";
import { GitHubLink } from "@/app/components/docs/github-link";
import { Icons } from "@/app/components/docs/icons";
import { MainNav } from "@/app/components/docs/main-nav";
import { MobileNav } from "@/app/components/docs/mobile-nav";
import { ModeSwitcher } from "@/app/components/docs/mode-switcher";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";

export const siteConfig = {
  name: "Axionjs",
  url: "https://axionjs.com",
  ogImage: "https://axionjs/og.jpg",
  description:
    "AxionJS is a revolutionary component system for Next.js that gives you full ownership of your UI code. Built on top of Radix UI primitives with accessibility-first design and AI-powered component generation.",
  links: {
    github: "https://github.com/axionjs/AxionJS",
  },
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },

    {
      href: "/charts",
      label: "Charts",
    },
    {
      href: "/blocks",
      label: "Blocks",
    },
    {
      href: "/theme",
      label: "Themes",
    },
  ], // Define if needed by MobileNav or MainNav
};

export function SiteHeader() {
  const pageTree = source.pageTree;

  return (
    <header className="bg-background py-4 sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />
          <Button
            asChild
            variant="ghost"
            className="hidden lg:flex py-1 px-2 bg-none"
          >
            <Link href="/">
              <Icons.logo className="size-24" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>

          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu tree={pageTree} />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" className="3xl:flex hidden" />
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
