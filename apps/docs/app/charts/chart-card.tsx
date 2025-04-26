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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  SyntaxHighlighter,
  InstallCommand,
  convertTsToJs,
} from "./syntax-highlighting";

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
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{chartInfo.displayName}</DialogTitle>
              <DialogDescription>{chartInfo.description}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="typescript">
              <TabsList className="mb-4">
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="typescript">
                <SyntaxHighlighter
                  code={chartInfo.tsCode}
                  language="typescript"
                />
              </TabsContent>
              <TabsContent value="javascript">
                <SyntaxHighlighter
                  code={convertTsToJs(chartInfo.tsCode)}
                  language="javascript"
                />
              </TabsContent>
            </Tabs>
            <InstallCommand command={chartInfo.installCommand} />
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
