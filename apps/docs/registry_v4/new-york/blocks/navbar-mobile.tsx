"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/registry/new-york/ui/logo";
import { Button } from "@/registry/new-york/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/registry/new-york/ui/sheet";
import { ModeToggle } from "@/registry/new-york/ui/mode-toggle";
import { Menu, Home, FileText, Settings, Users, BarChart2 } from "lucide-react";
import { motion } from "motion/react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "registry/new-york",
    href: "/registry/new-york",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Team",
    href: "/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function NavbarMobile() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState(
    navItems.findIndex((item) => item.href === pathname) || 0,
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="px-7">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setOpen(false)}
                  >
                    <Logo className="mr-2 h-4 w-4" />
                    <span className="font-bold">Axion.js</span>
                  </Link>
                </div>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center rounded-l-md py-3 pl-2 pr-8 text-sm font-medium transition-colors duration-200",
                          pathname === item.href
                            ? "bg-muted"
                            : "hover:bg-muted/50",
                        )}
                      >
                        <div className="mr-3 flex h-6 w-6 items-center justify-center">
                          {item.icon}
                        </div>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <Button asChild size="sm" variant="outline">
                      <Link href="/login" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/signup" onClick={() => setOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block">Axion.js</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 block border-t bg-background md:hidden">
        <div className="flex h-16 items-center justify-around">
          {navItems.slice(0, 5).map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center space-y-1",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              onClick={() => setActiveTab(index)}
            >
              {index === activeTab && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-x-0 top-0 z-10 flex items-center justify-center"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="h-1 w-10 rounded-full bg-primary" />
                </motion.div>
              )}
              <span className="z-20">{item.icon}</span>
              <span className="z-20 text-xs">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
