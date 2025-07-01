"use client";

import * as React from "react";
import { useMediaQuery } from "@/registry/new-york/hooks/use-media-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Menu,
  X,
  MonitorSmartphone,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
} from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/registry/new-york/ui/sheet";

export function ResponsiveLayoutPreview() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Team", href: "#" },
    { name: "Settings", href: "#" },
  ];

  return (
    <div className="space-y-4 not-prose">
      <div className="flex min-h-[200px] w-full flex-col border rounded-md overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">My App</span>

            {!isMobile && (
              <nav className="flex items-center gap-4 sm:gap-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">My App</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 grid-cols-2">
            <div className="rounded-lg border bg-card p-2 shadow-sm">
              <p className="text-xs">Card 1</p>
            </div>
            <div className="rounded-lg border bg-card p-2 shadow-sm">
              <p className="text-xs">Card 2</p>
            </div>
          </div>
        </main>
      </div>

      <div className="rounded-md bg-muted p-4">
        <p className="text-sm font-medium">
          Current view: <strong>{isMobile ? "Mobile" : "Desktop"}</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Resize your browser window to see the layout change
        </p>
      </div>
    </div>
  );
}

export function DeviceDetectionPreview() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isLaptop = useMediaQuery("(min-width: 1025px) and (max-width: 1440px)");
  const isDesktop = useMediaQuery("(min-width: 1441px)");
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Device Detection</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center">
            {isMobile && <Smartphone className="h-10 w-10" />}
            {isTablet && <Tablet className="h-10 w-10" />}
            {isLaptop && <Laptop className="h-10 w-10" />}
            {isDesktop && <Monitor className="h-10 w-10" />}
          </div>
          <div className="text-center">
            <span className="text-lg font-medium">
              {isMobile && "Mobile"}
              {isTablet && "Tablet"}
              {isLaptop && "Laptop"}
              {isDesktop && "Desktop"}
            </span>
            <Badge variant="outline" className="ml-2">
              {isPortrait ? "Portrait" : "Landscape"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Prefers Dark Mode:</span>
            <Badge variant={prefersDarkMode ? "default" : "outline"}>
              {prefersDarkMode ? "Yes" : "No"}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <MonitorSmartphone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Reduced Motion:</span>
            <Badge variant={prefersReducedMotion ? "default" : "outline"}>
              {prefersReducedMotion ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Resize your browser window to see values update
      </CardFooter>
    </Card>
  );
}
