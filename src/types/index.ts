export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

export interface Product {
  // an identifier for the product. This value will automatically increment
  id: number;
  // name of the product
  name: string;
  // the cost for purchasing (restocking) one item
  cost: number;
  // the price for selling one item
  price: number;
  // current number of stocks of a given product
  stock: number;
}

export interface Transaction {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  type: "sell" | "buy" | "remove" | "add";
  time: Date;
}

// re-export the inventory manager class
export * from './InventoryManager';