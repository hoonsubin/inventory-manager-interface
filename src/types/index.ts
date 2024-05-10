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
    initStock: number,
    description: string,
  ) => void;
  removeProduct: (productId: UUID, isSelling: boolean) => void;
  buyProductStock: (productId: UUID, stock: number) => void;
  sellProductStock: (productId: UUID, stock: number) => void;
  findProdById: (productId: UUID) => Product;
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
  // the product description
  description?: string;
}

export type TxType = "sell" | "buy" | "remove" | "add";

export type Transaction = {
  id: UUID;
  productId: UUID;
  quantity: number;
  totalCost: number;
  type: TxType;
  time: Date;
}
