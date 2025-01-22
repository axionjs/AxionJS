"use client";

import React from "react";
import { Label } from "@/app/components/ui/label";

export default function LabelPreview() {
  return (
    <div className="space-y-6">
      {/* Example 1: Basic Label */}
      <div>
        <Label htmlFor="username">Simple Label</Label>
      </div>

      {/* Example 2: Label with Helper Text */}
      <div>
        <Label htmlFor="email" helperText="Enter your email address">
          Label with `helperText`
        </Label>
      </div>

      {/* Example 3: Label with Error */}
      <div>
        <Label
          htmlFor="password"
          error="Password is required"
          helperText="Your password must be at least 8 characters."
        >
          Password
        </Label>
      </div>

      {/* Example 4: Required Label */}
      <div>
        <Label htmlFor="phone" required>
          Phone Number
        </Label>
      </div>
    </div>
  );
}
