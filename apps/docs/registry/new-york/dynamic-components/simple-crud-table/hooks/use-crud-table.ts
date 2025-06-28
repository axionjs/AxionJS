"use client";

import { useState, useEffect } from "react";
import {
  Product,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/registry/new-york/dynamic-components/simple-crud-table/actions/crud-table-actions";

export function useCrudTable(initialPageSize = 5) {
  const [data, setData] = useState<{
    products: Product[];
    totalCount: number;
  }>({ products: [], totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: "asc" | "desc";
  }>({ field: "name", direction: "asc" });

  // Track individual operation loading states
  const [operationLoading, setOperationLoading] = useState<{
    creating: boolean;
    updating: string | null;
    deleting: string | null;
  }>({
    creating: false,
    updating: null,
    deleting: null,
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProducts(
        page,
        pageSize,
        sortConfig.field,
        sortConfig.direction
      );

      setData(result);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  const handleCreate = async (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => {
    setOperationLoading((prev) => ({ ...prev, creating: true }));
    setError(null);

    try {
      if (!productData.name || !productData.price) {
        setError("Name and price are required fields");
        return { success: false, error: "Name and price are required fields" };
      }

      if (productData.price <= 0) {
        setError("Price must be greater than 0");
        return { success: false, error: "Price must be greater than 0" };
      }

      // Optimistic update - add temporary product
      const tempProduct = {
        id: `temp-${Date.now()}`,
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setData((prev) => ({
        products: [tempProduct, ...prev.products],
        totalCount: prev.totalCount + 1,
      }));

      await createProduct(productData);
      await fetchData(); // Refresh to get real data
      return { success: true };
    } catch (err) {
      // Revert optimistic update on error
      await fetchData();
      const errorMsg = "Failed to create product";
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setOperationLoading((prev) => ({ ...prev, creating: false }));
    }
  };

  const handleUpdate = async (
    productData: Partial<Product> & { id: string }
  ) => {
    setOperationLoading((prev) => ({ ...prev, updating: productData.id }));
    setError(null);

    try {
      // Optimistic update
      setData((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === productData.id
            ? { ...product, ...productData }
            : product
        ),
      }));

      await updateProduct(productData);
      await fetchData(); // Refresh to get real data
      return { success: true };
    } catch (err) {
      // Revert optimistic update on error
      await fetchData();
      const errorMsg = "Failed to update product";
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setOperationLoading((prev) => ({ ...prev, updating: null }));
    }
  };

  const handleDelete = async (id: string) => {
    setOperationLoading((prev) => ({ ...prev, deleting: id }));
    setError(null);

    try {
      // Optimistic update - remove product immediately
      const productToDelete = data.products.find((p) => p.id === id);
      setData((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
        totalCount: prev.totalCount - 1,
      }));

      await deleteProduct(id);
      // Don't fetch data again since we already updated optimistically
      return { success: true };
    } catch (err) {
      // Revert optimistic update on error
      await fetchData();
      const errorMsg = "Failed to delete product";
      setError(errorMsg);
      console.error(err);
      return { success: false, error: errorMsg };
    } finally {
      setOperationLoading((prev) => ({ ...prev, deleting: null }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortConfig]);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    sortConfig,
    operationLoading,
    setPage,
    setPageSize,
    handleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    fetchData,
  };
}
