import React, { useState, useEffect } from "react";
import { RegistryNode } from "@/types/registry";
import { FileTreeView } from "./FileTreeView";
import { CodeBlock } from "./CodeBlock";

interface RegistryCodeViewerProps {
  files: RegistryNode[];
  className?: string;
}

// Helper function to find the first file in the tree
function findFirstFile(nodes: RegistryNode[]): RegistryNode | null {
  for (const node of nodes) {
    if (node.type === "file") {
      return node;
    }
    if (node.children) {
      const foundFile = findFirstFile(node.children);
      if (foundFile) {
        return foundFile;
      }
    }
  }
  return null;
}

export function RegistryCodeViewer({
  files,
  className,
}: RegistryCodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<RegistryNode | null>(
    findFirstFile(files)
  );

  const handleFileSelect = (file: RegistryNode) => {
    if (file.type === "file") {
      setSelectedFile(file);
    }
  };

  // Determine language for syntax highlighting based on file extension
  function getLanguageFromFilename(filename: string): string {
    const extension = filename.split(".").pop()?.toLowerCase() || "";

    const extensionMap: Record<string, string> = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      css: "css",
      html: "html",
      json: "json",
      md: "markdown",
    };

    return extensionMap[extension] || "typescript";
  }

  return (
    <div
      className={`flex mt-4 border rounded-lg overflow-hidden h-[652px] not-prose ${className || ""}`}
    >
      {/* File browser sidebar */}
      <div className="w-64 grow-0 shrink-0 flex-0 border-r bg-muted/30 overflow-y-auto">
        <FileTreeView
          files={files}
          onFileSelect={handleFileSelect}
          selectedFilePath={selectedFile?.path}
        />
      </div>

      {/* Code display area */}
      {selectedFile?.content ? (
        <CodeBlock
          wrapperClassName="w-full"
          className="h-full max-w-none !w-full flex-1 font-mono text-xs rounded-none border-none"
          language={getLanguageFromFilename(selectedFile.name)}
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
