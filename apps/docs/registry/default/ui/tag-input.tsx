"use client";
import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { TagInput as EmblorTagInput } from "emblor";

interface TagInputProps {
  id: string;
  label: string;
  maxTags?: number;
}

export function TagInput({ id, label, maxTags = 5 }: TagInputProps) {
  const [tags, setTags] = useState<string[]>([]);

  const handleSetTags = (newTags: string[]) => {
    if (newTags.length <= maxTags) {
      setTags(newTags);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <EmblorTagInput
        id={id}
        tags={tags}
        setTags={handleSetTags}
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
      {tags.length >= maxTags && (
        <p className="text-sm text-red-500">
          You have reached the maximum number of tags ({maxTags}).
        </p>
      )}
    </div>
  );
}
