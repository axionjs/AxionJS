"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog";
import {
  useBlockTheme,
  primaryColorThemes,
  radiusOptions,
} from "./block-theme-utils";

export function ThemeBar() {
  const {
    currentTheme,
    setCurrentTheme,
    selectedRadius,
    setSelectedRadius,
    getThemeCSS,
  } = useBlockTheme();
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCSS = () => {
    navigator.clipboard.writeText(getThemeCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    setCodeDialogOpen(true);
  };

  // Helper function to determine text color class based on the theme
  const getThemeButtonTextClass = (themeKey) => {
    if (currentTheme === themeKey) {
      // Force high contrast text regardless of theme when selected
      return "text-primary font-medium";
    }
    return "text-muted-foreground";
  };

  return (
    <>
      <div className="w-full mb-8">
        <div className="flex items-center justify-between px-4 py-3 rounded-lg border bg-card overflow-x-auto">
          {/* Theme colors with color dots */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {Object.entries(primaryColorThemes).map(([key, theme]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCurrentTheme(key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all text-primary ${
                        currentTheme === key
                          ? "bg-primary/10"
                          : "hover:bg-accent"
                      } ${getThemeButtonTextClass(key)}`}
                      aria-label={`Switch to ${theme.name} theme`}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: `hsl(${primaryColorThemes[key].light["--primary"]})`,
                        }}
                      />
                      <span className="text-sm font-medium hidden sm:inline-block">
                        {theme.name}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{theme.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border mx-2 hidden sm:block"></div>

          {/* Radius options */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {radiusOptions.map((option) => (
              <TooltipProvider key={option.value}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setSelectedRadius(option.value)}
                      className={`px-3 py-2 rounded-md text-sm transition-all ${
                        selectedRadius === option.value
                          ? "bg-primary/10 text-primary border border-primary border-2"
                          : "hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {option.name}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Radius: {option.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Copy code button on the right */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyCode}
            className="bg-black text-white hover:bg-black/90 dark:bg-black dark:text-white flex-shrink-0 ml-auto"
          >
            Copy code
          </Button>
        </div>
      </div>

      {/* CSS Code Dialog */}
      <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Theme CSS (replace these variables)</DialogTitle>
            <DialogDescription>
              CSS variables for the {primaryColorThemes[currentTheme].name}{" "}
              theme
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-80">
              <code>{getThemeCSS()}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              onClick={copyCSS}
              className="absolute top-4 right-4"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
