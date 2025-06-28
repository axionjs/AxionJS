"use server";

import { db } from "@/registry/new-york/lib/db";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const inventoryFormSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  sku: z.string().min(3),
});

export async function getInventoryItems({
  page = 1,
  pageSize = 10,
  sortBy = "updatedAt",
  sortOrder = "desc",
  filters = {},
  lowStockOnly = false,
}: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
  lowStockOnly?: boolean;
} = {}) {
  try {
    // Calculate pagination values
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where clause based on filters
    const where: any = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: "insensitive",
      };
    }

    if (filters.category && filters.category !== "") {
      where.category = filters.category;
    }

    // Add low stock filter if requested
    if (lowStockOnly) {
      where.stock = {
        lt: 10, // Items with stock less than 10
      };
    }

    // Get paginated items with sorting
    const items = await db.inventoryItem.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take,
    });

    // Get total count for pagination
    const totalItems = await db.inventoryItem.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get count of low stock items for the alert
    const lowStockCount = await db.inventoryItem.count({
      where: {
        stock: {
          lt: 10,
        },
      },
    });

    return {
      items,
      meta: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
        lowStockCount,
      },
    };
  } catch (error) {
    console.error("Failed to fetch inventory items:", error);
    throw new Error("Failed to fetch inventory items");
  }
}

export async function getInventoryItem(id: string) {
  try {
    const item = await db.inventoryItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new Error("Inventory item not found");
    }

    return item;
  } catch (error) {
    console.error(`Failed to fetch inventory item ${id}:`, error);
    throw new Error("Failed to fetch inventory item");
  }
}

export async function createInventoryItem(
  values: z.infer<typeof inventoryFormSchema>
) {
  try {
    const validatedFields = inventoryFormSchema.parse(values);

    // Check if SKU already exists
    const existingItem = await db.inventoryItem.findUnique({
      where: { sku: validatedFields.sku },
    });
    if (existingItem) {
      return { error: "SKU already exists" };
    }

    await db.inventoryItem.create({
      data: {
        name: validatedFields.name,
        category: validatedFields.category,
        price: validatedFields.price,
        stock: validatedFields.stock,
        sku: validatedFields.sku,
      },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Failed to create inventory item:", error);
    return { error: "Failed to create inventory item" };
  }
}

export async function updateInventoryItem(
  id: string,
  values: z.infer<typeof inventoryFormSchema>
) {
  try {
    const validatedFields = inventoryFormSchema.parse(values);

    //Check if same sku exists
    const existingItem = await db.inventoryItem.findUnique({
      where: { sku: validatedFields.sku },
    });
    if (existingItem && existingItem.id !== id) {
      return { error: "SKU already exists" };
    }

    // Update the inventory item
    await db.inventoryItem.update({
      where: { id },
      data: {
        name: validatedFields.name,
        category: validatedFields.category,
        price: validatedFields.price,
        stock: validatedFields.stock,
        sku: validatedFields.sku,
      },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error(`Failed to update inventory item ${id}:`, error);
    return { error: "Failed to update inventory item" };
  }
}

export async function deleteInventoryItem(id: string) {
  try {
    await db.inventoryItem.delete({
      where: { id },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete inventory item ${id}:`, error);
    return { error: "Failed to delete inventory item" };
  }
}
