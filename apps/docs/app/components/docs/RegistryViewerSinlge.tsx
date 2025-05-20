"use client";

import React, { useState, useEffect } from "react";
import { RegistryNode, RegistryItem } from "@/types/registry";
import { generateRegistryTree, findFirstFile } from "@/lib/registry-utils";
import { CodeBlock } from "./CodeBlock";
import { Loader2 } from "lucide-react";

interface RegistryViewerSingleProps {
  componentName: string;
  style?: string;
  className?: string;
}

export function RegistryViewerSingle({
  componentName,
  style = "new-york",
  className,
}: RegistryViewerSingleProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<RegistryNode | null>(null);

  useEffect(() => {
    const fetchRegistry = async () => {
      setLoading(true);
      setError(null);

      try {
        // Construct the path to the registry JSON file
        const registryPath = `/r/styles/${style}/${componentName}.json`;

        // Fetch the registry data
        const response = await fetch(registryPath);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch registry data: ${response.statusText}`
          );
        }

        const data: RegistryItem = await response.json();

        // Check if there's only one file
        if (data.files.length === 1) {
          // If only one file, create a simple node for it
          const singleFile: RegistryNode = {
            name: data.files[0].path.split("/").pop() || data.files[0].path,
            path: data.files[0].path,
            type: "file",
            content: data.files[0].content,
          };
          setFile(singleFile);
        } else {
          // If multiple files, we might want to keep the sidebar or show an error
          throw new Error("This component is for single-file registries only.");
        }
      } catch (err) {
        console.error("Error fetching registry:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistry();
  }, [componentName, style]);

  // Determine language for syntax highlighting
  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase() || "";

    const extensionMap: Record<string, string> = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      css: "css",
      scss: "scss",
      html: "html",
      json: "json",
      md: "markdown",
    };

    return extensionMap[extension] || "typescript";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[652px] border rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">
          Loading component registry...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[652px] border rounded-lg bg-rose-50 dark:bg-rose-950/10">
        <div className="text-center text-rose-500 p-4">
          <h3 className="text-lg font-medium mb-2">Error loading registry</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-lg overflow-hidden h-[652px] not-prose ${className || ""}`}
    >
      {file?.content ? (
        <CodeBlock
          wrapperClassName="w-full"
          className="h-full max-w-none !w-full flex-1 font-mono text-xs rounded-none border-none"
          language={getLanguageFromFilename(file.name)}
          showLineNumbers={true}
          filename={file.path}
        >
          {file.content}
        </CodeBlock>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No file content unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}
