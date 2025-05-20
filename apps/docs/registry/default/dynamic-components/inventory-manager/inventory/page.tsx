import { InventoryDataTable } from "@/registry/default/dynamic-components/inventory-manager/components/inventory-data-table";
import { CreateInventoryItem } from "@/registry/default/dynamic-components/inventory-manager/components/inventory-form";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { Suspense } from "react";

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <CreateInventoryItem />
      </div>

      <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
        <InventoryDataTable />
      </Suspense>
    </div>
  );
}
