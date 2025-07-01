"use client";

import { useState } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { CommandViewer } from "@/app/components/docs/CommandViewer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { RegistryViewer } from "@/app/components/docs/RegistryViewer";

interface BlockInfo {
  name: string;
  component: React.ComponentType;
  displayName: string;
  description: string;
  installCommand: string;
}

export function BlockCard({ blockInfo }: { blockInfo: BlockInfo }) {
  const BlockComponent = blockInfo.component;
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  // Determine container styles dynamically based on viewport setting
  const getContainerStyles = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-[375px] mx-auto overflow-hidden rounded-md";
      case "tablet":
        return "max-w-[768px] mx-auto overflow-hidden rounded-md";
      case "desktop":
      default:
        return "w-full overflow-hidden rounded-md";
    }
  };

  return (
    <div className="mb-16 transition-all duration-300">
      <div className="border rounded-lg overflow-hidden bg-background dark:bg-gray-950">
        {/* Block header with component name and command */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold">{blockInfo.displayName}</h3>
            <p className="text-sm text-muted-foreground">
              {blockInfo.description}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <CommandViewer
              command={blockInfo.installCommand}
              className="w-full"
            />
          </div>
        </div>

        {/* Component section with tabs */}
        <Tabs defaultValue="preview" className="p-4">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            {/* Viewport controls for preview */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("mobile")}
                className={`${
                  viewMode === "mobile" ? "bg-primary/10 text-primary" : ""
                }`}
                aria-label="Switch to mobile view"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("tablet")}
                className={`${
                  viewMode === "tablet" ? "bg-primary/10 text-primary" : ""
                }`}
                aria-label="Switch to tablet view"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("desktop")}
                className={`${
                  viewMode === "desktop" ? "bg-primary/10 text-primary" : ""
                }`}
                aria-label="Switch to desktop view"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="preview" className="mt-2">
            <div
              className={`flex items-center justify-center rounded-md p-6 min-h-[500px] bg-gray-100 dark:bg-gray-900 ${getContainerStyles()}`}
            >
              <div className="w-full">
                {BlockComponent ? (
                  <BlockComponent />
                ) : (
                  <div>Error: Component not available</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-2">
            <div
              className="border rounded-md overflow-hidden"
              style={{ height: "500px" }}
            >
              <RegistryViewer
                componentName={blockInfo.name}
                style="new-york"
                className="h-full"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Create a component to display the block metadata and registration commands
export function BlockComponentRegistry({ components }) {
  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold">Available Components</h2>
      <div className="rounded-lg border bg-muted/40 p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Component Name</th>
              <th className="py-2 text-left">Install Command</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.name} className="border-b">
                <td className="py-2">{component.displayName}</td>
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {component.installCommand}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(component.installCommand);
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
