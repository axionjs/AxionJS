"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/new-york/ui/popover";
import { Button } from "@/registry/new-york/ui/button";

export function SimplePopoverPreview() {
  return (
    <div className="flex justify-center items-center h-64 not-prose">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={8} align="center">
          <p className="text-sm">
            This is a simple popover content. You can include any text, links,
            or even custom components here.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
