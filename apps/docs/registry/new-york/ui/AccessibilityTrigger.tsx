"use client";

import React, { useEffect } from "react";
import { useAccessibilityStore } from "@/registry/new-york/lib/accessibility-store";
import { Button } from "@/registry/new-york/ui/button";
import {
  LucideAccessibility,
  LucideEye,
  LucideVolume2,
  LucideZap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export function AccessibilityTrigger() {
  const { toggleOpen, screenReader } = useAccessibilityStore();

  // Listen for the custom event to toggle the panel
  useEffect(() => {
    const handleToggleEvent = () => {
      toggleOpen();
    };

    document.addEventListener("toggleAccessibilityPanel", handleToggleEvent);
    return () => {
      document.removeEventListener(
        "toggleAccessibilityPanel",
        handleToggleEvent
      );
    };
  }, [toggleOpen]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            onClick={toggleOpen}
            aria-label="Open Accessibility Menu"
          >
            <div className="relative">
              <LucideAccessibility className="w-8 h-8 text-white" />
              {screenReader.enabled && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse" />
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Accessibility Options (Ctrl+U)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
