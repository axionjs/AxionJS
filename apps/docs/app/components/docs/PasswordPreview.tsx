"use client";

import React, { useState } from "react";
import PasswordInput from "@/app/components/ui/password-input";

export default function PasswordPreview() {
  const [password, setPassword] = useState<string>("");

  return (
    <div className="space-y-6">
      <div>
        <PasswordInput
          value={password}
          onChange={setPassword}
          error={password.length < 8 ? "Password is too short" : undefined}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium">Strong Password Example</h3>
        <PasswordInput
          value={"StrongPassword1!"}
          onChange={(val) => console.log(val)}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium">Weak Password Example</h3>
        <PasswordInput value={"weak"} onChange={(val) => console.log(val)} />
      </div>
    </div>
  );
}
