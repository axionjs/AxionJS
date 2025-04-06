"use client";

import React from "react";
import { Textarea } from "@/registry/new-york/ui/textarea";

export function DefaultTextareaPreview() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-medium">Default Textarea</h3>
      <Textarea placeholder="Type something..." />
    </div>
  );
}

export function TextareaWithLabelPreview() {
  return (
    <div className="max-w-md mx-auto space-y-4 not-prose">
      <h3 className="text-lg font-medium">
        Textarea with Label and Description
      </h3>
      <div>
        <label
          htmlFor="textarea-with-label"
          className="block text-sm font-medium text-foreground"
        >
          Your Message
        </label>
        <p className="text-sm text-muted-foreground">
          Please provide a detailed description of your issue.
        </p>
        <Textarea
          id="textarea-with-label"
          placeholder="Type your message here..."
          className="mt-2"
        />
      </div>
    </div>
  );
}
