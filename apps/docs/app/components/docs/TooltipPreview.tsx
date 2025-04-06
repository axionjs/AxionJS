"use client";

import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/registry/new-york/ui/tooltip";

export function DefaultTooltipPreview() {
  return (
    <TooltipProvider className="not-prose">
      <div className="flex items-center justify-center space-x-4">
        <Tooltip>
          <TooltipTrigger className="px-4 py-2 bg-gray-100 border rounded-lg">
            Hover me
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>Default Tooltip</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function PlacementTooltipPreview() {
  const placements = ["top", "bottom", "left", "right"];

  return (
    <TooltipProvider className="not-prose">
      <div className="grid grid-cols-2 gap-8">
        {placements.map((placement) => (
          <Tooltip key={placement}>
            <TooltipTrigger className="px-4 py-2 bg-gray-100 border rounded-lg">
              Hover {placement}
            </TooltipTrigger>
            <TooltipContent side={placement} sideOffset={8}>
              <span>{`Tooltip on ${placement}`}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function StyledTooltipPreview() {
  return (
    <TooltipProvider className="not-prose">
      <div className="flex items-center justify-center space-x-4">
        <Tooltip>
          <TooltipTrigger className="px-4 py-2 bg-gray-100 border rounded-lg">
            Styled Tooltip
          </TooltipTrigger>
          <TooltipContent className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <span>Custom styled tooltip</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function InteractiveTooltipPreview() {
  return (
    <TooltipProvider className="not-prose">
      <div className="flex items-center justify-center space-x-4">
        <Tooltip>
          <TooltipTrigger className="px-4 py-2 bg-gray-100 border rounded-lg">
            Click Me
          </TooltipTrigger>
          <TooltipContent>
            <button
              onClick={() => alert("Button inside tooltip clicked!")}
              className="px-2 py-1 text-sm text-primary-foreground bg-white border rounded-md"
            >
              Click Me
            </button>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
