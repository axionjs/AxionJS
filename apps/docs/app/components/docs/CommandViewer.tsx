"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { Button } from "@/registry/new-york/ui/button";

interface CommandViewerProps {
  command: string;
  className?: string;
}

export function CommandViewer({ command, className }: CommandViewerProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Mount state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Only show component after mounting to prevent hydration issues
  if (!mounted) {
    return (
      <div className="animate-pulse w-full h-10 bg-muted/50 rounded-md"></div>
    );
  }

  // Use the appropriate theme based on resolvedTheme
  const codeTheme = resolvedTheme === "dark" ? themes.oneDark : themes.oneLight;

  return (
    <div
      className={cn(
        "relative rounded-lg border overflow-hidden bg-gray-50 dark:bg-gray-900",
        className
      )}
    >
      <div className="flex items-center">
        {/* Icon section */}
        <Button
          variant="secondary"
          className="flex items-center justify-center px-3 py-2 bg-muted/30 dark:bg-gray-800"
        >
          <Terminal className="h-5 w-5 text-gray-800 dark:text-gray-200" />
        </Button>

        {/* Vertical divider */}
        <div className="w-px h-full bg-border dark:bg-gray-700 self-stretch"></div>

        {/* Command section */}
        <div className="flex-1 px-3 py-2 overflow-x-auto scrollbar-hide font-mono text-sm text-gray-800 dark:text-gray-200">
          {command}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-muted dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          title="Copy command"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
