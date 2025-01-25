"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";

// Single Button to Open Sheet
export function SingleButtonSheetPreview() {
  return (
    <Sheet>
      <SheetTrigger className="btn btn-primary">Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is an example of a sheet with a single button trigger.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <p>Place your content here. Sheets are great for side menus!</p>
        </div>
        <SheetFooter>
          <button className="btn btn-secondary">Close</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Four Buttons to Open Sheet from Top, Left, Bottom, and Right
export function MultiButtonSheetPreview() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Sheet>
        <SheetTrigger className="btn btn-primary">Open Top</SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the top.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger className="btn btn-primary">Open Left</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger className="btn btn-primary">Open Bottom</SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the bottom.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger className="btn btn-primary">Open Right</SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
