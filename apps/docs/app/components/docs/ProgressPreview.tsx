"use client";

import * as React from "react";
import { Progress } from "@/registry/new-york/ui/progress";

export function ProgressWithLabelPreview() {
  const [progress, setProgress] = React.useState(60);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4 not-prose">
      <h3 className="text-sm font-medium">Progress with Label</h3>
      <div className="flex items-center space-x-2">
        <Progress value={progress} />
        <span className="text-sm font-medium">{progress}%</span>
      </div>
    </div>
  );
}

export function MultiProgressPreview() {
  return (
    <div className="space-y-4 not-prose">
      <h3 className="text-sm font-medium">Multi-Progress</h3>
      <Progress value={30} />
      <Progress value={50} />
      <Progress value={90} />
    </div>
  );
}
