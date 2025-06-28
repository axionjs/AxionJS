"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
} from "@/registry/default/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCrudTable } from "@/registry/default/dynamic-components/simple-crud-table/hooks/use-crud-table";
import { useState } from "react";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { Loader2 } from "lucide-react";

export function SimpleCrudTable() {
  const {
    data,
    loading,
    error,
    page,
    pageSize,
    sortConfig,
    setPage,
    handleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    operationLoading,
  } = useCrudTable();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number;
    stock: number;
  }>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const totalPages = Math.ceil(data.totalCount / pageSize);

  const startEditing = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: Number(product.price),
      stock: product.stock,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
    });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await handleUpdate({ id: editingId, ...formData });
    } else {
      await handleCreate(formData);
    }
    cancelEditing();
  };

  const TableSkeleton = () => (
    <>
      {Array.from({ length: pageSize }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[60px] ml-auto" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[40px] ml-auto" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-16" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="space-y-4">
      {/* Create/Edit Form */}
      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="flex-1 min-w-[200px]"
          disabled={operationLoading.creating || operationLoading.updating}
        />
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="flex-1 min-w-[200px]"
          disabled={operationLoading.creating || operationLoading.updating}
        />
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: parseFloat(e.target.value) || 0,
            })
          }
          className="w-[120px]"
          disabled={operationLoading.creating || operationLoading.updating}
        />
        <Input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: parseInt(e.target.value) || 0,
            })
          }
          className="w-[120px]"
          disabled={operationLoading.creating || operationLoading.updating}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={operationLoading.creating || operationLoading.updating}
          >
            {(operationLoading.creating || operationLoading.updating) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={cancelEditing}
              disabled={operationLoading.updating}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Product Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.field === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer text-right hover:bg-muted/50 transition-colors"
              onClick={() => handleSort("price")}
            >
              Price{" "}
              {sortConfig.field === "price" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right hover:bg-muted/50 transition-colors"
              onClick={() => handleSort("stock")}
            >
              Stock{" "}
              {sortConfig.field === "stock" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableSkeleton />
          ) : (
            data.products.map((product) => (
              <TableRow
                key={product.id}
                className={`transition-all duration-200 ${
                  operationLoading.deleting === product.id
                    ? "opacity-50 bg-destructive/10"
                    : "hover:bg-muted/50"
                }`}
              >
                <TableCell>
                  {operationLoading.updating === product.id ? (
                    <Skeleton className="h-4 w-[120px]" />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {operationLoading.updating === product.id ? (
                    <Skeleton className="h-4 w-[200px]" />
                  ) : (
                    product.description
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {operationLoading.updating === product.id ? (
                    <Skeleton className="h-4 w-[60px] ml-auto" />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {operationLoading.updating === product.id ? (
                    <Skeleton className="h-4 w-[40px] ml-auto" />
                  ) : (
                    product.stock
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(product)}
                    disabled={
                      operationLoading.updating === product.id ||
                      operationLoading.deleting === product.id ||
                      operationLoading.creating
                    }
                  >
                    {operationLoading.updating === product.id && (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    )}
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                    disabled={
                      operationLoading.deleting === product.id ||
                      operationLoading.updating === product.id ||
                      operationLoading.creating
                    }
                  >
                    {operationLoading.deleting === product.id && (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    )}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {loading ? (
                    <Skeleton className="h-4 w-[200px]" />
                  ) : (
                    <>
                      Showing {(page - 1) * pageSize + 1} to{" "}
                      {Math.min(page * pageSize, data.totalCount)} of{" "}
                      {data.totalCount} products
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1 || loading}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    {loading ? (
                      <Skeleton className="h-4 w-[80px]" />
                    ) : (
                      <>
                        Page {page} of {totalPages}
                      </>
                    )}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
