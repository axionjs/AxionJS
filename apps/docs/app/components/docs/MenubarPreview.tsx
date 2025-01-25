"use client";

import React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
} from "@/app/components/ui/menubar";

export function SimpleMenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File</MenubarItem>
          <MenubarItem>Open...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Save</MenubarItem>
          <MenubarItem>Save As...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function CheckboxMenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Show Status Bar</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function RadioMenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Sort By</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Sort Options</MenubarLabel>
          <MenubarRadioGroup value="name">
            <MenubarRadioItem value="name">Name</MenubarRadioItem>
            <MenubarRadioItem value="date">Date Modified</MenubarRadioItem>
            <MenubarRadioItem value="size">File Size</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
