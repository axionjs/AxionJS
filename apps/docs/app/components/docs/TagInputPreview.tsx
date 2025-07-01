"use client";

import React, { useId, useState } from "react";
import { Tag, TagInput } from "emblor";
import { Label } from "@/registry/new-york/ui/label";

// Common initial tags for demonstrations
const initialTags = [
  {
    id: "1",
    text: "React",
  },
  {
    id: "2",
    text: "NextJS",
  },
  {
    id: "3",
    text: "TypeScript",
  },
];

// Example 1: Simple Tag Input with minimal configuration
export function SimpleTagInputPreview() {
  const id = useId();
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <div className="space-y-4 p-4 border rounded-lg not-prose">
      <h3 className="text-lg font-medium">Simple Tag Input</h3>
      <TagInput
        id={id}
        tags={tags}
        setTags={setTags}
        placeholder="Add a tag"
        styleClasses={{
          inlineTagsContainer:
            "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
          input:
            "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
          tag: {
            body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
      />
    </div>
  );
}

// Example 2: Tag Input with Custom Limit
export function LimitedTagInputPreview() {
  const id = useId();
  const maxTags = 3;
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <div className="space-y-4 p-4 border rounded-lg not-prose">
      <h3 className="text-lg font-medium">Tag Input with Custom Limit</h3>
      <TagInput
        id={id}
        tags={tags}
        setTags={(newTags) => {
          if (newTags.length <= maxTags) {
            setTags(newTags);
          }
        }}
        placeholder="Add a tag (Max 3)"
        styleClasses={{
          inlineTagsContainer:
            "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
          input:
            "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
          tag: {
            body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
      />
      <p className="text-sm text-muted-foreground">
        {tags.length}/{maxTags} tags added
      </p>
      {tags.length >= maxTags && (
        <p className="text-sm text-red-500">
          You have reached the maximum number of tags ({maxTags}).
        </p>
      )}
    </div>
  );
}

// Example 3: Advanced Tag Input with Stacked Layout
export function AdvancedTagInputPreview() {
  const id = useId();
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 p-4 border rounded-lg not-prose">
      <h3 className="text-lg font-medium">Advanced Tag Input (Stacked)</h3>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Input with tags</Label>
        <TagInput
          id={id}
          tags={tags}
          setTags={setTags}
          placeholder="Add a tag"
          styleClasses={{
            tagList: {
              container: "gap-1",
            },
            input:
              "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            tag: {
              body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              closeButton:
                "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
            },
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
          inlineTags={false}
          inputFieldPosition="top"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Tags appear in a list below the input field
        </p>
      </div>
    </div>
  );
}
