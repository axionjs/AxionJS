"use client";

import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/new-york/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export function SingleSelectToggleGroupPreview() {
  return (
    <div className="space-y-4 max-w-md mx-auto not-prose">
      <h3 className="text-lg font-medium">Single Select Toggle Group</h3>
      <ToggleGroup
        type="single"
        defaultValue="bold"
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function MultiSelectToggleGroupPreview() {
  return (
    <div className="space-y-4 max-w-md mx-auto not-prose">
      <h3 className="text-lg font-medium">Multi Select Toggle Group</h3>
      <ToggleGroup
        type="multiple"
        defaultValue={["bold", "italic"]}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
