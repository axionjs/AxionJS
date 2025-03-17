"use client";

import * as React from "react";
import { usePagination } from "@/registry/new-york/hooks/use-pagination";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";
import { Label } from "@/registry/new-york/ui/label";

interface Item {
  id: number;
  name: string;
  status: "pending" | "processing" | "completed" | "failed";
}

export function PaginationPreview() {
  const totalItems = 87;
  const pageSize = 10;

  const {
    currentPage,
    totalPages,
    pageItems,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    goToPage,
    canPreviousPage,
    canNextPage,
  } = usePagination({
    totalItems,
    pageSize,
    siblingCount: 1,
  });

  // Generate items for the current page
  const currentItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return Array.from({ length: endIndex - startIndex }, (_, i) => {
      const itemId = startIndex + i + 1;
      const statuses = ["pending", "processing", "completed", "failed"];
      const status = statuses[itemId % statuses.length] as
        | "pending"
        | "processing"
        | "completed"
        | "failed";

      return {
        id: itemId,
        name: `Item ${itemId}`,
        status,
      };
    });
  }, [currentPage, pageSize, totalItems]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <Badge
                  variant={
                    item.status === "completed"
                      ? "success"
                      : item.status === "failed"
                        ? "destructive"
                        : item.status === "processing"
                          ? "default"
                          : "outline"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={firstPage}
              disabled={!canPreviousPage}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center">
              {pageItems.map((page, i) => (
                <React.Fragment key={i}>
                  {page === -1 ? (
                    <span className="px-2 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0 mx-0.5"
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={lastPage}
              disabled={!canNextPage}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function TablePaginationPreview() {
  const [pageSize, setPageSize] = React.useState(5);
  const totalItems = 42;

  const {
    currentPage,
    totalPages,
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    goToPage,
    canPreviousPage,
    canNextPage,
  } = usePagination({
    totalItems,
    pageSize,
    siblingCount: 0,
  });

  // Generate items for the current page
  const currentItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    return Array.from({ length: endIndex - startIndex }, (_, i) => {
      const itemId = startIndex + i + 1;
      return {
        id: itemId,
        name: `Product ${itemId}`,
        price: Math.floor(Math.random() * 100) + 10,
        stock: Math.floor(Math.random() * 50),
      };
    });
  }, [currentPage, pageSize, totalItems]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y">
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2 font-medium">{item.name}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div>
            <Label htmlFor="page-size" className="mr-2">
              Items per page
            </Label>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger id="page-size" className="w-16 h-8">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={firstPage}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm px-2">{currentPage}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={lastPage}
            disabled={!canNextPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
