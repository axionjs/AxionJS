"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/registry/new-york/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

export function SimpleCollapsiblePreview() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="max-w-md min-w-md p-4 not-prose">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Collapsible Section</h4>
          <CollapsibleTrigger asChild>
            <ChevronsUpDown className="pt-2">
              {isOpen ? "Hide" : "Show"}
            </ChevronsUpDown>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-4 text-sm text-muted-foreground">
            This is some hidden content that becomes visible when the
            collapsible is open. You can add any content here, such as text,
            images, or custom components.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
