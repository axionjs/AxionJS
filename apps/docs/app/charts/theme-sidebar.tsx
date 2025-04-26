"use client";

import { useState } from "react";
import { useChartTheme, chartThemes } from "./chart-theme-utils";
import { Copy, Check, X } from "lucide-react";
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

export function ThemeSidebar() {
  const { chartTheme, setChartTheme, getChartThemeCSS } = useChartTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCSS = () => {
    navigator.clipboard.writeText(getChartThemeCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-l-md shadow-md"
        aria-label="Toggle theme sidebar"
      >
        {sidebarOpen ? (
          <X size={16} />
        ) : (
          <span>{chartThemes[chartTheme].icon}</span>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 bg-card border rounded-l-md shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "80px" }}
      >
        <div className="p-2">
          <div className="flex flex-col items-center gap-2">
            {Object.entries(chartThemes).map(([key, theme]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setChartTheme(key)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        chartTheme === key
                          ? "ring-2 ring-primary"
                          : "hover:bg-accent"
                      }`}
                      aria-label={`Switch to ${theme.name} theme`}
                    >
                      {theme.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{theme.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            <div className="pt-2 mt-2 border-t w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCodeDialogOpen(true)}
                className="w-full text-xs"
              >
                CSS
              </Button>
            </div>
          </div>
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
