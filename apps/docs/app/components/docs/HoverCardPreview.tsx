"use client";

import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/registry/new-york/ui/hover-card";
import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";

export function HoverCardPreview() {
  return (
    <div className="flex justify-center items-center h-[200px] space-x-6">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href="#" className="text-primary underline hover:no-underline">
            Hover over this link
          </Link>
        </HoverCardTrigger>
        <HoverCardContent>
          <h4 className="text-lg font-semibold">Hover Card</h4>
          <p className="text-sm text-muted-foreground">
            Learn more about this link by hovering over it!
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
