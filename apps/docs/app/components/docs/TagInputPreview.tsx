"use client";

import React, { useState } from "react";
import { TagInput } from "@/registry/new-york/ui/tag-input";

export function SimpleTagInputPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Simple Tag Input</h3>
      <TagInput id="simple-tag-input" label="Add Tags" maxTags={5} />
    </div>
  );
}

export function LimitedTagInputPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tag Input with Custom Limit</h3>
      <TagInput id="limited-tag-input" label="Add Tags (Max 3)" maxTags={3} />
    </div>
  );
}
