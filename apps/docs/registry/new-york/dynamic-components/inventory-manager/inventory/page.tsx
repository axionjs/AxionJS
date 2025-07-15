import { InventoryDataTable } from "@/registry/new-york/dynamic-components/inventory-manager/components/inventory-data-table";
import { CreateInventoryItem } from "@/registry/new-york/dynamic-components/inventory-manager/components/inventory-form";
import { Separator } from "@/registry/new-york/ui/separator";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { Package } from "lucide-react";
import { Suspense } from "react";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Inventory Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your inventory items and stock levels
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <CreateInventoryItem />
            </div>
          </div>
          <Separator />
        </div>

        {/* Data Table Section */}
        <div className="bg-card p-6 rounded-xl shadow-sm border overflow-hidden">
          <Suspense
            fallback={
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-12 w-full" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <InventoryDataTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
