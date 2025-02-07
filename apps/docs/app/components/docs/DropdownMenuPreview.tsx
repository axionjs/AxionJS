"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/registry/new-york/ui/dropdown-menu";
import { Button } from "@/registry/new-york/ui/button";

export function BasicDropdownPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Open Dropdown</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
            <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CheckboxDropdownPreview() {
  const [selections, setSelections] = useState<Record<string, boolean>>({
    Option1: false,
    Option2: false,
    Option3: false,
  });

  const toggleSelection = (option: string) => {
    setSelections((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Checkbox Dropdown</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(selections).map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selections[option]}
            onCheckedChange={() => toggleSelection(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TimezoneDropdownPreview() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Select Timezone</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={selectedTimezone}
          onValueChange={setSelectedTimezone}
        >
          <DropdownMenuRadioItem value="UTC">UTC</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="GMT">GMT</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PST">PST</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EST">EST</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
