import { createContext, useContext } from "react";

interface InventoryContextType {
  refreshData: () => Promise<void>;
  isRefreshing: boolean;
}

export const InventoryContext = createContext<InventoryContextType>({
  refreshData: async () => {},
  isRefreshing: false,
});

export const useInventory = () => useContext(InventoryContext);
