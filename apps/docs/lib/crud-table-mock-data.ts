export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

// Generate mock data
const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    products.push({
      id: `prod-${i}`,
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      price: Math.round(Math.random() * 1000),
      stock: Math.floor(Math.random() * 100),
      createdAt: new Date(
        now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      updatedAt: new Date(
        now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ),
    });
  }

  return products;
};

// Initialize with 30 mock products
let mockProducts = generateMockProducts(30);

export const mockProductService = {
  getProducts: async (
    page: number = 1,
    pageSize: number = 5,
    sortField: string = "name",
    sortOrder: "asc" | "desc" = "asc"
  ) => {
    // Sort the data
    const sorted = [...mockProducts].sort((a, b) => {
      const aValue = a[sortField as keyof Product];
      const bValue = b[sortField as keyof Product];

      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Paginate
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = sorted.slice(start, end);

    return {
      products: paginated,
      totalCount: mockProducts.length,
    };
  },

  createProduct: async (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProduct: Product = {
      ...data,
      id: `prod-${mockProducts.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockProducts = [newProduct, ...mockProducts];
    return newProduct;
  },

  updateProduct: async (data: Partial<Product> & { id: string }) => {
    const index = mockProducts.findIndex((p) => p.id === data.id);
    if (index === -1) throw new Error("Product not found");

    const updatedProduct = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date(),
    };

    mockProducts[index] = updatedProduct;
    return updatedProduct;
  },

  deleteProduct: async (id: string) => {
    mockProducts = mockProducts.filter((p) => p.id !== id);
  },
};
