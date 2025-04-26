"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { Tag, TagInput as EmblorTagInput } from "emblor";

interface TagInputProps {
  id: string;
  label?: string;
  maxTags?: number;
  placeholder?: string;
  inlineTags?: boolean;
  inputFieldPosition?: "top" | "bottom" | "inline";
  initialTags?: Tag[];
}

export function TagInput({
  id,
  label,
  maxTags = 5,
  placeholder = "Add a tag",
  inlineTags = true,
  inputFieldPosition = "inline",
  initialTags = [],
}: TagInputProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const handleSetTags = (newTags: Tag[]) => {
    if (newTags.length <= maxTags) {
      setTags(newTags);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <EmblorTagInput
        id={id}
        tags={tags}
        setTags={handleSetTags}
        placeholder={placeholder}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={inlineTags}
        inputFieldPosition={inputFieldPosition}
        styleClasses={{
          inlineTagsContainer:
            "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
          input:
            "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7 rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70",
          tagList: {
            container: "gap-1",
          },
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
      {!inlineTags && (
        <p className="text-sm text-muted-foreground">
          {tags.length}/{maxTags} tags added
        </p>
      )}
    </div>
  );
}
