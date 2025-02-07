"use client";

import React, { useState } from "react";
import LimitedInput from "@/registry/new-york/ui/limited-input";

export function SimpleLimitedInputPreview() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Simple Limited Input</h3>
      <LimitedInput
        value={value}
        onChange={setValue}
        characterLimit={20}
        placeholder="Type something..."
      />
    </div>
  );
}

export function ValidatedLimitedInputPreview() {
  const [value, setValue] = useState("");
  const isValid = value.length >= 5;
  const error = !isValid
    ? "Input must be at least 5 characters long."
    : undefined;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Validated Limited Input</h3>
      <LimitedInput
        label="Validated Input"
        helperText="Please enter at least 5 characters."
        value={value}
        onChange={setValue}
        characterLimit={30}
        required
        error={error}
        placeholder="Enter your text here..."
      />
    </div>
  );
}
