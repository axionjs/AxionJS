"use client";

import React from "react";
import { Badge } from "@/registry/new-york/ui/badge";

export function BadgePreview() {
  return (
    <div className="flex flex-col gap-4">
      {/* Default Badge */}
      <div>
        <Badge>Default Badge</Badge>
      </div>
    </div>
  );
}
