"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

import { InventoryContext } from "@/registry/default/dynamic-components/inventory-manager/lib/context";
import { Button } from "@/registry/default/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { DataTable } from "./data-table";
import { useInventoryDataTable } from "@/registry/default/dynamic-components/inventory-manager/hooks/use-inventory-data-table";

export function InventoryDataTable() {
  const {
    data,
    pageCount,
    totalItems,
    lowStockCount,
    isLoading,
    isPending,
    columns,
    pageIndex,
    pageSize,
    nameFilter,
    categoryFilter,
    lowStockOnly,
    handlePaginationChange,
    handleNameFilterChange,
    handleCategoryFilterChange,
    toggleLowStockFilter,
    contextValue,
    refreshData,
  } = useInventoryDataTable();
  return (
    <InventoryContext.Provider value={contextValue}>
      <div>
        {lowStockCount > 0 && (
          <Alert
            variant="destructive"
            className="mb-4 cursor-pointer"
            onClick={toggleLowStockFilter}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Stock Alert</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>
                {lowStockCount} {lowStockCount === 1 ? "item" : "items"} in your
                inventory {lowStockCount === 1 ? "is" : "are"} running low on
                stock.
              </span>
              <Button
                variant="destructive"
                size="sm"
                className="ml-2 border-primary text-secondary hover:text-white hover:bg-red-600"
              >
                {lowStockOnly ? "Show All Items" : "View Low Stock Items"}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {lowStockOnly && (
          <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
              <span>Showing low stock items only</span>
            </div>
            <Button variant="outline" size="sm" onClick={toggleLowStockFilter}>
              Show All Items
            </Button>
          </div>
        )}

        <div className="flex items-center py-4 gap-2">
          <div className="flex-1">
            <Input
              placeholder="Filter by name..."
              value={nameFilter}
              onChange={(e) => handleNameFilterChange(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="w-[180px]">
            <Select
              value={categoryFilter || "all"}
              onValueChange={handleCategoryFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="h-[400px] w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            pageCount={pageCount}
            pageSize={pageSize}
            pageIndex={pageIndex}
            totalItems={totalItems}
            onPaginationChange={handlePaginationChange}
            onRefresh={refreshData}
            isRefreshing={isPending}
          />
        )}
      </div>
    </InventoryContext.Provider>
  );
}
