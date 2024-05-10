export type Message = {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface IInventory {
  products: Product[];
  transactionHistory: Transaction[];
  totalRevenue: number;
  totalValue: number;
  totalCosts: number;
  totalProfit: number;

  addNewProduct: (
    name: string,
    retailPrice: number,
    cost: number,
    initStock: number
  ) => void;
  removeProduct: (productId: UUID, isSelling: boolean) => void;
  buyProductStock: (productId: UUID, stock: number) => void;
  sellProductStock: (productId: UUID, stock: number) => void;
}

export type Product = {
  // an identifier for the product. This value will automatically increment
  id: UUID;
  // name of the product
  name: string;
  // the cost for purchasing (restocking) one item
  cost: number;
  // the price for selling one item
  price: number;
  // current number of stocks of a given product
  stock: number;
}

export type Transaction = {
  id: UUID;
  productId: UUID;
  quantity: number;
  totalCost: number;
  type: "sell" | "buy" | "remove" | "add";
  time: Date;
}

// re-export the inventory manager class
export * from "./InventoryManager";
