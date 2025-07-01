"use client";

import React, { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  wrapperClassName?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

export function CodeBlock({
  children,
  language = "typescript",
  className,
  wrapperClassName,
  showLineNumbers = true,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Mount state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(processedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process the code to transform import paths
  const processedCode = children.replace(
    /from\s+["']@\/registry\/new-york\/(.+?)["']/g,
    'from "@/$1"'
  );

  // Normalize language value for prism-react-renderer
  const getNormalizedLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      js: "javascript",
      ts: "typescript",
      tsx: "tsx",
      jsx: "jsx",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      md: "markdown",
      yaml: "yaml",
      yml: "yaml",
      bash: "bash",
      shell: "bash",
      sh: "bash",
    };

    return languageMap[lang.toLowerCase()] || lang;
  };

  const normalizedLanguage = getNormalizedLanguage(language);

  // Only show component after mounting to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-pulse w-full h-40 bg-muted/50 rounded-md"></div>
      </div>
    );
  }

  // Use the appropriate theme based on resolvedTheme
  const codeTheme = resolvedTheme === "dark" ? themes.oneDark : themes.oneLight;

  return (
    <div className={cn("relative flex flex-col h-full", wrapperClassName)}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        {filename && (
          <div className="text-sm font-medium truncate">{filename}</div>
        )}
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {normalizedLanguage}
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="overflow-auto flex-1">
        <Highlight
          theme={codeTheme}
          code={processedCode || ""}
          language={normalizedLanguage as any}
        >
          {({ className: _, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{
                ...style,
                padding: "1rem",
                margin: 0,
                overflow: "auto",
                fontFamily:
                  '"Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace',
                fontSize: "1rem",
                lineHeight: "1.5",
                textAlign: "left", // Explicitly set text alignment to left
              }}
              className={cn("overflow-auto h-full", className)}
            >
              <code>
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    style={{
                      display: "flex",
                      textAlign: "left", // Ensure line content is left-aligned
                    }}
                  >
                    {showLineNumbers && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "2.5rem",
                          userSelect: "none",
                          opacity: 0.5,
                          paddingRight: "1rem",
                          textAlign: "right",
                          borderRight: "1px solid rgba(128, 128, 128, 0.2)",
                          marginRight: "0.75rem",
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span style={{ textAlign: "left" }}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
