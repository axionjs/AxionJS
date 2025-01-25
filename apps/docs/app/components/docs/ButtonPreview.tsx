"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";

export function ButtonPreview() {
  return (
    <div className="space-y-6">
      {/* Default Button */}
      <div>
        <Button>Default Button</Button>
      </div>
    </div>
  );
}
