"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/registry/new-york/ui/tooltip";
import { Separator } from "@/registry/new-york/ui/separator";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { Button } from "@/registry/new-york/ui/button";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { cn } from "@/lib/utils";
import { Home, Search, BarChart2, Settings, User, Eye } from "lucide-react";

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "#home" },
  { id: "search", icon: Search, label: "Search", href: "#search" },
  { id: "analytics", icon: BarChart2, label: "Analytics", href: "#analytics" },
  { id: "settings", icon: Settings, label: "Settings", href: "#settings" },
  { id: "profile", icon: User, label: "Profile", href: "#profile" },
];

interface BottomNavigationProps {
  mode?: "fixed" | "preview" | "standalone";
  className?: string;
  showThemeButton?: boolean;
  showToggle?: boolean;
}

export default function BottomNavigation({
  mode = "fixed",
  className,
  showThemeButton = true,
  showToggle = false,
}: BottomNavigationProps) {
  const [currentMode, setCurrentMode] = useState<"fixed" | "preview">(
    mode === "standalone" ? "preview" : mode
  );

  // Base navigation component
  const NavigationBar = ({ isPreview = false }: { isPreview?: boolean }) => (
    <TooltipProvider>
      <div
        className={cn(
          "mx-auto flex items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-full h-14",
          className
        )}
      >
        {navItems.map((item) => (
          <div key={item.id} className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
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
        {showThemeButton && (
          <>
            <Separator orientation="vertical" className="h-full mx-2" />
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
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
          </>
        )}
      </div>
    </TooltipProvider>
  );

  // Preview mode component
  const PreviewMode = () => (
    <div className="w-full max-w-md mx-auto">
      {showToggle && (
        <div className="flex justify-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentMode(currentMode === "fixed" ? "preview" : "fixed")
            }
            className="gap-2"
          >
            <Eye className="size-4" />
            {currentMode === "fixed" ? "Show Preview" : "Show Fixed"}
          </Button>
        </div>
      )}
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border-2 border-dashed border-muted-foreground/20">
        <CardContent className="p-8">
          {/* Mock screen content */}
          <div className="space-y-4 mb-16">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="h-20 bg-muted rounded animate-pulse" />
              <div className="h-20 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-32 bg-muted rounded animate-pulse" />
          </div>

          {/* Bottom navigation preview */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <NavigationBar isPreview={true} />
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Bottom Navigation Preview
      </p>
    </div>
  );

  // Fixed mode component
  const FixedMode = () => (
    <>
      {showToggle && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentMode(currentMode === "fixed" ? "preview" : "fixed")
            }
            className="gap-2"
          >
            <Eye className="size-4" />
            {currentMode === "fixed" ? "Show Preview" : "Show Fixed"}
          </Button>
        </div>
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
        <div className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center">
          <NavigationBar />
        </div>
      </div>
    </>
  );

  // Standalone mode component
  const StandaloneMode = () => (
    <div className="flex justify-center">
      <NavigationBar />
    </div>
  );

  // Render based on mode
  if (mode === "standalone") {
    return <StandaloneMode />;
  }

  if (mode === "preview" || currentMode === "preview") {
    return <PreviewMode />;
  }

  return <FixedMode />;
}
