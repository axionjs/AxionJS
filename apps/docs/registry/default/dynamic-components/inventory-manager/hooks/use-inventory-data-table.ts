import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { InventoryItem } from "@prisma/client";
import { getInventoryItems } from "@/registry/default/dynamic-components/inventory-manager/actions/inventory";
import { createColumns } from "@/registry/default/dynamic-components/inventory-manager/components/columns";

export const useInventoryDataTable = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // For URL state management
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle sorting
  const handleSort = (column: string) => {
    // If clicking the same column, toggle sort order
    if (sortBy === column) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);

      // Update URL params
      const params = new URLSearchParams(searchParams);
      params.set("sort", column);
      params.set("order", newOrder);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      // New column, set as default desc
      setSortBy(column);
      setSortOrder("desc");

      // Update URL params
      const params = new URLSearchParams(searchParams);
      params.set("sort", column);
      params.set("order", "desc");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // Load data based on current pagination, filters, and sorting
  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await getInventoryItems({
        page: pageIndex + 1, // API uses 1-based indexing
        pageSize,
        sortBy,
        sortOrder,
        filters: {
          name: nameFilter,
          category: categoryFilter,
        },
        lowStockOnly,
      });

      setData(result.items);
      setPageCount(result.meta.totalPages);
      setTotalItems(result.meta.totalItems);
      setLowStockCount(result.meta.lowStockCount);
    } catch (error) {
      console.error("Failed to load inventory data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh data without changing state
  const refreshData = async () => {
    startTransition(async () => {
      try {
        const result = await getInventoryItems({
          page: pageIndex + 1,
          pageSize,
          sortBy,
          sortOrder,
          filters: {
            name: nameFilter,
            category: categoryFilter,
          },
          lowStockOnly,
        });

        setData(result.items);
        setPageCount(result.meta.totalPages);
        setTotalItems(result.meta.totalItems);
        setLowStockCount(result.meta.lowStockCount);
      } catch (error) {
        console.error("Failed to refresh inventory data:", error);
      }
    });
  };

  // Handle pagination changes
  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPageIndex + 1));
    params.set("pageSize", String(newPageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle filter changes
  const handleNameFilterChange = (value: string) => {
    setNameFilter(value);
    setPageIndex(0); // Reset to first page when filtering

    // Update URL params
    const params = new URLSearchParams(searchParams);
    params.set("name", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value === "all" ? "" : value);
    setPageIndex(0); // Reset to first page when filtering

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle low stock filter
  const toggleLowStockFilter = () => {
    const newValue = !lowStockOnly;
    setLowStockOnly(newValue);
    setPageIndex(0); // Reset to first page when filtering

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set("lowStock", "true");
    } else {
      params.delete("lowStock");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Initialize from URL params on first load
  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page")) - 1
      : 0;
    const size = searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : 10;
    const name = searchParams.get("name") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "updatedAt";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";
    const lowStock = searchParams.get("lowStock") === "true";

    setPageIndex(page);
    setPageSize(size);
    setNameFilter(name);
    setCategoryFilter(category);
    setSortBy(sort);
    setSortOrder(order);
    setLowStockOnly(lowStock);
  }, [searchParams]);

  // Load data when pagination, filters, or sorting change
  useEffect(() => {
    loadData();
  }, [
    pageIndex,
    pageSize,
    nameFilter,
    categoryFilter,
    sortBy,
    sortOrder,
    lowStockOnly,
  ]);

  // Create context value
  const contextValue = {
    refreshData,
    isRefreshing: isPending,
  };

  // Create columns with sort handler
  const columns = createColumns({ onSort: handleSort });

  return {
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
  };
};
