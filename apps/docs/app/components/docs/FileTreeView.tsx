import React, { useState } from "react";
import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RegistryNode } from "@/types/registry";

interface FileTreeViewProps {
  files: RegistryNode[];
  onFileSelect: (file: RegistryNode) => void;
  selectedFilePath?: string;
  className?: string;
}

export function FileTreeView({
  files,
  onFileSelect,
  selectedFilePath,
  className,
}: FileTreeViewProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const renderNode = (node: RegistryNode, level = 0) => {
    const isDirectory = node.type === "directory";
    const isExpanded = expandedPaths.has(node.path);
    const isSelected = node.path === selectedFilePath;

    return (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center py-1 px-2 cursor-pointer hover:bg-muted/50 transition-colors",
            isSelected && "bg-muted text-primary",
            "rounded-md"
          )}
          style={{ paddingLeft: `${(level + 1) * 8}px` }}
          onClick={() => {
            if (isDirectory) {
              toggleExpand(node.path);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {isDirectory && (
            <span className="mr-1">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}
          <span className="mr-1.5">
            {isDirectory ? (
              isExpanded ? (
                <FolderOpen size={16} className="shrink-0" />
              ) : (
                <Folder size={16} className="shrink-0" />
              )
            ) : (
              <File size={16} className="shrink-0" />
            )}
          </span>
          <span className="text-sm truncate">{node.name}</span>
        </div>

        {isDirectory && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full py-2", className)}>
      {files.map((file) => renderNode(file))}
    </div>
  );
}
