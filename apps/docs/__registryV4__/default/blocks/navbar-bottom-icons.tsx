"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/registry/default/ui/tooltip";
import { Separator } from "@/registry/default/ui/separator";
import { buttonVariants } from "@/registry/default/ui/button";
import { cn } from "@/lib/utils";
import { Home, Search, BarChart2, Settings, User } from "lucide-react";

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "#home" },
  { id: "search", icon: Search, label: "Search", href: "#search" },
  { id: "analytics", icon: BarChart2, label: "Analytics", href: "#analytics" },
  { id: "settings", icon: Settings, label: "Settings", href: "#settings" },
  { id: "profile", icon: User, label: "Profile", href: "#profile" },
];

export default function NavbarBottomIcons() {
  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
        <div className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-full">
          {navItems.map((item) => (
            <div key={item.id} className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12",
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
          <Separator orientation="vertical" className="h-full mx-2" />
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                  )}
                >
                  <Settings className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
