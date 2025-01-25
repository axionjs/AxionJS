"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";

export default function AlertPreview() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Example 1: Default Alert */}
      <div>
        <h3 className="text-lg font-medium">Default Alert</h3>
        <Alert variant="default">
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This is a default alert.</AlertDescription>
        </Alert>
      </div>

      {/* Example 2: Destructive Alert */}
      <div>
        <h3 className="text-lg font-medium">Destructive Alert</h3>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>This is a destructive alert.</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
