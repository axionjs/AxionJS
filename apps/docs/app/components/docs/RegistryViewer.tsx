"use client";

import React, { useState, useEffect } from "react";
import { RegistryNode, RegistryItem } from "@/types/registry";
import { generateRegistryTree, findFirstFile } from "@/lib/registry-utils";
import { FileTree } from "./FileTree";
import { CodeBlock } from "./CodeBlock";
import { Loader2 } from "lucide-react";

interface RegistryViewerProps {
  componentName: string;
  style?: string;
  className?: string;
}

export function RegistryViewer({
  componentName,
  style = "new-york",
  className,
}: RegistryViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<RegistryNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<RegistryNode | null>(null);

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

        // Generate the file tree
        const tree = generateRegistryTree(data);
        setFiles(tree);

        // Find the first file to select by default
        const firstFile = findFirstFile(tree);
        setSelectedFile(firstFile);
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
      className={`flex mt-4 border rounded-lg overflow-hidden h-[652px] not-prose ${className || ""}`}
    >
      {/* File browser sidebar */}
      <div className="w-64 grow-0 shrink-0 flex-0 border-r bg-muted/30 overflow-y-auto">
        <FileTree
          files={files}
          onSelect={setSelectedFile}
          selectedPath={selectedFile?.path}
        />
      </div>

      {/* Code display area */}
      {selectedFile?.content ? (
        <CodeBlock
          wrapperClassName="w-full"
          className="h-full max-w-none !w-full flex-1 font-mono text-xs rounded-none border-none"
          language={getLanguageFromFilename(selectedFile.name)}
          showLineNumbers={true}
          filename={selectedFile.path}
        >
          {selectedFile.content}
        </CodeBlock>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No file selected or file content unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}
