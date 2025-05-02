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

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getProducts(
        page,
        pageSize,
        sortConfig.field,
        sortConfig.direction,
      );

      if (!result.products.length) {
        setError("No products found");
        return;
      }

      setData(result);
      setError(null);
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
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      if (!productData.name || !productData.price) {
        return {
          success: false,
          error: "Name and price are required fields",
        };
      }

      if (productData.price <= 0) {
        return {
          success: false,
          error: "Price must be greater than 0",
        };
      }
      await createProduct(productData);
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to create product" };
    }
  };

  const handleUpdate = async (
    productData: Partial<Product> & { id: string },
  ) => {
    try {
      await updateProduct(productData);
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to update product" };
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Failed to delete product" };
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
    setPage,
    setPageSize,
    handleSort,
    handleCreate,
    handleUpdate,
    handleDelete,
    fetchData,
  };
}
