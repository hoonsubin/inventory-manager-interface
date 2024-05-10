import {
  IInventory,
  UUID,
  Transaction,
  InventoryManager,
} from "../types";
import React, { useState, ReactNode, useMemo, useCallback } from "react";

// extend from the inventory interface so that it matches the main class while allowing us to extend UI-specific functions
interface InventoryContextType extends IInventory {
  getLastTxOfProd: (prodId: UUID) => Transaction;
  getAllTxOfProd: (prodId: UUID) => Transaction[];
  saveData: () => void;
  loadData: () => void;
}

interface InventoryProviderType {
  children?: ReactNode;
}

export const InventoryContext =
  React.createContext<InventoryContextType | null>(null);

export const InventoryProvider: React.FC<InventoryProviderType> = ({
  children,
}) => {
  // todo: need to find a way to pass the inventory and tx history list at init
  const [inventoryManager, setInventoryManager] = useState<InventoryManager>(
    new InventoryManager([], [])
  );
  const products = useMemo(() => {
    return inventoryManager.products;
  }, [inventoryManager.products]);

  const transactionHistory = useMemo(() => {
    return inventoryManager.transactionHistory;
  }, [inventoryManager.transactionHistory]);

  const totalRevenue = useMemo(() => {
    return inventoryManager.totalRevenue;
  }, [inventoryManager.totalRevenue]);

  const totalValue = useMemo(()=> {
    return inventoryManager.totalValue;
  }, [inventoryManager.totalValue]);

  const totalCosts = useMemo(() => {
    return inventoryManager.totalCosts;
  }, [inventoryManager.totalCosts]);

  const totalProfit = useMemo(() => {
    return inventoryManager.totalProfit;
  }, [inventoryManager.totalProfit]);

  const getAllTxOfProd = useCallback((prodId: UUID) => {
    return transactionHistory.filter((i) => i.id === prodId);
  }, [transactionHistory]);

  const contextValue: InventoryContextType = {
    products,
    transactionHistory,
    totalCosts,
    totalProfit,
    totalRevenue,
    totalValue,
    saveData: () => {
      // todo: imp
    },
    loadData: () => {
      // todo: imp
    },

    addNewProduct: (
      name: string,
      retailPrice: number,
      cost: number,
      initStock: number
    ) => {
      inventoryManager.addNewProduct(name, retailPrice, cost, initStock);
    },
    removeProduct: (productId: UUID, isSelling: boolean = false) => {
      inventoryManager.removeProduct(productId, isSelling);
    },
    buyProductStock: (productId: UUID, stock: number) => {
      inventoryManager.buyProductStock(productId, stock);
    },
    sellProductStock: (productId: UUID, stock: number) => {
      inventoryManager.sellProductStock(productId, stock);
    },

    getAllTxOfProd,
    getLastTxOfProd: (prodId: UUID) => {
      const txOfProd = getAllTxOfProd(prodId);
      // sort the list into a descending order based on the timestamp and get the first item
      return txOfProd.sort((a, b) => b.time.getTime() - a.time.getTime())[0];
    },
  };

  return (
    <>
      <InventoryContext.Provider value={contextValue}>
        {children}
      </InventoryContext.Provider>
    </>
  );
};