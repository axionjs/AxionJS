"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/registry/new-york/ui/skeleton";

// Always show skeleton
export function AlwaysSkeletonPreview() {
  return (
    <div className="flex flex-col items-start space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

// Skeleton with content loading after 2 seconds
export function TimedSkeletonPreview() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000); // Show content after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {loaded ? (
        <>
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div>
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      )}
    </div>
  );
}
