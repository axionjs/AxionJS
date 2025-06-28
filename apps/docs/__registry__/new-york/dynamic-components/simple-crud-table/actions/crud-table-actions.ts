"use server";

import { db } from "@/registry/new-york/lib/db";
import { revalidatePath } from "next/cache";

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function getProducts(
  page: number = 1,
  pageSize: number = 5,
  sortField: string = "name",
  sortOrder: "asc" | "desc" = "asc"
) {
  const skip = (page - 1) * pageSize;
  const products = await db.product.findMany({
    skip,
    take: pageSize,
    orderBy: {
      [sortField]: sortOrder,
    },
  });
  const totalCount = await db.product.count();
  return { products, totalCount };
}

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  console.log("Creating product with data:", data); // Debugging line
  const product = await db.product.create({ data });
  revalidatePath("/");
  return product;
}

export async function updateProduct(data: Partial<Product> & { id: string }) {
  const { id, ...updateData } = data;
  const product = await db.product.update({
    where: { id },
    data: updateData,
  });
  revalidatePath("/");
  return product;
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/");
}
