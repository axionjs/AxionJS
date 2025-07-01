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

  // Initially expand directories up to level 2 for better discoverability
  useEffect(() => {
    const allDirPaths = new Set<string>();

    const findAllDirs = (nodes: RegistryNode[], level = 0) => {
      for (const node of nodes) {
        if (node.type === "directory" && level < 2) {
          allDirPaths.add(node.path);
          if (node.children) {
            findAllDirs(node.children, level + 1);
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

  const renderNode = (
    node: RegistryNode,
    level = 0,
    isLast = false,
    parentLines: boolean[] = []
  ) => {
    const isDirectory = node.type === "directory";
    const isExpanded = expandedPaths.has(node.path);
    const isSelected = node.path === selectedPath;
    const indentSize = 20;

    return (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center py-1.5 px-2 cursor-pointer group transition-all duration-200",
            "hover:bg-accent/60 hover:border-l-2 hover:border-primary/30",
            isSelected &&
              "bg-accent border-l-2 border-primary text-accent-foreground font-medium",
            "relative"
          )}
          onClick={() => {
            if (isDirectory) {
              toggleExpand(node.path);
            } else {
              onSelect(node);
            }
          }}
        >
          {/* Vertical lines for tree structure */}
          <div className="absolute left-0 top-0 bottom-0 flex">
            {parentLines.map((showLine, index) => (
              <div
                key={index}
                className="relative"
                style={{ width: `${indentSize}px` }}
              >
                {showLine && (
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-border opacity-40" />
                )}
              </div>
            ))}
            {level > 0 && (
              <div className="relative" style={{ width: `${indentSize}px` }}>
                {/* Vertical line */}
                <div
                  className="absolute left-2 top-0 w-px bg-border opacity-40"
                  style={{ height: isLast ? "50%" : "100%" }}
                />
                {/* Horizontal line */}
                <div className="absolute left-2 top-1/2 w-3 h-px bg-border opacity-40" />
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="flex items-center"
            style={{
              marginLeft: `${
                level * indentSize + (level > 0 ? indentSize : 0)
              }px`,
            }}
          >
            {isDirectory && (
              <div
                className={cn(
                  "mr-1 p-0.5 rounded transition-colors",
                  "group-hover:bg-accent-foreground/10"
                )}
              >
                {isExpanded ? (
                  <ChevronDown size={14} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={14} className="text-muted-foreground" />
                )}
              </div>
            )}

            <div
              className={cn(
                "mr-2 p-0.5 rounded transition-colors",
                isSelected && "text-primary",
                "group-hover:text-primary"
              )}
            >
              {isDirectory ? (
                isExpanded ? (
                  <FolderOpen size={16} className="shrink-0" />
                ) : (
                  <Folder size={16} className="shrink-0" />
                )
              ) : (
                <File
                  size={16}
                  className="shrink-0 text-muted-foreground group-hover:text-foreground"
                />
              )}
            </div>

            <span
              className={cn(
                "text-sm truncate transition-colors",
                isSelected
                  ? "text-accent-foreground font-medium"
                  : "text-foreground",
                "group-hover:text-foreground"
              )}
            >
              {node.name}
            </span>
          </div>
        </div>

        {isDirectory && isExpanded && node.children && (
          <div className="relative">
            {node.children.map((child, index) => {
              const isChildLast = index === node.children!.length - 1;
              const newParentLines = [...parentLines, !isLast];
              return renderNode(child, level + 1, isChildLast, newParentLines);
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full py-2 text-sm", className)}>
      <div className="space-y-0.5">
        {files.map((file, index) => {
          const isLast = index === files.length - 1;
          return renderNode(file, 0, isLast);
        })}
      </div>
    </div>
  );
}
