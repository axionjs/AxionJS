"use client";

import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";

export function DefaultScrollAreaPreview() {
  return (
    <ScrollArea className="h-40 w-60 border rounded not-prose">
      <div className="p-4">
        <p>This is a scrollable container.</p>
        <p>Use the scrollbar to view the overflowing content.</p>
        {[...Array(10)].map((_, i) => (
          <p key={i}>Content line {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  );
}

export function HorizontalScrollAreaPreview() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border not-prose">
      <div className="flex space-x-4 p-4">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="flex-none h-16 w-16 bg-gray-200 rounded text-center flex items-center justify-center"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function StyledScrollAreaPreview() {
  return (
    <ScrollArea className="h-40 w-60 border rounded bg-gray-50 not-prose">
      <div className="p-4">
        <p>Styled scrollable container.</p>
        {[...Array(15)].map((_, i) => (
          <p key={i} className="text-sm text-gray-700">
            Content line {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}

export function ScrollAreaWithCustomBarPreview() {
  return (
    <ScrollArea className="h-40 w-60 border rounded">
      <div className="p-4">
        <p>Custom scrollbar styles are applied here.</p>
        {[...Array(10)].map((_, i) => (
          <p key={i}>Content line {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  );
}

export function LargeContentScrollAreaPreview() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king's pillow, in his soup,
      even in the royal toilet. The king was furious, but he couldn't seem to
      stop Jokester. And then, one day, the people of the kingdom discovered
      that the jokes left by Jokester were so funny that they couldn't help but
      laugh. And once they started laughing, they couldn't stop.
    </ScrollArea>
  );
}
