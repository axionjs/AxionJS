"use client";

import * as React from "react";
import { useInfiniteScroll } from "@/registry/new-york/hooks/use-infinite-scroll";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { Badge } from "@/registry/new-york/ui/badge";

interface Item {
  id: number;
  title: string;
  description: string;
}

export function InfiniteScrollPreview() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  // Function to load more items
  const loadMore = React.useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from({ length: 3 }, (_, i) => ({
        id: (page - 1) * 3 + i + 1,
        title: `Item ${(page - 1) * 3 + i + 1}`,
        description: `This is the description for item ${(page - 1) * 3 + i + 1}`,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setIsLoading(false);

      // Stop after 4 pages (12 items) for this example
      if (page >= 4) {
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, page, hasMore]);

  // Load initial items
  React.useEffect(() => {
    loadMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Ref for the sentinel element (last item)
  const sentinelRef = useInfiniteScroll(loadMore);

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-md p-4">
        {items.map((item) => (
          <Card key={item.id} className="w-full">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <Badge variant="outline">ID: {item.id}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}

        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Sentinel element for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-1" />}

        {!hasMore && (
          <p className="text-center text-muted-foreground py-2 text-sm">
            No more items to load
          </p>
        )}
      </div>
    </div>
  );
}

export function SimpleInfiniteScrollPreview() {
  const [items, setItems] = React.useState<number[]>([1, 2, 3, 4, 5]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const loadMore = React.useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const lastItem = items[items.length - 1] || 0;
      const newItems = Array.from({ length: 5 }, (_, i) => lastItem + i + 1);

      setItems((prev) => [...prev, ...newItems]);
      setIsLoading(false);

      // Stop after 25 items for this example
      if (items.length + newItems.length >= 25) {
        setHasMore(false);
      }
    }, 800);
  }, [isLoading, items, hasMore]);

  // Ref for the sentinel element
  const sentinelRef = useInfiniteScroll(loadMore);

  return (
    <div className="border rounded-md p-4">
      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
        {items.map((item) => (
          <div key={item} className="p-4 border rounded-md bg-card">
            Item {item}
          </div>
        ))}

        {isLoading && (
          <div className="py-4 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {/* Sentinel element for infinite scroll */}
        {hasMore && <div ref={sentinelRef} className="h-1" />}

        {!hasMore && (
          <p className="text-center text-sm text-muted-foreground py-2">
            End of list
          </p>
        )}
      </div>
    </div>
  );
}
