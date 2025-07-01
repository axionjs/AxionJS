"use client";

import React from "react";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "@/registry/new-york/ui/context-menu";

export function ContextMenuPreview() {
  return (
    <ContextMenu className="not-prose">
      <ContextMenuTrigger>
        <Card className="w-96 text-center ">
          <CardContent>
            <p className="text-muted-foreground">
              Right-click anywhere on this card
            </p>
          </CardContent>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuLabel>Options</ContextMenuLabel>
        <ContextMenuItem onClick={() => alert("Profile clicked")}>
          Profile
        </ContextMenuItem>
        <ContextMenuItem onClick={() => alert("Settings clicked")}>
          Settings
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked
          onCheckedChange={() => alert("Dark mode toggled")}
        >
          Dark Mode
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="English">
          <ContextMenuLabel>Language</ContextMenuLabel>
          <ContextMenuRadioItem value="English">English</ContextMenuRadioItem>
          <ContextMenuRadioItem value="Spanish">Spanish</ContextMenuRadioItem>
          <ContextMenuRadioItem value="French">French</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
