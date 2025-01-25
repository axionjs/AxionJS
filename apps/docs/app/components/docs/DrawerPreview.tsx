"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";

export function SimpleDrawerPreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Simple Drawer</DrawerTitle>
          <DrawerDescription>
            This is a simple drawer with customizable content.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Place your custom content here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="default">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
