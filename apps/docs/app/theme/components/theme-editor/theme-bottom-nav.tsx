"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/registry/new-york/ui/tooltip";
import { Button } from "@/registry/new-york/ui/button";
import { Download, Wand2, Palette } from "lucide-react";
import { useThemeStore } from "../../lib/stores/theme-store";
import ThemeSelector from "./theme-selector";

export default function ThemeBottomNav() {
  const { setExportPanelOpen, setAiPanelOpen } = useThemeStore();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-6 flex origin-bottom h-full max-h-16">
        <div className="fixed bottom-0 inset-x-0 h-20 w-full backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-3 backdrop-blur-xl [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_8px_32px_rgba(0,0,0,.12)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-full border border-border/50">
          {/* Theme Selector Button */}
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                  onClick={() => setIsThemeSelectorOpen(true)}
                >
                  <Palette className="size-4 mr-2 text-primary" />
                  <span className="font-medium text-primary">Themes</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse and select themes</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* AI Generate Button */}
          <div className="flex items-center ml-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-12 px-6 rounded-full bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60 text-primary-foreground border-0 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => setAiPanelOpen(true)}
                >
                  <Wand2 className="size-4 mr-2" />
                  <span className="font-medium">AI Generate</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate themes with AI</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Export Theme Button */}
          <div className="flex items-center ml-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="h-12 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                  onClick={() => setExportPanelOpen(true)}
                >
                  <Download className="size-4 mr-2" />
                  <span className="font-medium">Theme Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export your theme configuration</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Theme Selector Dialog */}
      <ThemeSelector
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
      />
    </TooltipProvider>
  );
}
