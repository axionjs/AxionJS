"use client";

import React, { useState } from "react";
import { Toggle } from "@/registry/new-york/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";

export function DefaultTogglePreview() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="space-y-4 max-w-md mx-auto not-prose">
      <h3 className="text-lg font-medium">Default Toggle</h3>
      <Toggle
        aria-label="Toggle Bold"
        pressed={isActive}
        onPressedChange={setIsActive}
      >
        {isActive ? "On" : "Off"}
      </Toggle>
    </div>
  );
}

export function IconTogglePreview() {
  return (
    <div className="space-y-4 max-w-md mx-auto not-prose">
      <h3 className="text-lg font-medium">Toggle with Icons</h3>
      <div className="flex gap-2">
        <Toggle aria-label="Bold">
          <Bold />
        </Toggle>
        <Toggle aria-label="Italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Underline">
          <Underline />
        </Toggle>
      </div>
    </div>
  );
}
