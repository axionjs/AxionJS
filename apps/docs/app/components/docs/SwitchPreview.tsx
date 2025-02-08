"use client";

import React, { useState } from "react";
import { Switch } from "@/registry/new-york/ui/switch";

export default function SwitchPreview() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Example 3: Custom Styling */}
      <div>
        <h3 className="text-lg font-medium">Normal Switch</h3>
        <Switch
          id="custom-switch"
          className="data-[state=checked]:bg-emerald-500"
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked)}
        />
        <label htmlFor="custom-switch" className="ml-4 text-sm">
          {isChecked ? "On" : "Off"}
        </label>
      </div>
      {/* Example 2: Disabled Switch */}
      <div>
        <h3 className="text-lg font-medium">Disabled Switch</h3>
        <Switch id="disabled-switch" disabled />
      </div>
    </div>
  );
}
