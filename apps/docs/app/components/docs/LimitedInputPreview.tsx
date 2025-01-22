"use client";
import React from "react";
import LimitedInput from "@/app/components/ui/limited-input";

export default function LimitedInputPreview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Example 1: Basic Limited Input */}
      <LimitedInput
        label="Name"
        characterLimit={30}
        helperText="Enter your name"
        onChange={(value) => console.log("Name:", value)}
      />

      {/* Example 2: Email Field with Validation */}
      <LimitedInput
        label="Email"
        id="password"
        characterLimit={50}
        helperText="Please Provide you details in 50 characters"
        error="Details are required"
        onChange={(value) => console.log("Email:", value)}
      />

      {/* Example 3: Required Field */}
      <LimitedInput
        label="Username"
        id="username"
        characterLimit={15}
        required
        helperText="Username is required"
        onChange={(value) => console.log("Username:", value)}
      />
    </div>
  );
}
