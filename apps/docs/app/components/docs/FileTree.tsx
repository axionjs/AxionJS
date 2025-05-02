import React, { useState, useEffect } from "react";
import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { RegistryNode } from "@/types/registry";
import { cn } from "@/lib/utils";

interface FileTreeProps {
  files: RegistryNode[];
  onSelect: (file: RegistryNode) => void;
  selectedPath?: string;
  className?: string;
}

export function FileTree({
  files,
  onSelect,
  selectedPath,
  className,
}: FileTreeProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // Initially expand all directory nodes for better discoverability
  useEffect(() => {
    const allDirPaths = new Set<string>();

    const findAllDirs = (nodes: RegistryNode[], parentPath = "") => {
      for (const node of nodes) {
        if (node.type === "directory") {
          allDirPaths.add(node.path);
          if (node.children) {
            findAllDirs(node.children, node.path);
          }
        }
      }
    };

    findAllDirs(files);
    setExpandedPaths(allDirPaths);
  }, [files]);

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
    const isSelected = node.path === selectedPath;

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
              onSelect(node);
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
