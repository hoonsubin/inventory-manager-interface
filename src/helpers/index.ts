import { Product, Transaction, TxType } from "../types";
import { getDefaultProducts } from "../data/products";
import { arrowUp, arrowDown, bagRemove, bagAdd } from "ionicons/icons";

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

  return savedInventory
    ? (JSON.parse(savedInventory) as Product[])
    : getDefaultProducts();
};

export const loadTxData = () => {
  const savedTransactions = localStorage.getItem(TX_KEY);

  return savedTransactions
    ? (JSON.parse(savedTransactions) as Transaction[])
    : [];
};

export const typeToVisuals = (txType: TxType) => {
  switch (txType) {
    case "add":
      return {
        icon: arrowDown,
        msg: "Add New Product",
        color: "primary",
      };
    case "remove":
      return {
        icon: arrowUp,
        msg: "Removed Product",
        color: "danger",
      };
    case "buy":
      return {
        icon: bagAdd,
        msg: "Restock Product",
        color: "warning",
      };
    case "sell":
      return {
        icon: bagRemove,
        msg: "Sell Product Stock",
        color: "success",
      };
  }
};
