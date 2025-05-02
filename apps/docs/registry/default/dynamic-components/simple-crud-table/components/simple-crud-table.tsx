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

  return (
    <div className="space-y-4">
      {/* Create/Edit Form */}
      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="flex-1 min-w-[200px]"
        />
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="flex-1 min-w-[200px]"
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
        />
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Product Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortConfig.field === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("price")}
            >
              Price{" "}
              {sortConfig.field === "price" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
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
          {data.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEditing(product)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * pageSize + 1} to{" "}
                  {Math.min(page * pageSize, data.totalCount)} of{" "}
                  {data.totalCount} products
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
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
