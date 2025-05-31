"use client";

import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/registry/new-york/ui/button";
import { Check, Copy, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  onCopy: () => void;
  copied: boolean;
  fileName?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "css",
  onCopy,
  copied,
  fileName,
  showLineNumbers = true,
}: CodeBlockProps) {
  return (
    <div className="relative rounded-md overflow-hidden border">
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b text-xs font-mono text-muted-foreground">
          <FileCode2 className="h-3.5 w-3.5" />
          {fileName}
        </div>
      )}
      <div className="relative">
        <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(className, "p-4 text-xs overflow-auto")}
              style={{ ...style, backgroundColor: "hsl(var(--muted))" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {showLineNumbers && (
                    <span className="mr-4 text-muted-foreground opacity-50">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 gap-1 text-xs bg-primary/10 hover:bg-primary/20"
          onClick={onCopy}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
