"use client";

import { useState } from "react";
import { Code } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import { RegistryViewerSingle } from "@/app/components/docs/RegistryViewerSinlge";
import { CommandViewer } from "@/app/components/docs/CommandViewer";

export function ChartCard({ chartInfo }) {
  const ChartComponent = chartInfo.component;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 shadow backdrop-blur-sm dark:bg-slate-900/80"
            >
              <Code className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{chartInfo.displayName}</DialogTitle>
              <DialogDescription>{chartInfo.description}</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-hidden">
              <RegistryViewerSingle
                componentName={chartInfo.name}
                style="new-york"
                className="h-full"
              />
            </div>
            <div className="mt-4">
              <CommandViewer command={chartInfo.installCommand} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-hidden rounded-lg border bg-background ">
        <ChartComponent />
      </div>
    </div>
  );
}

// Create a component to display the chart metadata and registration commands
export function ChartComponentRegistry({ components }) {
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
            {components.map((chart) => (
              <tr key={chart.name} className="border-b">
                <td className="py-2">{chart.displayName}</td>
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {chart.installCommand}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(chart.installCommand);
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
