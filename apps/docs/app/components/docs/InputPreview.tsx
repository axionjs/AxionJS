"use client";

import React from "react";
import { Input } from "@/app/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function InputSimplePreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Input id="simple-input" type="text" placeholder="Enter your name" />
    </div>
  );
}

export function InputPasswordPreview() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-4 max-w-md">
      <Input
        id="password-input"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        endIcon={
          showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className="cursor-pointer size-4"
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(true)}
              className="cursor-pointer size-4"
            />
          )
        }
      />
    </div>
  );
}

export function InputErrorPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <Input
        id="error-input"
        type="text"
        placeholder="Enter your email"
        variant="error"
        error="Invalid email address"
      />
    </div>
  );
}
