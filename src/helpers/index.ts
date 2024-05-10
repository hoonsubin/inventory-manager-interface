import { Product, Transaction } from "../types";
import { getDefaultProducts } from "../data/products";

const INVENTORY_KEY = "inventory";
const TX_KEY = "transactions";

export const saveProdData = (productList: Product[]) => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(productList));
};

export const saveTxData = (txList: Transaction[]) => {
  localStorage.setItem(TX_KEY, JSON.stringify(txList));
};

export const loadProdData = () => {
  const savedInventory = localStorage.getItem(INVENTORY_KEY);

  return savedInventory ? JSON.parse(savedInventory) as Product[] : getDefaultProducts();
};

export const loadTxData = () => {
    const savedTransactions = localStorage.getItem(TX_KEY);
  
    return savedTransactions ? JSON.parse(savedTransactions) as Transaction[] : [];
  };

  