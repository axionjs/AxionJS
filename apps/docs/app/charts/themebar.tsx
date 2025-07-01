"use client";

import { useState } from "react";
import { useChartTheme, chartThemes } from "./chart-theme-utils";
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

export function ThemeBar() {
  const { chartTheme, setChartTheme, getChartThemeCSS } = useChartTheme();
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCSS = () => {
    navigator.clipboard.writeText(getChartThemeCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    setCodeDialogOpen(true);
  };

  return (
    <>
      <div className="w-full mb-8">
        <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border bg-card overflow-x-auto">
          {/* Theme colors with names on the left */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {Object.entries(chartThemes).map(([key, theme]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setChartTheme(key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        chartTheme === key
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent text-muted-foreground"
                      }`}
                      aria-label={`Switch to ${theme.name} theme`}
                    >
                      <span className="text-lg flex-shrink-0">
                        {theme.icon}
                      </span>
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

          {/* Copy code button on the right */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyCode}
            className="bg-black text-white hover:bg-black/90 dark:bg-black dark:text-white flex-shrink-0"
          >
            Copy code
          </Button>
        </div>
      </div>

      {/* CSS Code Dialog */}
      <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chart Theme CSS</DialogTitle>
            <DialogDescription>
              CSS variables for the {chartThemes[chartTheme].name} theme
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-80">
              <code>{getChartThemeCSS()}</code>
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
