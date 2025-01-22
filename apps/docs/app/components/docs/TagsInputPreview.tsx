"use client";

import React from "react";
import { TagInput } from "@/app/components/ui/tag-input";

export default function TagsInputPreview() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pre-filled Tags</h3>
        <TagInput
          id="favoriteFruits"
          label="Favorite Fruits"
          initialTags={["apple", "banana"]}
          maxTags={5}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium  pt-4">Max tag limit</h3>
        <h4 className="text-sm text-gray-500 font-medium">
          You can enter max of 5 tags
        </h4>
        <TagInput id="favorite-fruits" label="Favorite Fruits" maxTags={5} />
      </div>
    </div>
  );
}
