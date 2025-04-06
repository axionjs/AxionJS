"use client";

import * as React from "react";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Badge } from "@/registry/new-york/ui/badge";

interface Item {
  id: number;
  name: string;
  description: string;
}

export function VirtualListPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  // Listen for scroll events to simulate virtual list
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate a large list of items
  const allItems = React.useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `This is the description for item ${i + 1}. It contains some information about the item.`,
    }));
  }, []);

  const [filter, setFilter] = React.useState("");

  // Filter items based on search input
  const filteredItems = React.useMemo(() => {
    if (!filter) return allItems;

    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [allItems, filter]);

  // Virtual list configuration
  const itemHeight = 80; // Height of each item in pixels
  const containerHeight = 300; // Height of the viewport
  const overscan = 5; // Number of items to render outside of the visible area

  // Calculate range of items to render
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan;
  const endIndex = Math.min(
    filteredItems.length - 1,
    startIndex + visibleCount - 1
  );

  // Extract visible items
  const visibleItems = React.useMemo(() => {
    return filteredItems.slice(startIndex, endIndex + 1).map((item) => ({
      item,
      index: filteredItems.indexOf(item),
      start: filteredItems.indexOf(item) * itemHeight,
      size: itemHeight,
    }));
  }, [filteredItems, startIndex, endIndex, itemHeight]);

  // Calculate total height
  const totalHeight = filteredItems.length * itemHeight;

  return (
    <div className="space-y-4 not-prose">
      <div className="space-y-2">
        <Label htmlFor="filter">Search Items</Label>
        <Input
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter items..."
        />
      </div>

      <div className="border rounded-md">
        <div className="bg-muted/50 p-2 text-sm">
          <span className="font-medium">
            Total items: {filteredItems.length}
          </span>
          <span className="text-muted-foreground ml-2 text-xs">
            (Only {visibleItems.length} rendered in DOM)
          </span>
        </div>

        <div ref={containerRef} className="h-[300px] overflow-auto relative">
          <div style={{ height: `${totalHeight}px`, position: "relative" }}>
            {visibleItems.map((virtualItem) => (
              <div
                key={virtualItem.item.id}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${virtualItem.start}px)`,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  padding: "0.5rem",
                }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{virtualItem.item.name}</h3>
                      <Badge variant="outline">#{virtualItem.item.id}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {virtualItem.item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GridVirtualListPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  // Listen for scroll events
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Virtual grid configuration
  const itemHeight = 100; // Height of each row
  const itemsPerRow = 3; // Number of items per row
  const containerHeight = 400; // Height of the viewport
  const totalItems = 999; // Total number of items

  // Calculate total rows and heights
  const totalRows = Math.ceil(totalItems / itemsPerRow);
  const totalHeight = totalRows * itemHeight;

  // Calculate which rows to render
  const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
  const visibleRowCount = Math.ceil(containerHeight / itemHeight) + 2;
  const endRow = Math.min(totalRows - 1, startRow + visibleRowCount);

  // Calculate item range
  const startIndex = startRow * itemsPerRow;
  const endIndex = Math.min(totalItems - 1, (endRow + 1) * itemsPerRow - 1);

  // Colors for items
  const colors = [
    "#FFC0CB",
    "#FFB6C1",
    "#FF69B4",
    "#FF1493",
    "#DB7093",
    "#C71585",
    "#DA70D6",
    "#D8BFD8",
    "#DDA0DD",
  ];

  return (
    <div className="space-y-4 not-prose">
      <div className="border rounded-md">
        <div className="bg-muted/50 p-2 text-sm">
          <span className="font-medium">Virtual Grid</span>
          <span className="text-muted-foreground ml-2 text-xs">
            (Showing {endIndex - startIndex + 1} of {totalItems} items)
          </span>
        </div>

        <div ref={containerRef} className="h-[400px] overflow-auto relative">
          <div style={{ height: `${totalHeight}px`, position: "relative" }}>
            {Array.from({ length: endRow - startRow + 1 }).map(
              (_, rowOffset) => {
                const rowIndex = startRow + rowOffset;
                const rowStartIndex = rowIndex * itemsPerRow;

                return (
                  <div
                    key={rowIndex}
                    style={{
                      position: "absolute",
                      top: `${rowIndex * itemHeight}px`,
                      left: 0,
                      width: "100%",
                      height: `${itemHeight}px`,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "0.5rem",
                      padding: "0.5rem",
                    }}
                  >
                    {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
                      const itemIndex = rowStartIndex + colIndex;
                      if (itemIndex >= totalItems) return null;

                      // Get color based on item index
                      const colorIndex = itemIndex % colors.length;

                      return (
                        <div
                          key={colIndex}
                          className="rounded-md flex items-center justify-center"
                          style={{
                            backgroundColor: colors[colorIndex],
                            color: colorIndex > 2 ? "white" : "black",
                          }}
                        >
                          Item {itemIndex + 1}
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
