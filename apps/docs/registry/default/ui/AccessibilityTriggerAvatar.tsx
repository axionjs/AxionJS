"use client";

import React from "react";
import { useAccessibilityStore } from "@/registry/default/lib/accessibility-store";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/default/ui/avatar";
import { PersonStanding } from "lucide-react";

export function AccessibilityTriggerAvatar() {
  const { toggleOpen } = useAccessibilityStore();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      onClick={toggleOpen}
      title="Open Accessibility Menu"
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src="/some-avatar.png" alt="@accessibility" />
        <AvatarFallback>
          <PersonStanding />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
